import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { changeApprovalTransaction, redeemTransaction } from "actions/redeem";

// Copied from Stake view despite T/t (changed styles to match original)
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "components/views/Stake/index.module.css";
import { Trans } from "@lingui/macro";

import { Spinner } from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { ethers } from "ethers";
import { selectBalances, selectMigrateAllowance } from "state/selectors";
import { redeemAlpha, setMigrateAllowance } from "state/user";
import { useAppDispatch } from "state";

interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const Redeem: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"
  const [view, setView] = useState<"aklima" | "alklima">("aklima"); // aKLIMA alKLIMA
  const [quantity, setQuantity] = useState("");

  const balances = useSelector(selectBalances);
  const allowances = useSelector(selectMigrateAllowance);

  const isLoading = !balances || typeof balances.klima === "undefined";
  const showSpinner =
    isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const setMax = () => {
    setStatus("");
    if (view === "aklima") {
      setQuantity(balances?.aklima ?? "0");
    } else {
      setQuantity(balances?.alklima ?? "0");
    }
  };

  const handleApproval = (action: "aklima" | "alklima") => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        action,
        onStatus: setStatus,
      });
      dispatch(
        setMigrateAllowance({
          [action]: value,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleRedeem = (token: "aklima" | "alklima") => async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await redeemTransaction({
        action: token,
        provider,
        value,
        onStatus: setStatus,
      });
      dispatch(redeemAlpha({ token, value }));
    } catch (e) {
      return;
    }
  };

  const hasApproval = (token: "aklima" | "alklima") => {
    if (token === "aklima") return allowances && !!Number(allowances.aklima);
    return allowances && !!Number(allowances.alklima);
  };

  // added trans tags below - sirthus
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
    } else if (view === "aklima" && !hasApproval("aklima")) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleApproval("aklima"),
      };
    } else if (view === "alklima" && !hasApproval("alklima")) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleApproval("alklima"),
      };
    } else if (view === "aklima") {
      return {
        children: <Trans id="button.redeem">Redeem</Trans>,
        onClick: handleRedeem("aklima"),
        disabled: !value || !balances || value > Number(balances.aklima),
      };
    } else if (view === "alklima") {
      return {
        children: <Trans id="button.redeem">Redeem</Trans>,
        onClick: handleRedeem("alklima"),
        disabled: !value || !balances || value > Number(balances.alklima),
      };
    } else {
      return {
        children: <Trans id="button.error">ERROR</Trans>,
        onClick: undefined,
        disabled: true,
      };
    }
  };

  // added trans tags below - sirthus
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

  // Added trans ids as msg. unsure? - sirthus
  // how to use trans id and links?
  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={T.h4}>Redeem aKLIMA</h2>
        <p className={T.body2}>
          <Trans id="msg.aklima">
            If you received AlphaKLIMA from the Fair Launch Auction, or
            AlchemistKLIMA from the Crucible rewards event, use this tool to
            redeem them for KLIMA.
          </Trans>
        </p>
        <p className={T.body2}>
          👉{" "}
          <strong>
            <Trans id="msg.bridge">
              Before proceeding: you must bridge your aKLIMA and alKLIMA tokens
              from Ethereum to Polygon.
            </Trans>
          </strong>
        </p>
        <p className={T.body2}>
          Complete the migration at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wallet.polygon.technology/bridge"
          >
            wallet.polygon.technology
          </a>{" "}
          or, if you are new to this, read our{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://klimadao.notion.site/How-to-bridge-AlphaKLIMA-and-AlchemistKLIMA-tokens-to-the-Polygon-network-93a59c8e639c45c3a2d296bdef5fc1d5"
          >
            tutorial for beginners
          </a>
          .
        </p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setView("aklima");
            }}
            data-active={view === "aklima"}
          >
            aKLIMA
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setView("alklima");
            }}
            data-active={view === "alklima"}
          >
            alKLIMA
          </button>
        </div>
        <div className={styles.stakeInput}>
          <input
            className={styles.stakeInput_input}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            placeholder={`${view} to redeem`}
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
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>Redeemable aKLIMA</div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.aklima, 4)}</span> aKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>Redeemable alKLIMA</div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.alklima, 4)}</span> alKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>Balance</div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.klima, 4)}</span> KLIMA
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
