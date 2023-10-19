import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { addresses } from "@klimadao/lib/constants";
import { formatUnits, getTokenDecimals, safeAdd } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import RedeemOutlined from "@mui/icons-material/RedeemOutlined";
import { getProjectTokenBalances } from "actions/offset";
import {
  getRedeemAllowances,
  getRedeemCost,
  redeemCarbonTransaction,
} from "actions/redeem";
import { changeApprovalTransaction } from "actions/utils";
import { CarbonBalancesCard } from "components/CarbonBalancesCard";
import { DropdownWithModal } from "components/DropdownWithModal";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { TransactionModal } from "components/TransactionModal";
import { SelectiveRetirement } from "components/views/Offset/SelectiveRetirement";
import { CarbonProject } from "components/views/Offset/SelectiveRetirement/queryProjectDetails";
import { providers } from "ethers";
import { isAddress, parseUnits } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import {
  RedeemPaymentMethod,
  RedeemablePoolToken,
  redeemCompatibility,
  redeemPaymentMethods,
  redeemablePoolTokens,
  useRedeemParams,
} from "lib/hooks/useRedeemParams";
import { useTypedSelector } from "lib/hooks/useTypedSelector";
import C3T from "public/icons/C3T.png";
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
} from "state/selectors";
import { setAllowance, updateRedemption } from "state/user";
import { ProjectTokenDetails } from "./ProjectTokenDetails";
import * as styles from "./styles";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  onRPCError: () => void;
  toggleModal: () => void;
}

export const Redeem = (props: Props) => {
  const dispatch = useAppDispatch();
  const locale = useSelector(selectLocale);
  const balances = useSelector(selectBalances);

  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: redeemPaymentMethods,
      spender: "retirementAggregatorV2",
    })
  );

  const params = useRedeemParams();

  // form input states
  const [quantity, setQuantity] = useState(params.quantity || "");
  const [pool, setPool] = useState<RedeemablePoolToken>(params.pool || "bct");
  const [projectTokenAddress, setProjectTokenAddress] = useState(
    params.projectTokenAddress || ""
  );
  const [paymentMethod, setPaymentMethod] = useState<RedeemPaymentMethod>(
    params.paymentMethod || "usdc"
  );

  // debounce quantity
  const [debouncedQuantity, setDebouncedQuantity] = useState(
    params.quantity || ""
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>();

  // ui states
  const [cost, setCost] = useState("");
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(
    null
  );
  const [isPoolTokenModalOpen, setPoolTokenModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
    useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  /**
   *
   * TODO - isLoading
   *
   */
  const isLoading = props.isConnected && !allowances?.bct;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  useEffect(() => {
    if (props.isConnected && props.address && props.provider) {
      dispatch(
        getRedeemAllowances({
          address: props.address,
          onRPCError: props.onRPCError,
        })
      );
      dispatch(
        getProjectTokenBalances({
          address: props.address,
        })
      );
    }
  }, [props.isConnected, props.address, props.provider]);

  useEffect(() => {
    if (debouncedQuantity === "" || !Number(debouncedQuantity)) {
      setCost("0");
      return;
    }
    const getter = async () => {
      const newCost = await getRedeemCost({
        paymentMethod,
        pool,
        quantity: debouncedQuantity,
      });
      setCost(newCost);
    };
    getter();
  }, [debouncedQuantity, pool, paymentMethod]);

  const closeTransactionModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const handleOnSuccess = () => {
    setQuantity("0");
    setDebouncedQuantity("0");
    setCost("0");
  };

  const getApprovalValue = (): string => {
    if (!cost || cost === "loading") return "0";
    if (paymentMethod === projectTokenAddress) {
      return cost;
    }
    const onePercent =
      BigInt(parseUnits(cost, getTokenDecimals(paymentMethod))) / BigInt("100");
    return safeAdd(
      cost,
      formatUnits(onePercent, getTokenDecimals(paymentMethod))
    );
  };

  const handleApprove = async () => {
    try {
      if (!props.provider) return;
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

  const handleRedeem = async () => {
    try {
      if (!props.address || !props.provider) return;
      await redeemCarbonTransaction({
        provider: props.provider,
        onStatus: setStatus,
        paymentMethod,
        pool,
        projectTokenAddress,
        quantity,
        maxCost: getApprovalValue(),
      });
      dispatch(
        updateRedemption({
          projectTokenAddress,
          paymentMethod,
          quantity,
          tempSymbol: pool === "bct" || pool === "nct" ? "TCO2" : "C3T", // temp workaround, don't have the full symbol
          cost,
        })
      );
      handleOnSuccess();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const insufficientBalance = () => {
    return (
      Number(getApprovalValue()) > Number(balances?.[paymentMethod] ?? "0")
    );
  };

  const selectedProjectSupply = selectedProject
    ? selectedProject[
        `balance${pool.toUpperCase() as Uppercase<RedeemablePoolToken>}`
      ]
    : "0";

  const insufficientProjectQuantity =
    selectedProject &&
    Number(debouncedQuantity) > Number(selectedProjectSupply);

  const hasApproval = () => {
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
    } else if (!quantity || !Number(quantity)) {
      return {
        label: t`Enter quantity`,
        disabled: true,
      };
    } else if (insufficientProjectQuantity) {
      return {
        label: t({
          id: "offset.insufficient_project_tonnage",
          message: "Insufficient project tonnage",
        }),
        disabled: true,
      };
    } else if (!projectTokenAddress || !isAddress(projectTokenAddress)) {
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
    } else if (!hasApproval()) {
      return {
        label: t`Approve`,
        onClick: () => setShowTransactionModal(true),
      };
    }
    return {
      label: t`Continue`,
      onClick: () => setShowTransactionModal(true),
    };
  };

  const handleSelectInputToken = (tkn: RedeemPaymentMethod) => {
    setPaymentMethod(tkn);
  };

  const handleSelectPool = (newPool: string) => {
    setPool(newPool as RedeemablePoolToken);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (Number(e.target.value) > 0 && Number(e.target.value) < 0.0001) {
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

  const paymentMethodItems = redeemPaymentMethods
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

  const poolTokenItems = redeemablePoolTokens.map((tkn) => {
    const disabled = !redeemCompatibility[paymentMethod]?.includes(tkn);
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

  const getProjectTokenIcon = () => {
    if (pool === "ubo" || pool === "nbo") return C3T;
    return TCO2;
  };

  return (
    <>
      <div className={styles.columnRight}>
        <CarbonBalancesCard isConnected={props.isConnected} />
      </div>

      <div className={styles.offsetCard}>
        <div className={styles.offsetCard_header}>
          <Text t="h4" className={styles.offsetCard_header_title}>
            <RedeemOutlined />
            <Trans>Buy & Redeem Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="redeem.description">
              Acquire tokens for a specific carbon offset project. The project
              tokens will be redeemed from a carbon pool and transferred to your
              wallet, so you can trade or retire them later.
            </Trans>
          </Text>
        </div>

        <div className={styles.offsetCard_ui}>
          <DropdownWithModal
            label={t`Select carbon pool`}
            modalTitle={t`Select carbon pool`}
            currentItem={pool}
            items={poolTokenItems}
            isModalOpen={isPoolTokenModalOpen}
            onToggleModal={() => setPoolTokenModalOpen((s) => !s)}
            onItemSelect={handleSelectPool}
          />

          <SelectiveRetirement
            projectAddress={projectTokenAddress}
            selectedRetirementToken={pool}
            setProjectAddress={setProjectTokenAddress}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            disableDefault={true}
          />
          {isAddress(projectTokenAddress) && !selectedProject && (
            /** Show supplemental details for when they use params */
            <ProjectTokenDetails address={projectTokenAddress} pool={pool} />
          )}

          <div className={styles.input}>
            <label>
              <Text t="caption" color="lighter">
                <Trans>How many tonnes would you like to acquire?</Trans>
              </Text>
            </label>
            <div className="number_input_container">
              <input
                type="number"
                min={"0.0001"}
                value={quantity}
                onKeyDown={(e) => {
                  // dont let user enter these special characters into the number input
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                data-error={
                  insufficientProjectQuantity || insufficientBalance()
                }
                onChange={handleChangeQuantity}
                placeholder={t`Enter quantity`}
              />
            </div>
            {insufficientProjectQuantity && (
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
          </div>

          <MiniTokenDisplay
            label={
              <div className="mini_token_label">
                <Text t="caption" color="lighter">
                  <Trans id="offset_cost">Cost</Trans>
                </Text>
                <TextInfoTooltip
                  content={
                    <Trans>
                      This cost includes slippage and any redemption fees
                      charged by the pool
                    </Trans>
                  }
                >
                  <InfoOutlined />
                </TextInfoTooltip>
              </div>
            }
            amount={cost}
            icon={tokenInfo[paymentMethod].icon}
            name={paymentMethod}
            loading={cost === "loading"}
            warn={insufficientBalance()}
          />

          <MiniTokenDisplay
            label={
              <Text t="caption" color="lighter">
                <Trans>You receive</Trans>
              </Text>
            }
            warn={insufficientBalance()}
            amount={Number(quantity)?.toLocaleString(locale)}
            icon={getProjectTokenIcon()}
            name={selectedProject?.projectID || "???"}
            labelAlignment="start"
          />
          <div className={styles.pay_with_dropdown}>
            <DropdownWithModal
              label={t`Payment method`}
              modalTitle={t`Payment Method`}
              currentItem={paymentMethod}
              items={paymentMethodItems}
              warn={insufficientBalance()}
              isModalOpen={isPaymentMethodModalOpen}
              onToggleModal={() => setIsPaymentMethodModalOpen((s) => !s)}
              onItemSelect={(str) =>
                handleSelectInputToken(str as RedeemPaymentMethod)
              }
            />
            {insufficientBalance() && (
              <Text t="caption" className="warn">
                <Trans>
                  Your balance must equal at least 1% more than the cost of the
                  transaction.
                </Trans>
              </Text>
            )}
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
              <Trans>Buy Carbon</Trans>
            </Text>
          }
          onCloseModal={closeTransactionModal}
          tokenName={paymentMethod}
          tokenIcon={tokenInfo[paymentMethod].icon}
          spenderAddress={addresses["mainnet"].retirementAggregatorV2}
          value={cost}
          approvalValue={getApprovalValue()}
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleApprove}
          hasApproval={hasApproval()}
          onSubmit={handleRedeem}
        />
      )}
    </>
  );
};
