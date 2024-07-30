import { cx } from "@emotion/css";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { addresses } from "@klimadao/lib/constants";
import { TCO2Icon } from "@klimadao/lib/resources";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  approveDepositToken,
  depositTokens,
  getAllowance,
} from "actions/deposit";
import { BalancesCard } from "components/BalancesCard";
import { CarbonTokenModal } from "components/CarbonTokenModal";
import { DisclaimerModal } from "components/DisclaimerModal";
import { TransactionModal } from "components/TransactionModal";
import { providers } from "ethers";
import { formatUnits } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import { CarbonToken, queryUserCarbonTokens } from "lib/queryUserCarbonTokens";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { AppNotificationStatus, TxnStatus, setAppState } from "state/app";
import { selectNotificationStatus } from "state/selectors";
import * as styles from "./styles";

interface Props {
  address?: string;
  isConnected: boolean;
  provider?: providers.JsonRpcProvider;
  onRPCError: () => void;
  toggleModal: () => void;
}

export const Deposit = (props: Props) => {
  const dispatch = useAppDispatch();
  const { address, toggleModal } = useWeb3();
  const [quantity, setQuantity] = useState("0.0");
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [allowance, setAllowance] = useState({ spender: "", value: "0" });
  const [holdings, setHoldings] = useState<null | Array<CarbonToken>>(null);
  const [selectedToken, setSelectedToken] =
    useState<Pick<CarbonToken, "amount" | "token">>();

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const formattedTokenBalance = selectedToken
    ? formatUnits(
        selectedToken?.amount?.toString(),
        selectedToken.token.decimals
      )
    : "0.0";

  const insufficientTokens = Number(formattedTokenBalance) < Number(quantity);
  const hasAllowance = !!Number(allowance.value);
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  useEffect(() => {
    if (!address) return;
    getTokensHoldings();
  }, [address]);

  useEffect(() => {
    getTokenAllowance();
  }, [selectedToken]);

  const closeTransactionModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const handleOnSuccess = async () => {
    setQuantity("0");
  };

  const getButtonProps = () => {
    if (!props.isConnected) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: toggleModal,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return {
        label: t({ id: "shared.confirming", message: "Confirming" }),
        disabled: true,
      };
    } else if (!quantity || !Number(quantity)) {
      return {
        label: t`Enter quantity`,
        disabled: true,
      };
    } else if (insufficientTokens) {
      return {
        label: t`Insufficient balance`,
        disabled: true,
      };
    } else if (!hasAllowance) {
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

  const getTokensHoldings = async () => {
    let tokens = await queryUserCarbonTokens(address as string);
    tokens = tokens.filter(
      ({ amount, token }) => !!Number(amount) && token.symbol.includes("VCS")
    );
    setHoldings(tokens);
    setSelectedToken(
      tokens?.find(({ token }) => token?.symbol.startsWith("TCO2"))
    );
  };

  const getTokenAllowance = async () => {
    if (!props.provider || !selectedToken || !address) return;
    try {
      const value = await getAllowance({
        provider: props.provider,
        selectedToken,
        address: address,
      });
      setAllowance({ value, spender: selectedToken.token.id });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleApprove = async () => {
    if (!props.provider || !selectedToken) return;
    try {
      const value = await approveDepositToken({
        provider: props.provider,
        selectedToken,
        quantity,
        onStatus: setStatus,
      });
      setAllowance({ value, spender: selectedToken?.token.id });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleDeposit = async () => {
    if (!props.provider || !selectedToken) return;
    try {
      await depositTokens({
        provider: props.provider,
        selectedToken,
        quantity,
        onStatus: setStatus,
      });
      handleOnSuccess();
      await getTokensHoldings();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return (
    <>
      <DisclaimerModal />
      <BalancesCard assets={["klima", "sklima", "wsklima", "bct"]} tooltip="" />
      <div className={styles.card}>
        <div className={styles.stakeCardRow}>
          <Text t="h5" className={styles.cardTitle}>
            <AccountBalanceWalletOutlined />
            <Trans>Deposit Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>Deposit TCO2 in exchange for BCT.</Trans>
          </Text>
        </div>
        <div className={styles.stakeCardRow}>
          <Text t="h5" className={styles.cardTitle}>
            <Trans>Token to deposit</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Select the TCO2 Token and the amount you want to deposit to the
              pool.
            </Trans>
          </Text>
          <div className={cx(styles.grid, "cols-5")}>
            <button className="start" onClick={() => setShowModal(true)}>
              <div aria-label="title">
                <Text className={styles.titleText}>
                  {selectedToken?.token.symbol ?? "-"}
                </Text>
                <Text className={styles.descriptionText}>
                  {props.isConnected ? formattedTokenBalance : "-"} TCO2
                </Text>
              </div>
              {selectedToken && (
                <KeyboardArrowDown fontSize="large" htmlColor="white" />
              )}
            </button>
            <div className="divider" />
            <div className="end">
              <Text
                className={cx(styles.titleText, {
                  [styles.balanceErrorText]: !!insufficientTokens,
                })}
              >
                <Trans>{props.isConnected ? formattedTokenBalance : "-"}</Trans>
              </Text>
              <Text
                className={cx(styles.descriptionText, {
                  [styles.balanceErrorText]: !!insufficientTokens,
                })}
              >
                <Trans>Available Balance</Trans>
              </Text>
            </div>
            <div className="divider" />
            <div className="end row">
              <div className="end">
                <input
                  className={cx(styles.input, {
                    [styles.inputError]: !!insufficientTokens,
                  })}
                  min="0"
                  type="number"
                  value={quantity}
                  placeholder="0.0"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Text className={styles.descriptionText}>
                  <Trans>Deposit TC02</Trans>
                </Text>
              </div>
              <button
                type="button"
                disabled={!props.isConnected}
                className={styles.maxButton}
                onClick={() =>
                  setQuantity(formattedTokenBalance.toString() ?? "0.0")
                }
              >
                <Trans>Max</Trans>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.stakeCardRow}>
          <Text t="h5" className={styles.cardTitle}>
            <Trans>BCT to receive</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>You'll receive BCT in exchange for your TCO2.</Trans>
          </Text>
          <div className={cx(styles.grid, "cols-3")}>
            <div aria-label="bct-icon" className="start">
              <Image
                width={42}
                height={42}
                className="icon"
                src={tokenInfo.bct.icon}
                alt={tokenInfo.bct.label || ""}
              />
              <Text className={styles.titleText}>
                <Trans>Base Carbon Tonne</Trans>
              </Text>
            </div>
            <div className="divider" />
            <div className="end">
              <Text className={styles.titleText}>
                {!insufficientTokens && quantity ? quantity : "-"}
              </Text>
              <Text className={styles.descriptionText}>
                <Trans>Receiving BCT</Trans>
              </Text>
            </div>
          </div>
        </div>
        <ButtonPrimary className={styles.depositButton} {...getButtonProps()} />
      </div>
      {showModal && selectedToken && props.isConnected && (
        <CarbonTokenModal
          holdings={holdings}
          onHide={() => setShowModal(false)}
          onSelect={setSelectedToken}
        />
      )}
      {showTransactionModal && (
        <TransactionModal
          title={
            <Text t="h4" className={styles.headerTitle}>
              <AccountBalanceWalletOutlined />
              <Trans>Deposit Carbon</Trans>
            </Text>
          }
          onCloseModal={closeTransactionModal}
          spenderAddress={
            !!hasAllowance
              ? addresses["mainnet"].bct
              : selectedToken?.token.id ?? ""
          }
          tokenName="tco2"
          tokenIcon={TCO2Icon}
          value={quantity}
          approvalValue={quantity}
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleApprove}
          hasApproval={!!hasAllowance}
          onSubmit={handleDeposit}
        />
      )}
    </>
  );
};
