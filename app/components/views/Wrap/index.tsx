import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { changeApprovalTransaction, wrapTransaction } from "actions/wrap";
import FlipIcon from "@material-ui/icons/Flip";
import { SvgIcon } from "@mui/material";


// Copied from Stake view despite T/t
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "components/views/Stake/index.module.css";
import { Trans } from "@lingui/macro";

import {
  Spinner,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import { trimWithPlaceholder, concatAddress } from "@klimadao/lib/utils";
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
import { i18n } from "@lingui/core";
interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const Wrap: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TxnStatus | "">("");
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
    setStatus("");
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

  const showRelevantBalance = () => {
    if (view === "wrap")
      return trimWithPlaceholder(balances?.sklima, 4);

    if (view === "unwrap")
      return trimWithPlaceholder(balances?.wsklima, 4);
  }

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!isConnected || !address) {
      return {
        children: <Trans id="button.not_connected">Not connected</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (isLoading) {
      return {
        children: <Trans id="button.loading">Loading</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return {
        children: <Trans id="button.confirming">Confirming</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (view === "wrap" && !hasApproval()) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleApproval(),
      };
    } else if (view === "wrap") {
      return {
        children: value ? (<Trans id="button.wrap">Wrap</Trans>) : <Trans>Enter Amount</Trans>,
        onClick: handleAction("wrap"),
        disabled: !value || !balances || value > Number(balances.sklima),
      };
    } else if (view === "unwrap") {
      return {
        children: value ? (<Trans id="button.unwrap">Unwrap</Trans>) : <Trans>Enter Amount</Trans>,
        onClick: handleAction("unwrap"),
        disabled: !value || !balances || value > Number(balances.wsklima),
      };
    } else {
      return {
        children: <Trans id="button.error">Error</Trans>,
        onClick: undefined,
        disabled: true,
      };
    }
  };

  const getStatusMessage = () => {
    if (status === "userConfirmation") {
      return (
        <Trans id="status.pending_confirmation">
          Please click 'confirm' in your wallet to continue.
        </Trans>
      );
    } else if (status === "networkConfirmation") {
      return (
        <Trans id="status.transaction_started">
          Transaction initiated. Waiting for network confirmation.
        </Trans>
      );
    } else if (status === "error") {
      return (
        <Trans id="status.transaction_error">
          ❌ Error: something went wrong...
        </Trans>
      );
    } else if (status === "done") {
      return <Trans id="status.transaction_success">✔️ Success!.</Trans>;
    } else if (status === "userRejected") {
      return (
        <Trans id="status.transaction_rejected">
          ✖️ You chose to reject the transaction.
        </Trans>
      );
    }
    return null;
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
        <h2 className={T.h4}>
          <SvgIcon component={FlipIcon} fontSize="inherit" />
          {" "}Wrap sKLIMA</h2>
        <p className={T.body2}>
          <Trans id="msg.wsklima">
            wsKLIMA is an index-adjusted wrapper for sKLIMA. Some people may
            find this useful for accounting purposes. Unlike your sKLIMA
            balance, your wsKLIMA balance will not increase over time.
          </Trans>
        </p>
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


        <div className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans>BALANCE</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.balance.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.klimaBalanceBar}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder={`NOT CONNECTED`}
            >
              <span>{showRelevantBalance()}</span>
              <span>{view === "unwrap" && "w"}sKLIMA</span>
            </WithPlaceholder>
          </div>
        </div>

        <div className={styles.dataContainer_label}>WRAP SKLIMA</div>

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


      {address && (
        <div className={styles.dataContainer_address}>
          {concatAddress(address)}
        </div>
      )}

      <ul className={styles.dataContainer}>
        {singletonSource}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            CURRENT INDEX
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
            BALANCE
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
        {/* <li className={styles.dataContainer_row}>
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
        </li> */}
        {/* <li className={styles.dataContainer_row}>
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
        </li> */}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            YOU WILL GET
            <TextInfoTooltip
              singleton={singleton}
              content=""
            >
              <div tabIndex={0} style={{ visibility: "hidden" }} className={styles.infoIconWrapper}>
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
      {getStatusMessage() && (
        <p className={styles.statusMessage}>{getStatusMessage()}</p>
      )}
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
