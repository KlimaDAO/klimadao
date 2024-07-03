import { cx } from "@emotion/css";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { BalancesCard } from "components/BalancesCard";
import { CarbonTokenModal } from "components/CarbonTokenModal";
import { DisclamerModal } from "components/DisclaimerModal";
import * as styles from "components/views/Stake/styles";
import { formatEther } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import { CarbonToken, queryUserCarbonTokens } from "lib/queryUserCarbonTokens";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as localStyles from "./styles";

interface Props {
  isConnected: boolean;
}

export const Deposit = (props: Props) => {
  const { address, toggleModal } = useWeb3();
  const [quantity, setQuantity] = useState("0.0");
  const [showModal, setShowModal] = useState(false);
  const [holdings, setHoldings] = useState<null | Array<CarbonToken>>(null);
  const [selectedToken, setSelectedToken] =
    useState<Pick<CarbonToken, "amount" | "token">>();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const tokens = await queryUserCarbonTokens(address as string);
      setHoldings(tokens);
      setSelectedToken(
        tokens?.find(({ token }) => token?.symbol.startsWith("TCO2"))
      );
    })();
  }, [address]);

  const formattedTokenBalance = selectedToken
    ? formatEther(selectedToken?.amount?.toString())
    : 0;

  const insufficientTokens = Number(formattedTokenBalance) < Number(quantity);

  return (
    <>
      <DisclamerModal />
      <BalancesCard assets={["klima", "sklima", "wsklima", "bct"]} tooltip="" />
      <div className={cx(styles.stakeCard, localStyles.card)}>
        <div className={localStyles.stakeCardRow}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <AccountBalanceWalletOutlined />
            <Trans>Deposit Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>Deposit TCO2 in exchange for BCT.</Trans>
          </Text>
        </div>
        <div className={localStyles.stakeCardRow}>
          <Text t="h4" className={styles.stakeCard_header_title}>
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
          <Text t="h4" className={styles.stakeCard_header_title}>
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
              <Text className={localStyles.titleText}>{quantity}</Text>
              <Text className={localStyles.descriptionText}>
                <Trans>Receiving BCT</Trans>
              </Text>
            </div>
          </div>
        </div>
        {props.isConnected ? (
          <ButtonPrimary
            disabled={Number(quantity) === 0 || insufficientTokens}
            label="Continue"
          />
        ) : (
          <ButtonPrimary
            label={t({
              id: "shared.login_connect",
              message: "Login / Connect",
            })}
            onClick={toggleModal}
          />
        )}
      </div>
      {showModal && selectedToken && props.isConnected && (
        <CarbonTokenModal
          holdings={holdings}
          onHide={() => setShowModal(false)}
          onSelect={(token: any) => setSelectedToken(token)}
        />
      )}
    </>
  );
};
