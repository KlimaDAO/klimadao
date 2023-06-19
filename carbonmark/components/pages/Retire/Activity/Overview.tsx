import { cx } from "@emotion/css";
import {
  getTotalCarbonRetired,
  getTotalRetirements,
  useWeb3,
} from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const RetireOverview: FC = () => {
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

        const [totalRetirements, totalCarbonRetired] = await Promise.all([
          getTotalRetirements({ beneficiaryAddress: address }),
          getTotalCarbonRetired({ beneficiaryAddress: address }),
        ]);

        setTotalRetirements(totalRetirements);
        setTotalCarbonRetired(totalCarbonRetired);
      } catch (e) {
        console.error(e);
        setError(t`There was an error getting your total retirement data`);
      } finally {
        setIsLoadingTotals(false);
      }
    };
    initData();
  }, [isConnectedUser]);

  return (
    <Card>
      <Text t="h4">{t`Retirement Overview`}</Text>
      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total carbon tonnes retired`}</Text>
        {isLoadingTotals && <Text>{t`Loading...`}</Text>}
        {!isLoadingTotals && (
          <Text t="h2" className={cx({ error: !!error })}>
            {totalCarbonRetired}
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
