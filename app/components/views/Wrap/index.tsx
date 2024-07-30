import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { addresses } from "@klimadao/lib/constants";
import { concatAddress, trimWithPlaceholder } from "@klimadao/lib/utils";
import { Trans, defineMessage, t } from "@lingui/macro";
import FlipOutlined from "@mui/icons-material/FlipOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { changeApprovalTransaction } from "actions/utils";
import { wrapTransaction } from "actions/wrap";
import { BalancesCard } from "components/BalancesCard";
import { DisclaimerModal } from "components/DisclaimerModal";
import { ImageCard } from "components/ImageCard";
import { TransactionModal } from "components/TransactionModal";
import * as styles from "components/views/Stake/styles";
import { providers } from "ethers";
import { tokenInfo } from "lib/getTokenInfo";
import { useTypedSelector } from "lib/hooks/useTypedSelector";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { AppNotificationStatus, TxnStatus, setAppState } from "state/app";
import {
  selectAllowancesWithParams,
  selectAppState,
  selectBalances,
  selectLocale,
  selectNotificationStatus,
} from "state/selectors";
import {
  decrementAllowance,
  decrementWrap,
  incrementWrap,
  setAllowance,
} from "state/user";

interface Props {
  provider?: providers.Web3Provider;
  address?: string;
  isConnected?: boolean;
  toggleModal: () => void;
}

const inputPlaceholderMessage = {
  wrap: defineMessage({
    id: "wrap.sklima_to_wrap",
    message: "sKLIMA to wrap",
  }),
  unwrap: defineMessage({
    id: "wrap.wsklima_to_unwrap",
    message: "wsKLIMA to unwrap",
  }),
};

const WRAP = "wrap";
const UNWRAP = "unwrap";
const SPENDER = "wsklima";

export const Wrap: FC<Props> = (props) => {
  const locale = useSelector(selectLocale);

  const dispatch = useAppDispatch();
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;
  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const [view, setView] = useState<typeof WRAP | typeof UNWRAP>(WRAP);
  const [quantity, setQuantity] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const { currentIndex } = useSelector(selectAppState);
  const balances = useSelector(selectBalances);
  const wrapAllowance = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: ["sklima"],
      spender: SPENDER,
    })
  );

  const isLoading = !balances || typeof balances.klima === "undefined";
  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const setMax = () => {
    setStatus(null);
    if (view === WRAP) {
      setQuantity(balances?.sklima ?? "0");
    } else {
      setQuantity(balances?.wsklima ?? "0");
    }
  };

  const getToken = () => {
    if (view === WRAP) {
      return "sklima";
    } else {
      return "wsklima";
    }
  };

  const closeModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  // Approval only needed for wrap, not for unwrap !
  const handleApproval = async () => {
    if (!props.provider) return;
    const token = "sklima";
    const spender = SPENDER;
    try {
      const currentQuantity = quantity.toString();
      const approvedValue = await changeApprovalTransaction({
        value: currentQuantity,
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

  const handleAction = async () => {
    try {
      if (!quantity || !currentIndex || !props.provider) return;
      await wrapTransaction({
        action: view,
        token: getToken(),
        provider: props.provider,
        value: quantity,
        onStatus: setStatus,
      });
      if (view === WRAP) {
        dispatch(incrementWrap({ sklima: quantity, currentIndex }));
        dispatch(
          decrementAllowance({
            token: "sklima",
            spender: SPENDER,
            value: quantity,
          })
        );
      } else {
        dispatch(decrementWrap({ wsklima: quantity, currentIndex }));
      }
      setQuantity("");
    } catch (e) {
      console.error(e);
      return;
    }
  };

  // Approval only needed for wrap, not for unwrap
  const hasApproval = () => {
    if (view === UNWRAP) return true;

    return (
      !!wrapAllowance &&
      !!Number(wrapAllowance.sklima) &&
      Number(quantity) <= Number(wrapAllowance.sklima)
    ); // Caution: Number trims values down to 17 decimal places of precision;
  };

  const insufficientBalance = () => {
    const token = getToken();
    return (
      props.isConnected &&
      !isLoading &&
      Number(quantity) > Number(balances?.[token] ?? "0")
    );
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!props.isConnected || !props.address) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: props.toggleModal,
      };
    } else if (isLoading) {
      return {
        label: t`Loading...`,
        disabled: true,
      };
    } else if (!value) {
      return {
        label: t`Enter quantity`,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return {
        label: t({ id: "shared.confirming", message: "Confirming" }),
        disabled: true,
      };
    } else if (value && insufficientBalance()) {
      return {
        label: t`Insufficient balance`,
        disabled: true,
      };
    } else if (!hasApproval()) {
      return {
        label: t`Approve`,
        onClick: () => setShowTransactionModal(true),
      };
    } else if (view === WRAP) {
      return {
        label: WRAP,
        disabled: !value || !balances || value > Number(balances.sklima),
        onClick: () => setShowTransactionModal(true),
      };
    } else if (view === UNWRAP) {
      return {
        label: UNWRAP,
        disabled: !value || !balances || value > Number(balances.wsklima),
        onClick: () => setShowTransactionModal(true),
      };
    } else {
      return {
        label: t({ id: "shared.error", message: "ERROR" }),
        disabled: true,
      };
    }
  };

  const youWillGet = () => {
    const suffix = view === WRAP ? "wsKLIMA" : "sKLIMA";
    if (!quantity || !currentIndex) return `0 ${suffix}`;
    if (view === WRAP) {
      // BigNumber doesn't support decimals so I'm not sure the safest way to divide and multiply...
      return `${Number(quantity) / Number(currentIndex)} ${suffix}`;
    }
    return `${Number(quantity) * Number(currentIndex)} ${suffix}`;
  };

  return (
    <>
      <DisclaimerModal />
      <BalancesCard
        assets={["sklima", "wsklima", "wsklimaUnwrapped"]}
        tooltip={
          <Trans id="wrap.balances_tooltip">
            Wrap sKLIMA to receive index-adjusted wrapped-staked-KLIMA
          </Trans>
        }
      />

      <div className={styles.stakeCard} style={{ minHeight: "74rem" }}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <FlipOutlined />
            <Trans id="wrap.wrap_sklima">Wrap sKLIMA</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans
              id="wrap.wrap_sklima.wrap_sklima_to_receive_sklima"
              comment="Long sentence"
            >
              Wrap sKLIMA to receive wsKLIMA. Unlike sKLIMA, your wsKLIMA
              balance will not increase over time.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans
              id="wrap.wrap_sklima.some_find_this_useful"
              comment="Long sentence"
            >
              Some find this useful for accounting purposes, but the rewards are
              exactly the same. Wrap and unwrap values are calculated based on
              the current index.
            </Trans>
          </Text>
        </div>
        <div className={styles.stakeCard_ui}>
          <div className={styles.inputsContainer}>
            <div className={styles.stakeSwitch}>
              <button
                className={styles.switchButton}
                type="button"
                onClick={() => {
                  setQuantity("");
                  setView(WRAP);
                }}
                data-active={view === WRAP}
              >
                <Trans id="wrap.wrap">Wrap</Trans>
              </button>
              <button
                className={styles.switchButton}
                type="button"
                onClick={() => {
                  setQuantity("");
                  setView(UNWRAP);
                }}
                data-active={view === UNWRAP}
              >
                <Trans id="wrap.unwrap">Unwrap</Trans>
              </button>
            </div>
            <div className={styles.stakeInput}>
              <Trans
                id={inputPlaceholderMessage[view].id}
                render={({ translation }) => (
                  <input
                    className={styles.stakeInput_input}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder={translation as string}
                    min="0"
                  />
                )}
              />
              <button
                className={styles.stakeInput_max}
                type="button"
                onClick={setMax}
              >
                <Trans id="shared.max">Max</Trans>
              </button>
            </div>

            {props.address && (
              <div className={styles.address}>
                {concatAddress(props.address)}
              </div>
            )}

            <div className="hr" />
          </div>

          <div className={styles.infoTable}>
            <div className={styles.infoTable_label}>
              <Trans id="wrap.index">Index</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="wrap.index.tooltip">
                    Amount of KLIMA you would have today if you staked 1 KLIMA
                    on launch day. Used to calculate wsKLIMA value.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="wrap.balance">Balance</Trans>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="wrap.you_will_get">You Will Get</Trans>
            </div>
            <div className={styles.infoTable_value}>
              {currentIndex
                ? trimWithPlaceholder(currentIndex, 2, locale)
                : "loading..."}
            </div>
            <div className={styles.infoTable_value}>
              {view === WRAP
                ? trimWithPlaceholder(balances?.sklima ?? 0, 6, locale) +
                  " sKLIMA"
                : trimWithPlaceholder(balances?.wsklima ?? 0, 6, locale) +
                  " wsKLIMA"}
            </div>
            <div className={styles.infoTable_value}>{youWillGet()}</div>
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
            <Text t="h4" className={styles.stakeCard_header_title}>
              <FlipOutlined />
              {view === "wrap" ? "Wrap sKLIMA" : "Unwrap sKLIMA"}
            </Text>
          }
          onCloseModal={closeModal}
          tokenName={getToken()}
          tokenIcon={tokenInfo[getToken()].icon}
          spenderAddress={addresses["mainnet"][SPENDER]}
          value={quantity.toString()}
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleApproval}
          hasApproval={hasApproval()}
          onSubmit={handleAction}
        />
      )}

      <ImageCard />
    </>
  );
};
