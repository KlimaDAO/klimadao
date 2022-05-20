import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Text } from "@klimadao/lib/components";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  concatAddress,
  getRetirementTokenByAddress,
} from "@klimadao/lib/utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import { LeafIcon } from "./Leaf";

import * as styles from "./styles";

type Props = {
  retirement: KlimaRetire;
};

export const RetirementItem: FC<Props> = (props) => {
  const { retirement } = props;
  const { locale } = useRouter();

  const retirementNumber = Number(retirement.index) + 1;
  const retirementDate = new Date(parseInt(retirement.timestamp) * 1000); //expects milliseconds
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(retirementDate);
  const typeOfToken = getRetirementTokenByAddress(
    retirement.offset.tokenAddress
  );
  // typeOfToken can be undefined! Due to incorrect tokenAddress received from subgraph - Why?

  const url = `/retirements/${retirement.beneficiaryAddress}/${retirementNumber}`;

  return (
    <Link href={url} passHref>
      <a className={styles.allRetirementsListItem}>
        <Text className="number">{retirementNumber}.</Text>
        <LeafIcon />
        <div className="content">
          <Text className="value">
            {retirement.amount}{" "}
            {(typeOfToken && typeOfToken.toUpperCase()) ||
              concatAddress(retirement.offset.tokenAddress)}
          </Text>
          <Text className="label" color="lightest">
            {formattedDate}
          </Text>
        </div>
        <ArrowForwardIcon className="arrow-icon" />
      </a>
    </Link>
  );
};
