import {
  Anchor as A,
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import {
  OffsetPaymentMethod,
  PoolToken,
  RetirementToken,
  addresses,
  offsetCompatibility,
  offsetInputTokens,
  poolTokens,
  urls,
} from "@klimadao/lib/constants";
import { formatUnits, getTokenDecimals, safeAdd } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import {
  RetireCarbonTransactionResult,
  approveProjectToken,
  getOffsetConsumptionCost,
  getProjectTokenBalances,
  getRetiredOffsetBalances,
  getRetirementAllowances,
  retireCarbonTransaction,
  retireProjectTokenTransaction,
} from "actions/offset";
import { changeApprovalTransaction } from "actions/utils";
import { CarbonBalancesCard } from "components/CarbonBalancesCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import { DropdownWithModal } from "components/DropdownWithModal";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { TransactionModal } from "components/TransactionModal";
import { providers } from "ethers";
import { isAddress, parseUnits } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import { useOffsetParams } from "lib/hooks/useOffsetParams";
import { useTypedSelector } from "lib/hooks/useTypedSelector";
import C3T from "public/icons/C3T.png";
import Fiat from "public/icons/Fiat.png";
import TCO2 from "public/icons/TCO2.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { AppNotificationStatus, TxnStatus, setAppState } from "state/app";
import {
  selectAllowancesWithParams,
  selectBalances,
  selectLocale,
  selectNotificationStatus,
  selectProjectTokens,
} from "state/selectors";
import {
  decrementAllowance,
  decrementProjectToken,
  setAllowance,
  setProjectToken,
  updateRetirement,
} from "state/user";
import { ProjectTokenDetails as PooledProjectTokenDetails } from "../Redeem/ProjectTokenDetails";
import { ProjectTokenDetails } from "./ProjectTokenDetails";
import { RetirementSuccessModal } from "./RetirementSuccessModal";
import { SelectiveRetirement } from "./SelectiveRetirement";
import {
  BalanceAttribute,
  CarbonProject,
} from "./SelectiveRetirement/queryProjectDetails";
import { getFiatRetirementCost } from "./lib/getFiatRetirementCost";
import { redirectFiatCheckout } from "./lib/redirectFiatCheckout";
import * as styles from "./styles";

const MAX_FIAT_COST = 2000; // usdc

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

interface Props {
  provider?: providers.JsonRpcProvider;
  initializing?: boolean;
  address?: string;
  isConnected: boolean;
  onRPCError: () => void;
  toggleModal: () => void;
}

export const Offset = (props: Props) => {
  const dispatch = useAppDispatch();
  const locale = useSelector(selectLocale);
  const balances = useSelector(selectBalances);
  const projectTokens = useSelector(selectProjectTokens);
  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: offsetInputTokens,
      spender: "retirementAggregatorV2",
    })
  );
  const params = useOffsetParams();
  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<OffsetPaymentMethod>(
    params.inputToken || "fiat"
  );
  /** This is a token name or an 0x address for tco2/c3t token */
  const [selectedRetirementToken, setSelectedRetirementToken] = useState<
    RetirementToken | string
  >(params.retirementToken || "bct");
  /** When selecting tco2 or c3t this is `true` */
  const isRetiringOwnCarbon = !isPoolToken(selectedRetirementToken);

  // form state
  const [quantity, setQuantity] = useState(params.quantity || "");
  const [debouncedQuantity, setDebouncedQuantity] = useState(
    params.quantity || ""
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>();
  const [cost, setCost] = useState("");
  const [beneficiary, setBeneficiary] = useState(params.beneficiary || "");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState(
    params.beneficiaryAddress || ""
  );
  const [retirementMessage, setRetirementMessage] = useState(
    params.message || ""
  );
  // for selective retirement
  const [projectAddress, setProjectAddress] = useState(
    params.projectTokens || ""
  );
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(
    null
  );
  const [retirementTransactionHash, setRetirementTransactionHash] =
    useState("");

  const [retirementTotals, setRetirementTotals] = useState<number | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isLoading = props.isConnected && (!balances?.bct || !allowances?.bct);
  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  useEffect(() => {
    if (params.quantity && paymentMethod === "fiat") {
      // handles the case where a decimal value for quantity is passed
      // as a query param - we convert it to a whole number (1.123 -> 2)
      const newQuantity = Math.ceil(Number(params.quantity)).toString();
      setQuantity(newQuantity);
      setDebouncedQuantity(newQuantity);
    }
  }, [params.quantity]);

  useEffect(() => {
    if (
      selectedRetirementToken &&
      isAddress(selectedRetirementToken) &&
      !props.isConnected &&
      !props.initializing
    ) {
      props.toggleModal();
    }
  }, [selectedRetirementToken, props.initializing, props.isConnected]);

  useEffect(() => {
    if (props.isConnected && props.address && props.provider) {
      dispatch(
        getProjectTokenBalances({
          address: props.address,
        })
      );
      dispatch(
        getRetiredOffsetBalances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
      dispatch(
        getRetirementAllowances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
    }
  }, [props.isConnected, props.address, props.provider]);

  // effects
  useEffect(() => {
    // handles the case where a user inputs a decimal value when a non credit
    // card payment method is selected, they then choose to pay by credit card,
    // we convert the value to a whole number (1.123 -> 2)
    if (paymentMethod === "fiat") {
      setQuantity(Math.ceil(Number(quantity)).toString());
    }
    // if input token changes, force a compatible retirement token
    if (
      selectedRetirementToken &&
      !isAddress(selectedRetirementToken) &&
      !offsetCompatibility[paymentMethod]?.includes(
        selectedRetirementToken as RetirementToken
      )
    ) {
      // never undefined, because universal tokens
      setSelectedRetirementToken(offsetCompatibility[paymentMethod][0]);
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (debouncedQuantity === "" || !Number(debouncedQuantity)) {
      setCost("0");
      return;
    }
    const awaitGetOffsetConsumptionCost = async () => {
      if (isRetiringOwnCarbon) {
        setCost("0");
        return;
      }

      try {
        setCost("loading");
        if (paymentMethod !== "fiat") {
          const [consumptionCost] = await getOffsetConsumptionCost({
            inputToken: paymentMethod,
            retirementToken: selectedRetirementToken,
            quantity: debouncedQuantity,
            getSpecific: !!projectAddress,
          });
          setCost(consumptionCost);
        } else {
          const floorQuantity =
            Number(debouncedQuantity) && Number(debouncedQuantity) < 1
              ? "1"
              : debouncedQuantity;
          const reqParams = {
            beneficiary_address: beneficiaryAddress || props.address || null,
            beneficiary_name: beneficiary || "placeholder",
            retirement_message: retirementMessage || "placeholder",
            quantity: floorQuantity,
            project_address: projectAddress || null,
            retirement_token: selectedRetirementToken,
          };
          // edge case where you can type 0.5 for ubo then switch it to fiat
          if (debouncedQuantity !== floorQuantity) {
            setQuantity(floorQuantity);
            setDebouncedQuantity(floorQuantity);
          }
          const cost = await getFiatRetirementCost(reqParams);
          setCost(cost);
        }
      } catch (e) {
        console.error(e);
      }
    };
    awaitGetOffsetConsumptionCost();
  }, [
    debouncedQuantity,
    projectAddress,
    paymentMethod,
    selectedRetirementToken,
  ]);

  const closeTransactionModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const handleOnSuccessModalClose = () => {
    setQuantity("0");
    setDebouncedQuantity("0");
    setCost("0");
    setBeneficiary("");
    setBeneficiaryAddress("");
    setRetirementMessage("");
    setRetirementTransactionHash("");
    setRetirementTotals(null);
  };

  const handleBeneficiaryAddressChange = (address: string) => {
    setBeneficiaryAddress(address);
  };

  const getApprovalValue = (): string => {
    if (isRetiringOwnCarbon) {
      return quantity;
    }
    if (!cost || cost === "loading") return "0";
    if (paymentMethod === selectedRetirementToken) {
      // for example, when using mco2 to retire mco2
      return cost;
    }
    const onePercent =
      BigInt(parseUnits(cost, getTokenDecimals(paymentMethod))) / BigInt("100");
    const val = safeAdd(
      cost,
      formatUnits(onePercent, getTokenDecimals(paymentMethod))
    );
    return val;
  };

  const handleApprove = async () => {
    try {
      if (!props.provider) return;
      if (isRetiringOwnCarbon) {
        const approvedValue = await approveProjectToken({
          value: getApprovalValue(),
          signer: props.provider.getSigner(),
          onStatus: setStatus,
          projectTokenAddress: selectedRetirementToken,
        });
        dispatch(
          setProjectToken({
            address: selectedRetirementToken,
            allowance: approvedValue,
          })
        );
        return;
      }
      if (paymentMethod === "fiat") return;
      const approvedValue = await changeApprovalTransaction({
        value: getApprovalValue(),
        provider: props.provider,
        token: paymentMethod,
        spender: "retirementAggregatorV2",
        onStatus: setStatus,
      });
      dispatch(
        setAllowance({
          token: paymentMethod,
          spender: "retirementAggregatorV2",
          value: approvedValue,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleRetire = async () => {
    try {
      if (!props.address || !props.provider) return;
      let retirement: RetireCarbonTransactionResult;
      if (!isPoolToken(selectedRetirementToken)) {
        retirement = await retireProjectTokenTransaction({
          address: props.address,
          signer: props.provider.getSigner(),
          quantity,
          beneficiaryAddress,
          beneficiaryName: beneficiary,
          retirementMessage,
          onStatus: setStatus,
          projectTokenAddress: selectedRetirementToken,
          symbol: projectTokens[selectedRetirementToken].symbol,
        });
        dispatch(
          decrementProjectToken({
            address: selectedRetirementToken,
            quantityRetired: quantity,
          })
        );
      } else if (paymentMethod === "fiat") {
        return; // type guard
      } else {
        retirement = await retireCarbonTransaction({
          address: props.address,
          provider: props.provider,
          inputToken: paymentMethod,
          maxAmountIn: getApprovalValue(),
          retirementToken: selectedRetirementToken,
          quantity,
          beneficiaryAddress,
          beneficiaryName: beneficiary,
          retirementMessage,
          onStatus: setStatus,
          projectAddress,
        });
        dispatch(
          updateRetirement({
            inputToken: paymentMethod,
            retirementToken: selectedRetirementToken,
            cost,
            quantity,
          })
        );
        dispatch(
          decrementAllowance({
            token: paymentMethod,
            spender: "retirementAggregatorV2",
            value: cost,
          })
        );
      }

      // close TransactionModal
      closeTransactionModal();
      // this opens RetirementSuccessModal
      setRetirementTransactionHash(retirement.receipt.transactionHash);
      setRetirementTotals(retirement.retirementTotals);
    } catch (e) {
      return;
    }
  };

  const handleFiat = async () => {
    if (!props.address || !props.provider || paymentMethod !== "fiat") return;

    const reqParams = {
      quantity,
      beneficiary_address: beneficiaryAddress || props.address, // don't pass empty string
      beneficiary_name: beneficiary,
      retirement_message: retirementMessage,
      project_address: projectAddress || null,
      retirement_token: selectedRetirementToken,
    };
    setIsRedirecting(true);
    await redirectFiatCheckout(reqParams);
    // do retire redirect
    return;
  };

  const insufficientBalance = () => {
    if (isRetiringOwnCarbon && projectTokens[selectedRetirementToken]) {
      return (
        Number(quantity) >
        Number(projectTokens[selectedRetirementToken].quantity)
      );
    }
    if (paymentMethod === "fiat") return false;
    return (
      Number(getApprovalValue()) > Number(balances?.[paymentMethod] ?? "0")
    );
  };

  const invalidCost = !!Number(cost) && Number(cost) > MAX_FIAT_COST;
  const invalidRetirementQuantity =
    selectedProject &&
    Number(debouncedQuantity) >
      Number(
        selectedProject[
          `balance${selectedRetirementToken.toUpperCase()}` as BalanceAttribute
        ]
      );

  const hasApproval = () => {
    if (isRetiringOwnCarbon && projectTokens[selectedRetirementToken]) {
      const a = projectTokens[selectedRetirementToken].allowance;
      return !!Number(a) && Number(a) >= Number(quantity);
    }
    if (paymentMethod === "fiat") return true;
    return (
      !!allowances?.[paymentMethod] &&
      !!Number(allowances?.[paymentMethod]) &&
      Number(getApprovalValue()) <= Number(allowances?.[paymentMethod]) // Caution: Number trims values down to 17 decimal places of precision
    );
  };

  const getButtonProps = () => {
    if (!props.isConnected) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: props.toggleModal,
      };
    } else if (isLoading || cost === "loading") {
      return {
        label: t`Loading...`,
        disabled: true,
      };
    } else if (isRedirecting) {
      return {
        label: t({
          id: "shared.redirecting_checkout",
          message: "Redirecting to checkout...",
        }),
        disabled: true,
      };
    } else if (!quantity || !Number(quantity)) {
      return {
        label: t`Enter quantity`,
        disabled: true,
      };
    } else if (!beneficiary) {
      return {
        label: t({
          id: "shared.enter_beneficiary",
          message: "Enter beneficiary name",
        }),
        disabled: true,
      };
    } else if (!retirementMessage) {
      return {
        label: t({
          id: "shared.enter_retirement_message",
          message: "Enter retirement message",
        }),
        disabled: true,
      };
    } else if (!!beneficiaryAddress && !isAddress(beneficiaryAddress)) {
      return {
        label: t({
          id: "shared.invalid_beneficiary_addr",
          message: "Invalid beneficiary address",
        }),
        disabled: true,
      };
    } else if (invalidRetirementQuantity) {
      return {
        label: t({
          id: "offset.insufficient_project_tonnage",
          message: "Insufficient project tonnage",
        }),
        disabled: true,
      };
    } else if (invalidCost) {
      return {
        label: t({
          id: "shared.invalid_quantity",
          message: "Invalid quantity",
        }),
        disabled: true,
      };
    } else if (!!projectAddress && !isAddress(projectAddress)) {
      return {
        label: t({
          id: "shared.invalid_project_address",
          message: "Invalid project address",
        }),
        disabled: true,
      };
    } else if (insufficientBalance()) {
      return {
        label: t`Insufficient balance`,
        disabled: true,
      };
    } else if (paymentMethod === "fiat" && !isRetiringOwnCarbon) {
      return {
        label: t({ id: "offset.checkout", message: "Checkout" }),
        onClick: handleFiat,
      };
    } else if (!hasApproval()) {
      return {
        label: t`Approve`,
        onClick: () => setShowTransactionModal(true),
      };
    }
    return {
      label: t({ id: "shared.retire", message: "Retire carbon" }),
      onClick: () => setShowTransactionModal(true),
    };
  };

  const handleSelectInputToken = (tkn: OffsetPaymentMethod) => {
    setPaymentMethod(tkn);
  };

  const handleSelectRetirementToken = (tkn: string) => {
    setSelectedRetirementToken(tkn);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (
      !isRetiringOwnCarbon &&
      paymentMethod === "fiat" &&
      Number(e.target.value) &&
      Number(e.target.value) < 1
    ) {
      setQuantity("1");
    } else if (!isRetiringOwnCarbon && paymentMethod === "fiat") {
      setQuantity(Math.ceil(Number(e.target.value)).toString());
    } else if (Number(e.target.value) > 0 && Number(e.target.value) < 0.0001) {
      setQuantity("0.0001");
    } else {
      setQuantity(e.target.value);
    }
    if (e.target.value === "") {
      setDebouncedQuantity("");
      setCost("");
      return;
    }
    setCost("loading");
    const timerId = setTimeout(() => {
      setDebouncedQuantity(e.target.value);
      debounceTimerRef.current = undefined;
    }, 500);
    debounceTimerRef.current = timerId;
  };

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" || status === "networkConfirmation");

  const paymentMethodItems = offsetInputTokens
    .map((tkn) => ({
      ...tokenInfo[tkn],
      description: (function () {
        if (isLoading) return <Trans>Loading...</Trans>;
        if (!props.isConnected || !Number(balances?.[tkn])) return "0";
        return Number(balances?.[tkn]).toFixed(2);
      })(),
      disabled: !balances?.[tkn] || !Number(balances[tkn]),
    }))
    .sort((a, b) => Number(b.description ?? 0) - Number(a.description ?? 0));
  paymentMethodItems.unshift({
    description: "",
    disabled: false,
    icon: Fiat,
    key: "fiat",
    label: "Credit Card",
  });

  const poolTokenItems = poolTokens.map((tkn) => {
    const disabled = !offsetCompatibility[paymentMethod]?.includes(tkn);
    return {
      ...tokenInfo[tkn],
      disabled,
      description: disabled ? (
        <Trans id="offset.incompatible">INPUT TOKEN INCOMPATIBLE</Trans>
      ) : (
        ""
      ),
    };
  });

  const projectTokenItems = Object.keys(projectTokens).map((key) => {
    const token = projectTokens[key];
    // type safety, should never happen
    if (!token) {
      return {
        disabled: true,
        description: "",
        key: "unknown",
        icon: TCO2,
        label: "unknown",
      };
    }
    // TODO might be undefined?
    const isTCO2 = token.symbol.startsWith("TCO2");
    return {
      disabled: false,
      description: "",
      key: token.address,
      icon: isTCO2 ? TCO2 : C3T,
      label: token.symbol,
    };
  });

  const retirementTokenItems = [...poolTokenItems, ...projectTokenItems];

  const costIcon =
    tokenInfo[paymentMethod === "fiat" ? "usdc" : paymentMethod].icon;

  return (
    <>
      <div className={styles.columnRight}>
        <CarbonTonnesRetiredCard />
        <CarbonBalancesCard isConnected={props.isConnected} />
      </div>

      <div className={styles.offsetCard}>
        <div className={styles.offsetCard_header}>
          <Text t="h4" className={styles.offsetCard_header_title}>
            <ParkOutlined />
            <Trans>Offset</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Visit our <A href={urls.officialDocs}>docs</A> to learn how to
              integrate carbon credit retirement into your application, or visit
              <A href="https://carbonmark.com/projects">Carbonmark</A> to
              explore project details.
            </Trans>
          </Text>
        </div>

        <div className={styles.offsetCard_ui}>
          <DropdownWithModal
            label={t`Select carbon token to retire`}
            modalTitle={t`Select token`}
            currentItem={selectedRetirementToken}
            items={retirementTokenItems}
            isModalOpen={isRetireTokenModalOpen}
            onToggleModal={() => setRetireTokenModalOpen((s) => !s)}
            onItemSelect={handleSelectRetirementToken}
          />

          {!isRetiringOwnCarbon && (
            <SelectiveRetirement
              projectAddress={projectAddress}
              selectedRetirementToken={selectedRetirementToken}
              setProjectAddress={setProjectAddress}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          )}

          {isRetiringOwnCarbon &&
            projectTokens[selectedRetirementToken] && ( // careful, projectTokens must load before rendering
              <ProjectTokenDetails
                symbol={projectTokens[selectedRetirementToken].symbol}
                quantity={projectTokens[selectedRetirementToken].quantity}
                address={selectedRetirementToken}
              />
            )}

          {isAddress(projectAddress) &&
            !selectedProject &&
            isPoolToken(selectedRetirementToken) &&
            selectedRetirementToken !== "mco2" && (
              /** Show supplemental details for the advanced input */
              <PooledProjectTokenDetails
                address={projectAddress}
                pool={selectedRetirementToken}
              />
            )}

          <div className={styles.input}>
            <label>
              <Text t="caption" color="lighter">
                <Trans id="offset.amount_in_tonnes">
                  How many tonnes of carbon would you like to offset?
                </Trans>
              </Text>
            </label>
            <div className="number_input_container">
              <input
                type="number"
                min={
                  paymentMethod === "fiat" && !isRetiringOwnCarbon ? "1" : "0"
                }
                value={quantity}
                onKeyDown={(e) => {
                  // prevent a user from entering a decimal value when credit card is selected
                  if (
                    paymentMethod === "fiat" &&
                    !isRetiringOwnCarbon &&
                    ["."].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                data-error={
                  invalidCost ||
                  invalidRetirementQuantity ||
                  insufficientBalance()
                }
                onChange={handleChangeQuantity}
                placeholder={t({
                  id: "offset.offset_quantity",
                  message: "Enter quantity to offset",
                })}
              />
            </div>
            {invalidRetirementQuantity && (
              <Text
                t="caption"
                color="lightest"
                className="invalid_project_tonnage"
              >
                <Trans id="offset.invalid_project_tonnage">
                  Cannot exceed available tonnage of the project selected
                </Trans>
              </Text>
            )}
            {!invalidRetirementQuantity &&
              paymentMethod === "fiat" &&
              !isRetiringOwnCarbon && (
                <Text t="body8" color="lightest">
                  <Trans id="offset.min_quantity_fiat">
                    Minimum 1-tonne purchase. Whole integers only.
                  </Trans>
                </Text>
              )}
          </div>

          {/* attr: beneficiaryName  */}
          <div className={styles.beneficiary}>
            <Text t="caption" color="lighter">
              <Trans id="offset.retirement_credit">
                Who will this retirement be credited to?
              </Trans>
            </Text>
            <div className={styles.input}>
              <input
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder={t`Beneficiary name`}
              />
            </div>

            {/* attr: beneficiaryAddress  */}
            <div className={styles.input}>
              <input
                value={beneficiaryAddress}
                data-error={
                  !!beneficiaryAddress && !isAddress(beneficiaryAddress)
                }
                onChange={(e) => handleBeneficiaryAddressChange(e.target.value)}
                placeholder={t`Beneficiary 0x address (optional)`}
              />
              <Text t="body8" color="lightest">
                <Trans id="offset.default_retirement_address">
                  Defaults to the connected wallet address
                </Trans>
              </Text>
            </div>
          </div>

          {/* attr: retirementMessage  */}
          <div className={styles.input}>
            <label>
              <Text t="caption" color="lighter">
                <Trans id="offset.retirement_message">Retirement message</Trans>
              </Text>
            </label>
            <textarea
              value={retirementMessage}
              maxLength={280}
              onChange={(e) => {
                setRetirementMessage(e.target.value);
              }}
              placeholder={t({
                id: "offset.retirement_purpose",
                message: "Describe the purpose of this retirement",
              })}
            />
          </div>
          {!isRetiringOwnCarbon && (
            <MiniTokenDisplay
              label={
                <div className="mini_token_label">
                  <Text t="caption" color="lighter">
                    <Trans id="offset_cost">Cost</Trans>
                  </Text>
                  <TextInfoTooltip
                    content={
                      <Trans id="offset.aggregation_fee_tooltip">
                        This cost includes slippage and the aggregation fee of
                        1%.
                      </Trans>
                    }
                  >
                    <InfoOutlined />
                  </TextInfoTooltip>
                </div>
              }
              amount={cost}
              icon={costIcon}
              name={paymentMethod}
              loading={cost === "loading"}
              warn={insufficientBalance() || invalidCost}
              helperText={
                paymentMethod === "fiat"
                  ? t({
                      id: "fiat.max_quantity",
                      message: `$${MAX_FIAT_COST.toLocaleString(
                        locale
                      )} maximum for credit cards`,
                    })
                  : undefined
              }
            />
          )}
          <MiniTokenDisplay
            label={
              <Text t="caption" color="lighter">
                <Trans id="offset.retiring">Retiring</Trans>
              </Text>
            }
            warn={isRetiringOwnCarbon && insufficientBalance()}
            amount={Number(quantity)?.toLocaleString(locale)}
            icon={
              retirementTokenItems.find(
                (t) => t.key === selectedRetirementToken
              )?.icon ?? TCO2 // just to make ts happy
            }
            name={selectedRetirementToken}
            labelAlignment="start"
          />
          {!isRetiringOwnCarbon && (
            <div className={styles.pay_with_dropdown}>
              <DropdownWithModal
                label={t({
                  id: "offset.dropdown_payWith.label",
                  message: "Pay with",
                })}
                modalTitle={t({
                  id: "offset.modal_payWith.title",
                  message: "Select Token",
                })}
                warn={insufficientBalance()}
                currentItem={paymentMethod}
                items={paymentMethodItems}
                isModalOpen={isInputTokenModalOpen}
                onToggleModal={() => setInputTokenModalOpen((s) => !s)}
                onItemSelect={(str) =>
                  handleSelectInputToken(str as OffsetPaymentMethod)
                }
              />
              {insufficientBalance() && (
                <Text t="caption" className="warn">
                  <Trans>
                    Your balance must equal at least 1% more than the cost of
                    the transaction.
                  </Trans>
                </Text>
              )}
            </div>
          )}
          <div className="disclaimer">
            <GppMaybeOutlined />
            <Text t="caption">
              <Trans id="offset_disclaimer">
                Be careful not to expose any sensitive personal information.
                Your message can not be edited and will permanently exist on a
                public blockchain.
              </Trans>
            </Text>
          </div>
          <div className={styles.buttonRow}>
            {showSpinner ? (
              <div className={styles.buttonRow_spinner}>
                <Spinner />
              </div>
            ) : (
              <ButtonPrimary
                className={styles.submitButton}
                {...getButtonProps()}
              />
            )}
          </div>
        </div>
      </div>

      {showTransactionModal && (
        <TransactionModal
          title={
            <Text t="h4" className={styles.offsetCard_header_title}>
              <ParkOutlined />
              <Trans id="offset.retire_carbon">Retire Carbon</Trans>
            </Text>
          }
          onCloseModal={closeTransactionModal}
          tokenName={
            !isRetiringOwnCarbon
              ? paymentMethod
              : projectTokens[selectedRetirementToken]?.symbol || "unknown"
          }
          tokenIcon={
            !isRetiringOwnCarbon && paymentMethod !== "fiat"
              ? tokenInfo[paymentMethod].icon
              : retirementTokenItems.find(
                  (t) => t.key === selectedRetirementToken
                )?.icon ?? TCO2
          }
          spenderAddress={addresses["mainnet"].retirementAggregatorV2}
          value={!isRetiringOwnCarbon ? cost.toString() : quantity}
          approvalValue={getApprovalValue()}
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleApprove}
          hasApproval={hasApproval()}
          onSubmit={handleRetire}
        />
      )}

      {retirementTransactionHash && (
        <RetirementSuccessModal
          onSuccessModalClose={handleOnSuccessModalClose}
          retirementUrl={`${urls.retirements_carbonmark}/${
            beneficiaryAddress || props.address
          }/${retirementTotals}`}
        />
      )}
    </>
  );
};
