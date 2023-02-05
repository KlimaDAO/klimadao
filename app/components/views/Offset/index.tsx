import {
  Anchor as A,
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import {
  offsetCompatibility,
  offsetInputTokens,
  OffsetPaymentMethod,
  RetirementToken,
  retirementTokens,
  urls,
} from "@klimadao/lib/constants";
import { getTokenDecimals } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { providers, utils } from "ethers";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";

import { useAppDispatch } from "state";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import {
  selectAllowancesWithParams,
  selectBalances,
  selectLocale,
  selectNotificationStatus,
} from "state/selectors";
import { setAllowance, updateRetirement } from "state/user";

import {
  getOffsetConsumptionCost,
  getRetiredOffsetBalances,
  getRetirementAllowances,
  retireCarbonTransaction,
} from "actions/offset";
import { changeApprovalTransaction } from "actions/utils";

import { tokenInfo } from "lib/getTokenInfo";
import { useOffsetParams } from "lib/hooks/useOffsetParams";
import { useTypedSelector } from "lib/hooks/useTypedSelector";
import { createLinkWithLocaleSubPath } from "lib/i18n";

import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import { DropdownWithModal } from "components/DropdownWithModal";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { TransactionModal } from "components/TransactionModal";

import { RetirementSuccessModal } from "./RetirementSuccessModal";
import { SelectiveRetirement } from "./SelectiveRetirement";
import {
  BalanceAttribute,
  CarbonProject,
} from "./SelectiveRetirement/queryProjectDetails";

import Fiat from "public/icons/Fiat.png";
import { getCarbonTokenBalances } from "./lib/getCarbonTokenBalances";
import { getFiatRetirementCost } from "./lib/getFiatRetirementCost";
import { redirectFiatCheckout } from "./lib/redirectFiatCheckout";
import * as styles from "./styles";

// We need to approve a little bit extra (here 1%)
// It's possible that the price can slip upward between approval and final transaction
const APPROVAL_SLIPPAGE = 0.01;
const MAX_FIAT_COST = 2000; // usdc

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  onRPCError: () => void;
  toggleModal: () => void;
}

export const Offset = (props: Props) => {
  const dispatch = useAppDispatch();
  const locale = useSelector(selectLocale);
  const balances = useSelector(selectBalances);
  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: offsetInputTokens,
      spender: "retirementAggregator",
    })
  );

  const params = useOffsetParams();
  // local state
  const [isRetireTokenModalOpen, setRetireTokenModalOpen] = useState(false);
  const [isInputTokenModalOpen, setInputTokenModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<OffsetPaymentMethod>("fiat");
  const [selectedRetirementToken, setSelectedRetirementToken] =
    useState<RetirementToken>("bct");

  // form state
  const [quantity, setQuantity] = useState("");
  const [debouncedQuantity, setDebouncedQuantity] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>();
  const [cost, setCost] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [retirementMessage, setRetirementMessage] = useState("");
  // for selective retirement
  const [projectAddress, setProjectAddress] = useState("");
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

  /** Initialize input from params after they are extracted, validated & stripped */
  useEffect(() => {
    if (params.inputToken) {
      setPaymentMethod(params.inputToken);
    }
    if (params.retirementToken) {
      setSelectedRetirementToken(params.retirementToken);
    }
    if (params.message) {
      setRetirementMessage(params.message);
    }
    if (params.beneficiary) {
      setBeneficiary(params.beneficiary);
    }
    if (params.beneficiaryAddress) {
      setBeneficiaryAddress(params.beneficiaryAddress);
    }
    if (params.projectTokens) {
      setProjectAddress(params.projectTokens);
    }
    if (params.quantity) {
      // handles the case where a decimal value for quantity is passed
      // as a query param - we convert it to a whole number (1.123 -> 2)
      const quantity =
        paymentMethod === "fiat"
          ? Math.ceil(Number(params.quantity)).toString()
          : params.quantity;
      setQuantity(quantity);
      setDebouncedQuantity(quantity);
    }
  }, [params]);

  // done
  useEffect(() => {
    if (props.isConnected && props.address) {
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

      const getCarbonTokens = async () => {
        const carbonTokens = await getCarbonTokenBalances(
          props.address?.toLowerCase()
        );
        console.log(getCarbonTokens);
      };

      getCarbonTokens();
    }
  }, [props.isConnected, props.address]);

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
      !offsetCompatibility[paymentMethod]?.includes(selectedRetirementToken)
    ) {
      // never undefined, because universal tokens
      setSelectedRetirementToken(offsetCompatibility[paymentMethod][0]);
    }
  }, [paymentMethod]);

  //done without debounced
  useEffect(() => {
    if (debouncedQuantity === "" || !Number(debouncedQuantity)) {
      setCost("0");
      return;
    }
    const awaitGetOffsetConsumptionCost = async () => {
      setCost("loading");
      if (paymentMethod !== "fiat") {
        const [consumptionCost] = await getOffsetConsumptionCost({
          inputToken: paymentMethod,
          retirementToken: selectedRetirementToken,
          quantity: debouncedQuantity,
          amountInCarbon: true,
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

  // into lib
  const getApprovalValue = (): string => {
    const costAsNumber = Number(cost);
    const costPlusOnePercent = costAsNumber + costAsNumber * APPROVAL_SLIPPAGE;
    const decimals = getTokenDecimals(paymentMethod);
    return costPlusOnePercent.toFixed(decimals); // ethers throws with "underflow" if decimals exceeds
  };

  const handleApprove = async () => {
    try {
      if (!props.provider || paymentMethod === "fiat") return;

      const token = paymentMethod;
      const spender = "retirementAggregator";

      const approvedValue = await changeApprovalTransaction({
        value: getApprovalValue(),
        provider: props.provider,
        token,
        spender,
        onStatus: setStatus,
      });

      dispatch(
        setAllowance({
          token,
          spender,
          value: approvedValue,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleRetire = async () => {
    try {
      if (!props.address || !props.provider || paymentMethod === "fiat") return;
      const { receipt, retirementTotals } = await retireCarbonTransaction({
        address: props.address,
        provider: props.provider,
        inputToken: paymentMethod,
        retirementToken: selectedRetirementToken,
        quantity,
        amountInCarbon: true,
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
      // close TransactionModal
      closeTransactionModal();
      // this opens RetirementSuccessModal
      setRetirementTransactionHash(receipt.transactionHash);
      setRetirementTotals(retirementTotals);
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

  const insufficientBalance =
    props.isConnected &&
    !isLoading &&
    paymentMethod !== "fiat" &&
    Number(cost) > Number(balances?.[paymentMethod] ?? "0");

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
    return (
      paymentMethod !== "fiat" &&
      !!allowances?.[paymentMethod] &&
      !!Number(allowances?.[paymentMethod]) &&
      Number(cost) <= Number(allowances?.[paymentMethod]) // Caution: Number trims values down to 17 decimal places of precision
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
        label: t({ id: "shared.loading", message: "Loading..." }),
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
        label: t({ id: "shared.enter_quantity", message: "Enter quantity" }),
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
    } else if (!!beneficiaryAddress && !utils.isAddress(beneficiaryAddress)) {
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
    } else if (!!projectAddress && !utils.isAddress(projectAddress)) {
      return {
        label: t({
          id: "shared.invalid_project_address",
          message: "Invalid project address",
        }),
        disabled: true,
      };
    } else if (paymentMethod !== "fiat" && insufficientBalance) {
      return {
        label: t({
          id: "shared.insufficient_balance",
          message: "Insufficient balance",
        }),
        disabled: true,
      };
    } else if (paymentMethod !== "fiat" && !hasApproval()) {
      return {
        label: t({ id: "shared.approve", message: "Approve" }),
        onClick: () => setShowTransactionModal(true),
      };
    } else if (paymentMethod === "fiat") {
      return {
        label: t({ id: "offset.checkout", message: "Checkout" }),
        onClick: handleFiat,
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
    setSelectedRetirementToken(tkn as RetirementToken);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (
      paymentMethod === "fiat" &&
      Number(e.target.value) &&
      Number(e.target.value) < 1
    ) {
      setQuantity("1");
    } else if (
      paymentMethod !== "fiat" &&
      Number(e.target.value) > 0 &&
      Number(e.target.value) < 0.0001
    ) {
      setQuantity("0.0001");
    } else if (paymentMethod === "fiat") {
      setQuantity(Math.ceil(Number(e.target.value)).toString());
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

  // done
  const paymentMethodItems = offsetInputTokens
    .map((tkn) => ({
      ...tokenInfo[tkn],
      description: (function () {
        if (isLoading) return <Trans id="shared.loading" />;
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

  // done
  const retirementTokenItems = retirementTokens.map((tkn) => {
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

  // done
  const costIcon =
    tokenInfo[paymentMethod === "fiat" ? "usdc" : paymentMethod].icon;

  return (
    <>
      <div className={styles.columnRight}>
        <CarbonTonnesRetiredCard />
        <CarbonTonnesBreakdownCard />
      </div>

      <div className={styles.offsetCard}>
        <div className={styles.offsetCard_header}>
          <Text t="h4" className={styles.offsetCard_header_title}>
            <ParkOutlined />
            <Trans id="offset.retire_carbon">Retire Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="offset.go_carbon_neutral">
              Go carbon neutral by retiring carbon and claiming the underlying
              environmental benefit of the carbon offset. Learn more about
              carbon tokens in our <A href={urls.officialDocs}>docs</A>.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <FiberNewRoundedIcon className={styles.newReleasesIcon} />
            <Trans id="offset.lifi">
              Cross-chain offsetting is now available through{" "}
              <A href={urls.lifiOffset}>LI.FI and Etherspot</A>, with support
              for multiple chains and tokens.
            </Trans>
          </Text>
        </div>

        <div className={styles.offsetCard_ui}>
          {/* attr: retirementToken  */}
          <DropdownWithModal
            label={t({
              id: "offset.dropdown_retire.label",
              message: "Select carbon offset token to retire",
            })}
            modalTitle={t({
              id: "offset.modal_retire.title",
              message: "Select Carbon Type",
            })}
            currentItem={selectedRetirementToken}
            items={retirementTokenItems}
            isModalOpen={isRetireTokenModalOpen}
            onToggleModal={() => setRetireTokenModalOpen((s) => !s)}
            onItemSelect={handleSelectRetirementToken}
          />

          {/* attr: projectAddress  */}
          <SelectiveRetirement
            projectAddress={projectAddress}
            selectedRetirementToken={selectedRetirementToken}
            setProjectAddress={setProjectAddress}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />

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
                min={paymentMethod === "fiat" ? "1" : "0"}
                value={quantity}
                onKeyDown={(e) => {
                  // prevent a user from entering a decimal value when credit card is selected
                  if (paymentMethod === "fiat" && ["."].includes(e.key)) {
                    e.preventDefault();
                  }
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                data-error={invalidCost || invalidRetirementQuantity}
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
            {!invalidRetirementQuantity && paymentMethod === "fiat" && (
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
                  !!beneficiaryAddress && !utils.isAddress(beneficiaryAddress)
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
              maxLength={280} // done
              onChange={(e) => {
                setRetirementMessage(e.target.value);
              }}
              placeholder={t({
                id: "offset.retirement_purpose",
                message: "Describe the purpose of this retirement",
              })}
            />
          </div>

          <MiniTokenDisplay
            label={
              <div className="mini_token_label">
                <Text t="caption" color="lighter">
                  <Trans id="offset_cost">Cost</Trans>
                </Text>
                <TextInfoTooltip
                  content={
                    <Trans id="offset.aggregation_fee_tooltip">
                      This cost includes slippage and the aggregation fee of 1%.
                    </Trans>
                  }
                >
                  <InfoOutlined />
                </TextInfoTooltip>
              </div>
            }
            amount={Number(cost)?.toLocaleString(locale)}
            icon={costIcon}
            name={paymentMethod}
            loading={cost === "loading"}
            warn={insufficientBalance || invalidCost}
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

          <MiniTokenDisplay
            label={
              <Text t="caption" color="lighter">
                <Trans id="offset.retiring">Retiring</Trans>
              </Text>
            }
            amount={Number(quantity)?.toLocaleString(locale)}
            icon={tokenInfo[selectedRetirementToken].icon}
            name={selectedRetirementToken}
            labelAlignment="start"
          />

          <DropdownWithModal
            label={t({
              id: "offset.dropdown_payWith.label",
              message: "Pay with",
            })}
            modalTitle={t({
              id: "offset.modal_payWith.title",
              message: "Select Token",
            })}
            currentItem={paymentMethod}
            items={paymentMethodItems}
            isModalOpen={isInputTokenModalOpen}
            onToggleModal={() => setInputTokenModalOpen((s) => !s)}
            onItemSelect={(str) =>
              handleSelectInputToken(str as OffsetPaymentMethod)
            }
          />

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

      {showTransactionModal && paymentMethod !== "fiat" && (
        <TransactionModal
          title={
            <Text t="h4" className={styles.offsetCard_header_title}>
              <ParkOutlined />
              <Trans id="offset.retire_carbon">Retire Carbon</Trans>
            </Text>
          }
          onCloseModal={closeTransactionModal}
          token={paymentMethod}
          spender={"retirementAggregator"}
          value={cost.toString()}
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
          retirementUrl={createLinkWithLocaleSubPath(
            `${urls.retirements}/${
              beneficiaryAddress || props.address
            }/${retirementTotals}`,
            locale
          )}
        />
      )}
    </>
  );
};
