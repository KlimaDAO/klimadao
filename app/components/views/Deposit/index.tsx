import { cx } from "@emotion/css";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { addresses } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { approveDepositToken, depositTokens } from "actions/deposit";
import { BalancesCard } from "components/BalancesCard";
import { CarbonTokenModal } from "components/CarbonTokenModal";
import { DisclamerModal } from "components/DisclaimerModal";
import { TransactionModal } from "components/TransactionModal";
import * as styles from "components/views/Stake/styles";
import { providers } from "ethers";
import { formatEther } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import { useTypedSelector } from "lib/hooks/useTypedSelector";
import { CarbonToken, queryUserCarbonTokens } from "lib/queryUserCarbonTokens";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { AppNotificationStatus, TxnStatus, setAppState } from "state/app";
import {
  selectAllowancesWithParams,
  selectNotificationStatus,
} from "state/selectors";
import { setAllowance } from "state/user";
import * as localStyles from "./styles";

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
  const [holdings, setHoldings] = useState<null | Array<CarbonToken>>(null);
  const [selectedToken, setSelectedToken] =
    useState<Pick<CarbonToken, "amount" | "token">>();

  const allowances = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: ["bct"],
      // @ts-expect-error - fix this (need to allow custom spender for tco2 tokens)
      spender: selectedToken?.token.id,
    })
  );

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const formattedTokenBalance = selectedToken
    ? formatEther(selectedToken?.amount?.toString())
    : 0;

  const insufficientTokens = Number(formattedTokenBalance) < Number(quantity);
  const hasAllowance = allowances?.bct && !!Number(allowances?.bct);
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus?.statusType;

  const closeTransactionModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const handleOnSuccess = () => {
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

  useEffect(() => {
    if (!address) return;
    (async () => {
      let tokens = await queryUserCarbonTokens(address as string);
      // filter out tokens that don't have a balance or are not TCO2
      tokens = tokens.filter(
        ({ amount, token }) => !!Number(amount) && token.symbol.includes("VCS")
      );

      console.log("tokens", tokens);
      setHoldings(tokens);
      setSelectedToken(
        tokens?.find(({ token }) => token?.symbol.startsWith("TCO2"))
      );
    })();
  }, [address]);

  const handleApprove = async () => {
    if (!props.provider || !selectedToken) return;
    try {
      const approvedValue = await approveDepositToken({
        provider: props.provider,
        selectedToken,
        quantity,
        onStatus: setStatus,
      });
      dispatch(
        setAllowance({
          token: "bct",
          // @ts-expect-error - need to allow a customer spender for individual tco2 tokens
          spender: selectedToken?.token.id,
          value: approvedValue,
        })
      );
    } catch (e) {
      return;
    }
  };

  const handleDeposit = async () => {
    if (!props.provider || !selectedToken) return;
    try {
      const depositedResult = await depositTokens({
        provider: props.provider,
        selectedToken,
        quantity,
        onStatus: setStatus,
      });
      // handle depositedResult after...
      console.log("depositedResult", depositedResult);

      handleOnSuccess();
    } catch (e) {
      return;
    }
  };

  return (
    <>
      <DisclamerModal />
      <BalancesCard assets={["klima", "sklima", "wsklima", "bct"]} tooltip="" />
      <div className={cx(styles.stakeCard, localStyles.card)}>
        <div className={localStyles.stakeCardRow}>
          <Text t="h5" className={localStyles.cardTitle}>
            <AccountBalanceWalletOutlined />
            <Trans>Deposit Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>Deposit TCO2 in exchange for BCT.</Trans>
          </Text>
        </div>
        <div className={localStyles.stakeCardRow}>
          <Text t="h5" className={localStyles.cardTitle}>
            <Trans>Token to deposit</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Select the TCO2 Token and the amount you want to deposit to the
              pool.
            </Trans>
          </Text>
          <div className={cx(localStyles.grid, "cols-5")}>
            <button className="start" onClick={() => setShowModal(true)}>
              <div aria-label="title">
                <Text className={localStyles.titleText}>
                  {selectedToken?.token.symbol ?? "-"}
                </Text>
                <Text className={localStyles.descriptionText}>
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
                className={cx(localStyles.titleText, {
                  [localStyles.balanceErrorText]: !!insufficientTokens,
                })}
              >
                <Trans>{props.isConnected ? formattedTokenBalance : "-"}</Trans>
              </Text>
              <Text
                className={cx(localStyles.descriptionText, {
                  [localStyles.balanceErrorText]: !!insufficientTokens,
                })}
              >
                <Trans>Available Balance</Trans>
              </Text>
            </div>
            <div className="divider" />
            <div className="end">
              <input
                className={cx(localStyles.input, {
                  [localStyles.inputError]: !!insufficientTokens,
                })}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                min="0"
                type="number"
                placeholder="0.0"
              />
              <Text className={localStyles.descriptionText}>
                <Trans>Deposit TC02</Trans>
              </Text>
            </div>
          </div>
        </div>
        <div className={localStyles.stakeCardRow}>
          <Text t="h5" className={localStyles.cardTitle}>
            <Trans>BCT to receive</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>You'll receive BCT in exchange for your TCO2.</Trans>
          </Text>
          <div className={cx(localStyles.grid, "cols-3")}>
            <div className="start">
              <Image
                width={42}
                height={42}
                className="icon"
                src={tokenInfo.bct.icon}
                alt={tokenInfo.bct.label || ""}
              />
              <Text className={localStyles.titleText}>
                <Trans>Base Carbon Tonne</Trans>
              </Text>
            </div>
            <div className="divider" />
            <div className="end">
              <Text className={localStyles.titleText}>
                {!insufficientTokens && quantity ? quantity : "-"}
              </Text>
              <Text className={localStyles.descriptionText}>
                <Trans>Receiving BCT</Trans>
              </Text>
            </div>
          </div>
        </div>
        <ButtonPrimary
          className={localStyles.depositButton}
          {...getButtonProps()}
        />
      </div>
      {showModal && selectedToken && props.isConnected && (
        <CarbonTokenModal
          holdings={holdings}
          onHide={() => setShowModal(false)}
          onSelect={(token: any) => setSelectedToken(token)}
        />
      )}
      {showTransactionModal && (
        <TransactionModal
          title={
            <Text t="h4" className={localStyles.headerTitle}>
              <AccountBalanceWalletOutlined />
              <Trans>Deposit Carbon</Trans>
            </Text>
          }
          onCloseModal={closeTransactionModal}
          tokenName={"bct"}
          tokenIcon={tokenInfo.bct.icon}
          spenderAddress={addresses["mainnet"].bct}
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
