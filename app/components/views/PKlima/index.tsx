import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";

import { selectNotificationStatus } from "state/selectors";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";

import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { concatAddress, trimWithPlaceholder } from "@klimadao/lib/utils";

import { t, Trans } from "@lingui/macro";

import {
  selectAppState,
  selectExerciseAllowance,
  selectPklimaTerms,
} from "state/selectors";
import { redeemPklima, setExerciseAllowance } from "state/user";
import { useAppDispatch } from "state";

import {
  exerciseTransaction,
  changeApprovalTransaction,
  loadTerms,
} from "actions/pklima";
import * as styles from "components/views/Stake/styles";
import { BalancesCard } from "components/BalancesCard";
import { RedeemOutlined } from "@mui/icons-material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
  loadWeb3Modal: () => Promise<void>;
}

export const PKlima: FC<Props> = (props) => {
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

  const [quantity, setQuantity] = useState("");

  const { currentIndex } = useSelector(selectAppState);
  const allowances = useSelector(selectExerciseAllowance);
  const terms = useSelector(selectPklimaTerms);

  const indexAdjustedClaim = Number(terms?.claimed) * Number(currentIndex);
  const isLoading = !allowances || typeof allowances.pklima === "undefined";
  const showSpinner =
    isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  useEffect(() => {
    if (!address) return;
    dispatch(
      loadTerms({
        onStatus: setStatus,
        provider,
        address,
      })
    );
  }, [address]);

  const setMax = () => {
    setStatus(null);
    setQuantity(terms?.redeemable ?? "0");
  };

  const handleApproval = (action: "pklima" | "bct") => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        action,
        onStatus: setStatus,
      });
      dispatch(setExerciseAllowance({ [action]: value }));
    } catch (e) {
      return;
    }
  };

  const handleExercise = async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await exerciseTransaction({
        value,
        provider,
        onStatus: setStatus,
      });
      dispatch(redeemPklima(value));
    } catch (e) {
      return;
    }
  };

  const hasApproval = (token: "pklima" | "bct") => {
    if (token === "pklima") return allowances && !!Number(allowances.pklima);
    return allowances && !!Number(allowances.bct);
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!isConnected || !address) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else if (isLoading) {
      return {
        label: <Trans id="shared.loading">Loading</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return {
        label: <Trans id="shared.confirming">Confirming</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (!hasApproval("pklima")) {
      return {
        label: <Trans id="pklima.approve_pklima">1. Approve pKLIMA</Trans>,
        onClick: handleApproval("pklima"),
      };
    } else if (!hasApproval("bct")) {
      return {
        label: <Trans id="pklima.approve_bct">2. Approve BCT</Trans>,
        onClick: handleApproval("bct"),
      };
    } else {
      return {
        label: <Trans id="pklima.exercise">EXERCISE</Trans>,
        onClick: handleExercise,
        disabled:
          !value || !terms?.redeemable || value > Number(terms.redeemable),
      };
    }
  };

  return (
    <>
      <BalancesCard
        assets={["pklima", "bct"]}
        tooltip={t({
          id: "pklima.balances_card.tooltip",
          message:
            "Make sure to stake your redeemed pKLIMA, and stay staked, until global GHG emissions have plateaued.",
        })}
      />
      <div className={styles.stakeCard} style={{ minHeight: "48rem" }}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <RedeemOutlined />
            <Trans id="pklima.redeem_pklima">Redeem pKLIMA</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="pklima.caption">
              Exercise 1 pKLIMA and 1 BCT to receive 1 KLIMA.
            </Trans>
          </Text>
        </div>
        <div className={styles.stakeCard_ui}>
          <div className={styles.inputsContainer}>
            <div className={styles.stakeInput}>
              <input
                className={styles.stakeInput_input}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setStatus(null);
                }}
                type="number"
                placeholder={t({
                  id: "pklima.klima_to_exercise",
                  message: "pKLIMA to exercise",
                })}
                min="0"
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
              <Trans id="pklima.supply_limit">Supply limit</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="pklima.supply_limit.tooltip">
                    A percent of total token supply. Your index-adjusted claim
                    may not exceed this value.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="pklima.redeemed">Redeemed</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="pklima.redeemed.tooltip">
                    Total KLIMA you have redeemed so far.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="pklima.index_adjusted">Index adjusted</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="pklima.index_adjusted.tooltip">
                    Equivalent sKLIMA claimed, assuming you staked all of your
                    redeemed KLIMA until today.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_value}>
              {terms?.supplyShare
                ? trimWithPlaceholder(terms?.supplyShare, 2) + "%"
                : "loading..."}
            </div>
            <div className={styles.infoTable_value}>
              {terms?.claimed
                ? trimWithPlaceholder(terms?.claimed, 4) + " KLIMA"
                : "loading..."}
            </div>
            <div className={styles.infoTable_value}>
              {indexAdjustedClaim
                ? trimWithPlaceholder(indexAdjustedClaim, 4) + " KLIMA"
                : "loading..."}
            </div>
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
    </>
  );
};
