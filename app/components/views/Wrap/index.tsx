import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";

import { wrapTransaction } from "actions/wrap";
import { changeApprovalTransaction } from "actions/utils";
import { selectNotificationStatus, selectLocale } from "state/selectors";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";

import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { concatAddress, trimWithPlaceholder } from "@klimadao/lib/utils";
import {
  selectAppState,
  selectBalances,
  selectAllowancesWithParams,
} from "state/selectors";
import {
  decrementWrap,
  incrementWrap,
  setAllowance,
  decrementAllowance,
} from "state/user";
import { ImageCard } from "components/ImageCard";
import { BalancesCard } from "components/BalancesCard";
import { useAppDispatch } from "state";
import { useTypedSelector } from "lib/hooks/useTypedSelector";

import * as styles from "components/views/Stake/styles";
import { Trans, defineMessage } from "@lingui/macro";

interface Props {
  provider?: ethers.providers.Web3Provider;
  address?: string;
  isConnected?: boolean;
  loadWeb3Modal: () => Promise<void>;
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

  const { currentIndex } = useSelector(selectAppState);
  const balances = useSelector(selectBalances);
  const wrapAllowance = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: ["sklima"],
      spender: "wsklima",
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

  // Approval only needed for wrap, not for unwrap !
  const handleApproval = () => async () => {
    if (!props.provider) return;
    const token = "sklima";
    const spender = "wsklima";
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

  const handleAction = (action: "wrap" | "unwrap") => async () => {
    try {
      if (!quantity || !currentIndex || !props.provider) return;
      setQuantity("");
      await wrapTransaction({
        action,
        provider: props.provider,
        value: quantity,
        onStatus: setStatus,
      });
      if (view === WRAP) {
        dispatch(incrementWrap({ sklima: quantity, currentIndex }));
        dispatch(
          decrementAllowance({
            token: "sklima",
            spender: "wsklima",
            value: quantity,
          })
        );
      } else {
        dispatch(decrementWrap({ wsklima: quantity, currentIndex }));
      }
    } catch (e) {
      return;
    }
  };

  // Approval only needed for wrap, not for unwrap
  const hasApproval = () => {
    return (
      !!wrapAllowance &&
      !!Number(wrapAllowance.sklima) &&
      Number(quantity) <= Number(wrapAllowance.sklima)
    ); // Caution: Number trims values down to 17 decimal places of precision;
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!props.isConnected || !props.address) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else if (isLoading) {
      return {
        label: <Trans id="shared.loading">Loading...</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (!value) {
      return {
        label: <Trans id="shared.enter_quantity">ENTER QUANTITY</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return { label: "Confirming", onClick: undefined, disabled: true };
    } else if (view === "wrap" && !hasApproval()) {
      return { label: "Approve", onClick: handleApproval() };
    } else if (view === "wrap") {
      return {
        label: "Wrap",
        onClick: handleAction("wrap"),
        disabled: !value || !balances || value > Number(balances.sklima),
      };
    } else if (view === UNWRAP) {
      return {
        onClick: handleAction("unwrap"),
        label: UNWRAP,
        disabled: !value || !balances || value > Number(balances.wsklima),
      };
    } else {
      return { label: "ERROR", onClick: undefined, disabled: true };
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
                {...getButtonProps()}
                className={styles.submitButton}
              />
            )}
          </div>
        </div>
      </div>

      <ImageCard />
    </>
  );
};
