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
  // TODO - fix types
  const [holdings, setHoldings] = useState<any>([]);

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
            <div onClick={() => setShowModal(true)}>
              <Text>TOKEN SYMBOL</Text>
              <Text>0.85 TCO2</Text>
            </div>
          </div>
          <div className="divider" />
          <div className="end">
            <div>
              <Text>
                <Trans>0.85</Trans>
              </Text>
              <Text>
                <Trans>Available Balance</Trans>
              </Text>
            </div>
          </div>
          <div className="divider" />
          <div className="end">
            <div>
              <Text>
                <Trans>0.85</Trans>
              </Text>
              <Text>
                <Trans>Deposit TC02</Trans>
              </Text>
            </div>
          </div>
        </div>

        {showModal && <CarbonTokenModal holdings={holdings} />}

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
            <Text>
              <Trans>Base Carbon Tonne</Trans>
            </Text>
          </div>
          <div className="divider" />
          <div className="end">
            <Text>0.0</Text>
            <Text>
              <Trans>Receiving BCT</Trans>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
