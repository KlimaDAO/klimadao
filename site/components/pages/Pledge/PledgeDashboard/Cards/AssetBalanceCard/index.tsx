import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

import BCTIcon from "public/icons/BCT.png";
import KlimaIcon from "public/icons/KLIMA.png";
import MCO2Icon from "public/icons/MCO2.png";
import { getBalances, Balances } from "lib/getBalances";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
};

export const AssetBalanceCard: FC<Props> = (props) => {
  const [balances, setBalances] = useState<Balances | null>(null);

  const formatBalance = (balance: string) =>
    Number(balance) > 0.01 ? trimStringDecimals(balance, 2) : 0;

  useEffect(() => {
    (async () => {
      const balances = await getBalances({
        address: props.pageAddress,
      });
      setBalances(balances);
    })();
  }, []);

  return (
    <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.klima)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  Klima
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.sklima)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest">
                  s
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  Klima
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={MCO2Icon} alt="MCO2" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.mco2)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  MCO2
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={BCTIcon} alt="BCT" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.bct)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  BCT
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
