import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { getWalletHoldings } from "actions/deposit";
import { BalancesCard } from "components/BalancesCard";
import { CarbonTokenModal } from "components/CarbonTokenModal";
import { DisclamerModal } from "components/DisclaimerModal";
import * as styles from "components/views/Stake/styles";
import { formatEther } from "ethers-v6";
import { tokenInfo } from "lib/getTokenInfo";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as localStyles from "./styles";

interface Props {
  isConnected: boolean;
}

export const Deposit = (props: Props) => {
  const { address } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [holdings, setHoldings] = useState<any>([]); // TODO - fix types

  // TODO - fetch a list of carbon tokens for the connected user
  useEffect(() => {
    if (!address) return;
    (async () => {
      setHoldings(
        await getWalletHoldings({
          address: address as string,
        })
      );
    })();
  }, [address]);

  const firstTCO2Token = holdings?.find(
    ({ token }: any) => token?.symbol.startsWith("TCO2") // TODO - fix types
  );

  console.log(firstTCO2Token);

  return (
    <>
      <DisclamerModal />
      <BalancesCard assets={["klima", "sklima", "wsklima", "bct"]} tooltip="" />
      <div className={cx(styles.stakeCard, localStyles.card)}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <AccountBalanceWalletOutlined />
            <Trans>Deposit Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>Deposit TCO2 in exchange for BCT.</Trans>
          </Text>
        </div>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <Trans>Token to deposit</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>
              Select the TCO2 Token and the amount you want to deposit to the
              pool.
            </Trans>
          </Text>
        </div>
        <div className={cx(localStyles.grid, "cols-5")}>
          <div className="start">
            {firstTCO2Token && (
              <div onClick={() => setShowModal(true)}>
                <Text className={localStyles.titleText}>
                  {firstTCO2Token?.token.symbol}
                </Text>
                <Text className={localStyles.descriptionText}>
                  {formatEther(firstTCO2Token?.amount?.toString())} TCO2
                </Text>
              </div>
            )}
          </div>
          <div className="divider" />
          <div className="end">
            <div>
              <Text className={localStyles.titleText}>
                <Trans>0.85</Trans>
              </Text>
              <Text className={localStyles.descriptionText}>
                <Trans>Available Balance</Trans>
              </Text>
            </div>
          </div>
          <div className="divider" />
          <div className="end">
            <div>
              <Text className={localStyles.titleText}>
                <Trans>0.85</Trans>
              </Text>
              <Text className={localStyles.descriptionText}>
                <Trans>Deposit TC02</Trans>
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <Trans>BCT to receive</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans>You'll receive BCT in exchange for your TCO2.</Trans>
          </Text>
        </div>
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
            <Text className={localStyles.titleText}>0.0</Text>
            <Text className={localStyles.descriptionText}>
              <Trans>Receiving BCT</Trans>
            </Text>
          </div>
        </div>
      </div>
      {showModal && props.isConnected && (
        <CarbonTokenModal holdings={holdings} />
      )}
    </>
  );
};
