import { cx } from "@emotion/css";
import { formatUnits, trimWithLocale, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { ethers } from "ethers";
import { queryKlimaRetiresByAddress } from "lib/retirementDataQueries/retirementDataViaPolygonDigitalCarbon";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const RetireOverview: FC = () => {
  const { locale } = useRouter();
  const { isConnected, address } = useWeb3();
  const [isLoadingTotals, setIsLoadingTotals] = useState(false);
  const [totalRetirements, setTotalRetirements] = useState<null | number>(0.0);
  const [totalCarbonRetired, setTotalCarbonRetired] = useState<null | string>(
    "0.0"
  );
  const [error, setError] = useState("");

  const isConnectedUser = isConnected && address;

  useEffect(() => {
    const initData = async () => {
      if (!isConnectedUser) {
        setTotalRetirements(0.0);
        setTotalCarbonRetired("0.0");
        return;
      }

      try {
        setIsLoadingTotals(true);
        const klimaRetires = await queryKlimaRetiresByAddress(address);

        const totalRetiredTonnesWei = klimaRetires.reduce((acc, r) => {
          const amount = r.retire.amount;
          return acc.add(amount);
        }, ethers.BigNumber.from(0));

        const formattedTotalRetiredTonnes = formatUnits(
          totalRetiredTonnesWei,
          18
        );
        setTotalRetirements(klimaRetires.length);
        setTotalCarbonRetired(formattedTotalRetiredTonnes.toString());
      } catch (e) {
        console.error(e);
        setError(t`There was an error getting your total retirement data`);
      } finally {
        setIsLoadingTotals(false);
      }
    };
    initData();
  }, [isConnectedUser]);

  if (!isConnectedUser) {
    return (
      <Card>
        <Text t="h4">{t`Retirement Overview`}</Text>
        <Text color="lightest">
          <i>{t`No data to show`}</i>
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <Text t="h4">{t`Retirement Overview`}</Text>
      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total carbon tonnes retired`}</Text>
        {isLoadingTotals && <Text>{t`Loading...`}</Text>}
        {!isLoadingTotals && (
          <Text t="h2" className={cx({ error: !!error })}>
            {trimWithLocale(totalCarbonRetired || "0", 2, locale)}
            {t`t`}
          </Text>
        )}
      </div>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total retirement transactions`}</Text>
        {isLoadingTotals && <Text>{t`Loading...`}</Text>}
        {!isLoadingTotals && (
          <Text t="h2" className={cx({ error: !!error })}>
            {totalRetirements}
          </Text>
        )}
      </div>

      {error && (
        <div className={styles.totalsText}>
          <Text className="error">{error}</Text>
        </div>
      )}
    </Card>
  );
};
