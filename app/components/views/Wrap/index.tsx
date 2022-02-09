import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";

import { changeApprovalTransaction, wrapTransaction } from "actions/wrap";
import { selectNotificationStatus } from "state/selectors";
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
import { i18n } from "@lingui/core";

import * as styles from "components/views/Stake/styles";
import { Trans } from "@lingui/macro";
interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const Wrap: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
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
    isConnected &&
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
        provider,
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
        provider,
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
    if (!isConnected || !address) {
      return { label: "Not Connected", onClick: undefined, disabled: true };
    } else if (isLoading) {
      return {
        label: "Loading",
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

  const inputPlaceholder =
    view === "wrap" ? "sKLIMA to wrap" : "wsKLIMA to unwrap";

  return (
    <>
      <BalancesCard />
      <div className={styles.stakeCard}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <FlipOutlined />
            Wrap sKLIMA
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Wrap sKLIMA to receive wsKLIMA. Unlike sKLIMA, your wsKLIMA
              balance will not increase over time.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Some find this useful for accounting purposes, but the yield is
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
                Wrap
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
                Unwrap
              </button>
            </div>
            <div className={styles.stakeInput}>
              <input
                className={styles.stakeInput_input}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder={inputPlaceholder}
                min="0"
              />
              <button
                className={styles.stakeInput_max}
                type="button"
                onClick={setMax}
              >
                <Trans id="button.max">Max</Trans>
              </button>
            </div>
            {address && (
              <div className={styles.stakeInput_max}>
                {concatAddress(address)}
              </div>
            )}
            <div className="hr" />
          </div>

          <div className={styles.infoTable}>
            <div className={styles.infoTable_label}>
              <Trans>Index</Trans>
              <TextInfoTooltip
                content={
                  <Trans>
                    Amount of KLIMA you would have today if you staked 1 KLIMA
                    on launch day. Used to calculate wsKLIMA value.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans>Balance</Trans>
            </div>
            <div className={styles.infoTable_label}>
              <Trans>You Will Get</Trans>
            </div>
            <div className={styles.infoTable_value}>
              {currentIndex
                ? trimWithPlaceholder(currentIndex, 2)
                : "loading..."}
            </div>
            <div className={styles.infoTable_value}>
              {view === "wrap"
                ? trimWithPlaceholder(balances?.sklima ?? 0, 6) + " sKLIMA"
                : trimWithPlaceholder(balances?.wsklima ?? 0, 6) + " wsKLIMA"}
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
