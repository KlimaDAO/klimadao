import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { changeApprovalTransaction, wrapTransaction } from "actions/wrap";
import styles from "components/views/Stake/index.module.css";
import { notificationStatus } from "state/selectors";
import { setAppState, AppNotificationStatus } from "state/app";

import {
  Spinner,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";
import { ethers } from "ethers";
import {
  selectAppState,
  selectBalances,
  selectWrapAllowance,
} from "state/selectors";
import { decrementWrap, incrementWrap, setWrapAllowance } from "state/user";
import { useAppDispatch } from "state";
import { TxnStatus } from "actions/utils";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const Wrap: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();
  const fullStatus: AppNotificationStatus | null =
    useSelector(notificationStatus);
  const status = fullStatus && fullStatus.statusType;
  const setStatus = (status: string, message: string) => {
    if (!status) dispatch(setAppState({ notificationStatus: null }));
    else
      dispatch(
        setAppState({ notificationStatus: { statusType: status, message } })
      );
  };

  const [view, setView] = useState<"wrap" | "unwrap">("wrap");
  const [quantity, setQuantity] = useState("");
  const [singletonSource, singleton] = useTooltipSingleton();

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
    setStatus("", "");
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
      return { children: "Not Connected", onClick: undefined, disabled: true };
    } else if (isLoading) {
      return {
        children: "Loading",
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return { children: "Confirming", onClick: undefined, disabled: true };
    } else if (view === "wrap" && !hasApproval()) {
      return { children: "Approve", onClick: handleApproval() };
    } else if (view === "wrap") {
      return {
        children: "Wrap",
        onClick: handleAction("wrap"),
        disabled: !value || !balances || value > Number(balances.sklima),
      };
    } else if (view === "unwrap") {
      return {
        children: "Unwrap",
        onClick: handleAction("unwrap"),
        disabled: !value || !balances || value > Number(balances.wsklima),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
    }
  };

  const youWillGet = () => {
    if (!quantity || !currentIndex) return "0";
    if (view === "wrap") {
      // BigNumber doesn't support decimals so I'm not sure the safest way to divide and multiply...
      return Number(quantity) / Number(currentIndex);
    }
    return Number(quantity) * Number(currentIndex);
  };

  const inputPlaceholder =
    view === "wrap" ? "sKLIMA to wrap" : "wsKLIMA to unwrap";

  const indexAdjustedBalance =
    !!currentIndex && typeof balances?.wsklima !== "undefined"
      ? Number(balances.wsklima) * Number(currentIndex)
      : undefined;

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Wrap sKLIMA</h2>
        <p className={t.body2}>
          wsKLIMA is an index-adjusted wrapper for sKLIMA. Some people may find
          this useful for accounting purposes. Unlike your sKLIMA balance, your
          wsKLIMA balance will not increase over time.
        </p>
        <p className={t.body2}>
          When wsKLIMA is unwrapped, you receive sKLIMA based on the latest
          (ever-increasing) index, so the total yield is the same.
        </p>

        <p className={t.body2}></p>
      </div>
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
            wrap
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
            unwrap
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
            className={styles.stakeInput_button}
            type="button"
            onClick={setMax}
          >
            Max
          </button>
        </div>
      </div>

      <ul className={styles.dataContainer}>
        {address && (
          <p className={styles.dataContainer_address}>
            {address.slice(0, 5)}..{address.slice(address.length - 3)}
          </p>
        )}
        {singletonSource}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Balance (staked)
            <TextInfoTooltip
              singleton={singleton}
              content="Balance of unwrapped, staked KLIMA"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.sklima, 4)}</span> sKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Balance (wrapped)
            <TextInfoTooltip
              singleton={singleton}
              content="Balance of wrapped sKLIMA"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.wsklima, 4)}</span> wsKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Current index
            <TextInfoTooltip
              singleton={singleton}
              content="Amount you would have today, if you staked 1 KLIMA on launch day. Used to calculate wsKLIMA value."
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(currentIndex, 4)}</span> sKLIMA
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Index-adjusted balance
            <TextInfoTooltip
              singleton={singleton}
              content="Unwrapped value of your entire wsKLIMA balance (wsKLIMA * currentIndex)"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(indexAdjustedBalance, 4)}</span> sKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            You will get
            <TextInfoTooltip
              singleton={singleton}
              content={`Amount you will get after ${
                view === "wrap" ? "wrapping" : "unwrapping"
              }`}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(youWillGet(), 4)}</span>{" "}
              {view === "wrap" ? "wsKLIMA" : "sKLIMA"}
            </WithPlaceholder>
          </div>
        </li>
      </ul>
      <div className={styles.buttonRow}>
        <div />
        {showSpinner ? (
          <div className={styles.buttonRow_spinner}>
            <Spinner />
          </div>
        ) : (
          <div />
        )}
        <button
          type="button"
          className={styles.submitButton}
          {...getButtonProps()}
        />
      </div>
    </div>
  );
};

const WithPlaceholder: FC<{
  condition: boolean;
  placeholder: string;
}> = (props) => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return <>{props.children}</>;
};
