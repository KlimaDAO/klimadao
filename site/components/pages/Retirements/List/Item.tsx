import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Text } from "@klimadao/lib/components";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  concatAddress,
  getRetirementTokenByAddress,
  trimWithLocale,
} from "@klimadao/lib/utils";

import { retirementTokenInfoMap } from "lib/getTokenInfo";
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

  const typeOfToken = getRetirementTokenByAddress(retirement.pool);
  const tokenData = !!typeOfToken && retirementTokenInfoMap[typeOfToken];

  const url = `/retirements/${retirement.beneficiaryAddress}/${retirementNumber}`;

  return (
    <Link href={url} passHref>
      <a className={styles.allRetirementsListItem}>
        {tokenData ? (
          <Image
            alt={tokenData.label}
            src={tokenData.icon}
            width={48}
            height={48}
          />
        ) : (
          <LeafIcon />
        )}
        <div className="content">
          <div className="amount">
            <Text>{trimWithLocale(retirement.amount, 5, locale)}</Text>
            <Text color="lightest">
              {(tokenData && tokenData.label) || concatAddress(retirement.pool)}
            </Text>
          </div>
          <Text color="lightest" className="time">
            {formattedDate}
          </Text>
        </div>
        <ArrowForwardIcon className="arrow-icon" />
      </a>
    </Link>
  );
};
