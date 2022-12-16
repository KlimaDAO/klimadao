import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { concatAddress, trimStringDecimals } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Tippy from "@tippyjs/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Wallet } from "../../../types";
import { BaseCard } from "../BaseCard";
import { RetirementsChartProps } from "./RetirementsChart";
import * as styles from "./styles";

const RetirementsChart: React.ComponentType<RetirementsChartProps> = dynamic(
  () => import("./RetirementsChart").then((mod) => mod.RetirementsChart),
  { ssr: false }
);

type Props = {
  pageAddress: string;
  retirements: RetirementsTotalsAndBalances | null;
  isPledgeOwner: boolean;
  secondaryWallets?: Wallet[];
};

export const RetirementsCard: FC<Props> = (props) => {
  const [showWallets, setShowWallets] = useState<boolean>(false);
  const totalTonnesRetired =
    props.retirements && Number(props.retirements.totalTonnesRetired) > 0
      ? trimStringDecimals(props.retirements.totalTonnesRetired, 2)
      : 0;
  const content = (
    <div className={styles.pledge_retirements_wallets}>
      <span className={styles.pledge_retirements_wallet}>
        <Text>{concatAddress(props.pageAddress)}</Text>
        <Link href={`/retirements/${props.pageAddress}`} passHref>
          <div className={styles.retirementsLink}>
            <LaunchIcon />
          </div>
        </Link>
      </span>
      {props.secondaryWallets &&
        Object.values(props.secondaryWallets)?.map((wallet: Wallet) => {
          if (wallet.status === "verified") {
            return (
              <span
                key={wallet.address}
                className={styles.pledge_retirements_wallet}
              >
                <Text>{concatAddress(wallet.address)}</Text>
                <Link
                  href={`/retirements/${wallet.address}`}
                  passHref
                  id="view_retirements"
                >
                  <div className={styles.retirementsLink}>
                    <LaunchIcon />
                  </div>
                </Link>
              </span>
            );
          } else if (props.isPledgeOwner && wallet.status === "pending") {
            return (
              <span
                key={wallet.address}
                className={styles.pledge_retirements_wallet}
              >
                <Text>{concatAddress(wallet.address)}</Text>
                <span className={styles.pledge_wallet_pending}>
                  <Text t="caption">Pending</Text>
                </span>
              </span>
            );
          }
        })}
    </div>
  );
  const linkToRetirements = (
    <Tippy
      content={content}
      interactiveBorder={20}
      interactive={true}
      delay={100}
      onClickOutside={() => setShowWallets(false)}
      placement="bottom-end"
      visible={showWallets}
    >
      <span onClick={() => setShowWallets((p: boolean) => !p)}>
        <KeyboardArrowDownIcon
          fontSize="large"
          className={cx(styles.arrow_down, {
            open: showWallets,
          })}
        />
      </span>
    </Tippy>
  );
  return (
    <BaseCard
      title={t({
        id: "pledges.dashboard.retirements.title",
        message: "Retirements",
      })}
      icon={<LocalFireDepartmentIcon fontSize="large" />}
      action={linkToRetirements}
    >
      <div className={styles.value}>
        {props.retirements ? (
          <Text t="h1" uppercase>
            {totalTonnesRetired}
          </Text>
        ) : (
          <Text t="h4" color="lightest">
            <Trans id="shared.loading">Loading...</Trans>
          </Text>
        )}

        <Text t="h4" color="lightest">
          <Trans id="pledges.dashboard.retirements.total_tonnes_retired">
            Total Carbon Tonnes Retired
          </Trans>
        </Text>
      </div>

      {props.retirements &&
        Number(props.retirements.totalTonnesRetired) > 0 && (
          <div className={styles.chartContainer}>
            <RetirementsChart retirements={props.retirements} />
          </div>
        )}
    </BaseCard>
  );
};
