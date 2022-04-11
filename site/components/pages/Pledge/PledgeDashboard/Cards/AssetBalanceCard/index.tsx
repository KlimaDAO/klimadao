import React, { FC } from "react";
import Image from "next/image";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

import BCTIcon from "public/icon-bct.png";
import KlimaIcon from "public/icon-klima.png";
import MCO2Icon from "public/icon-mco2.png";
import { Balances } from "lib/getBalances";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  balances: Balances;
};

export const AssetBalanceCard: FC<Props> = (props) => {
  const formatBalance = (balance: string) =>
    Number(balance) > 0.01 ? trimStringDecimals(balance, 2) : 0;

  return (
    <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            <Text t="h4" as="span">
              {formatBalance(props.balances.klima)}{" "}
            </Text>
            <Text t="h4" as="span" color="lightest" uppercase>
              Klima
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            <Text t="h4" as="span">
              {formatBalance(props.balances.sklima)}{" "}
            </Text>
            <Text t="h4" as="span" color="lightest">
              s
            </Text>
            <Text t="h4" as="span" color="lightest" uppercase>
              Klima
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={MCO2Icon} alt="MCO2" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            <Text t="h4" as="span">
              {formatBalance(props.balances.mco2)}{" "}
            </Text>
            <Text t="h4" as="span" color="lightest" uppercase>
              MCO2
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={BCTIcon} alt="BCT" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            <Text t="h4" as="span">
              {formatBalance(props.balances.bct)}{" "}
            </Text>
            <Text t="h4" as="span" color="lightest" uppercase>
              BCT
            </Text>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
