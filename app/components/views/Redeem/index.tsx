import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeApprovalTransaction, redeemTransaction } from "actions/redeem";
import styles from "components/views/Stake/index.module.css";

import { Spinner } from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";
import { ethers } from "ethers";
import { selectBalances, selectMigrateAllowance } from "state/selectors";
import { redeem, setMigrateAllowance } from "state/user";

interface Props {
  provider: ethers.providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const Redeem: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"
  const [view, setView] = useState("aklima"); // aKLIMA alKLIMA
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
      dispatch(redeem({ token, value }));
    } catch (e) {
      return;
    }
  };

  const hasApproval = (token: "aklima" | "alklima") => {
    if (token === "aklima") return allowances && !!Number(allowances.aklima);
    return allowances && !!Number(allowances.alklima);
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!isConnected || !address) {
      return { children: "Please Connect", onClick: undefined, disabled: true };
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
    } else if (view === "aklima" && !hasApproval("aklima")) {
      return { children: "Approve", onClick: handleApproval("aklima") };
    } else if (view === "alklima" && !hasApproval("alklima")) {
      return { children: "Approve", onClick: handleApproval("alklima") };
    } else if (view === "aklima") {
      return {
        children: "Redeem",
        onClick: handleRedeem("aklima"),
        disabled: !value || !balances || value > Number(balances.aklima),
      };
    } else if (view === "alklima") {
      return {
        children: "Redeem",
        onClick: handleRedeem("alklima"),
        disabled: !value || !balances || value > Number(balances.alklima),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
    }
  };

  const getStatusMessage = () => {
    if (status === "userConfirmation") {
      return "Please click 'confirm' in your wallet to continue.";
    } else if (status === "networkConfirmation") {
      return "Transaction initiated. Waiting for network confirmation.";
    } else if (status === "error") {
      return "❌ Error: something went wrong...";
    } else if (status === "done") {
      return "✔️ Success!";
    } else if (status === "userRejected") {
      return "✖️ You chose to reject the transaction.";
    }
    return null;
  };

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Redeem aKLIMA</h2>
        <p className={t.body2}>
          If you received AlphaKLIMA from the Fair Launch Auction, or
          AlchemistKLIMA from the Crucible rewards event, use this tool to
          redeem them for KLIMA.
        </p>
        <p className={t.body2}>
          👉{" "}
          <strong>
            Before proceeding: you must bridge your aKLIMA and alKLIMA tokens
            from Ethereum to Polygon.
          </strong>
        </p>
        <p className={t.body2}>
          Complete the migration at{" "}
          <a target="_blank" href="https://wallet.polygon.technology/bridge">
            wallet.polygon.technology
          </a>{" "}
          or, if you are new to this, read our{" "}
          <a
            target="_blank"
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
            placeholder={`${
              { aKLIMA: "aklima", alKLIMA: "alklima" }[view]
            } to redeem`}
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

      <div className={styles.dataContainer}>
        {address && (
          <p className={styles.dataContainer_address}>
            {address.slice(0, 5)}..{address.slice(address.length - 3)}
          </p>
        )}
        <div className="stake-price-data-row">
          <p className="price-label">Redeemable aKLIMA</p>
          <p className="price-data">
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.aklima, 4)}</span> aKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Redeemable alKLIMA</p>
          <p className="price-data">
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.alklima, 4)}</span> alKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Balance</p>
          <p className="price-data">
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.klima, 4)}</span> KLIMA
            </WithPlaceholder>
          </p>
        </div>
      </div>
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
