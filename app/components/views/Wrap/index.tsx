import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";

import { changeApprovalTransaction, wrapTransaction } from "actions/wrap";
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
  selectWrapAllowance,
} from "state/selectors";
import { decrementWrap, incrementWrap, setWrapAllowance } from "state/user";
import { ImageCard } from "components/ImageCard";
import { BalancesCard } from "components/BalancesCard";
import { useAppDispatch } from "state";

import * as styles from "components/views/Stake/styles";
import { Trans, t } from "@lingui/macro";
interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
  loadWeb3Modal: () => Promise<void>;
}

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

  const [view, setView] = useState<"wrap" | "unwrap">("wrap");
  const [quantity, setQuantity] = useState("");

  const { currentIndex } = useSelector(selectAppState);
  const balances = useSelector(selectBalances);
  const allowances = useSelector(selectWrapAllowance);

  const isLoading = !balances || typeof balances.klima === "undefined";
  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const setMax = () => {
    setStatus(null);
    if (view === "wrap") {
      setQuantity(balances?.sklima ?? "0");
    } else {
      setQuantity(balances?.wsklima ?? "0");
    }
  };

  const handleApproval = () => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider: props.provider,
        onStatus: setStatus,
      });
      dispatch(
        setWrapAllowance({
          sklima: value,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleAction = (action: "wrap" | "unwrap") => async () => {
    try {
      if (!quantity || !currentIndex) return;
      setQuantity("");
      await wrapTransaction({
        action,
        provider: props.provider,
        value: quantity,
        onStatus: setStatus,
      });
      if (action === "wrap") {
        dispatch(incrementWrap({ sklima: quantity, currentIndex }));
      } else {
        dispatch(decrementWrap({ wsklima: quantity, currentIndex }));
      }
    } catch (e) {
      return;
    }
  };

  const hasApproval = () => {
    return !!allowances && !!Number(allowances.sklima);
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
    } else if (view === "unwrap") {
      return {
        label: "Unwrap",
        onClick: handleAction("unwrap"),
        disabled: !value || !balances || value > Number(balances.wsklima),
      };
    } else {
      return { label: "ERROR", onClick: undefined, disabled: true };
    }
  };

  const youWillGet = () => {
    const suffix = view === "wrap" ? "wsKLIMA" : "sKLIMA";
    if (!quantity || !currentIndex) return `0 ${suffix}`;
    if (view === "wrap") {
      // BigNumber doesn't support decimals so I'm not sure the safest way to divide and multiply...
      return `${Number(quantity) / Number(currentIndex)} ${suffix}`;
    }
    return `${Number(quantity) * Number(currentIndex)} ${suffix}`;
  };

  const inputPlaceholderMessageID =
    view === "wrap" ? "wrap.sklima_to_wrap" : "wrap.wsklima_to_unwrap";

  return (
    <>
      <BalancesCard
        assets={["sklima", "wsklima"]}
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
                  setView("wrap");
                }}
                data-active={view === "wrap"}
              >
                <Trans id="wrap.wrap">Wrap</Trans>
              </button>
              <button
                className={styles.switchButton}
                type="button"
                onClick={() => {
                  setQuantity("");
                  setView("unwrap");
                }}
                data-active={view === "unwrap"}
              >
                <Trans id="wrap.unwrap">Unwrap</Trans>
              </button>
            </div>
            <div className={styles.stakeInput}>
              <Trans
                id={inputPlaceholderMessageID}
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
              {view === "wrap"
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
