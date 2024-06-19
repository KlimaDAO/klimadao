import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { BalancesCard } from "components/BalancesCard";
import { DisclamerModal } from "components/DisclaimerModal";
import * as styles from "components/views/Stake/styles";
import { tokenInfo } from "lib/getTokenInfo";
import Image from "next/image";
import * as localStyles from "./styles";

interface Props {
  isConnected: boolean;
}

export const Deposit = (props: Props) => {
  return (
    <>
      <DisclamerModal />
      <BalancesCard assets={["klima", "sklima", "wsklima"]} tooltip={<></>} />
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
          <div />
          <div className="divider" />
          <div />
          <div className="divider" />
          <div />
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
