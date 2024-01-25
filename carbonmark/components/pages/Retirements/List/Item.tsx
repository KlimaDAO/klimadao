import { Text } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  concatAddress,
  formatUnits,
  getRetirementTokenByAddress,
  trimWithLocale,
} from "@klimadao/lib/utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import { getProjectTokenFromBridgeProtocol } from "lib/getProjectTokenFromBridgeProtocol";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { LeafIcon } from "./Leaf";
import * as styles from "./styles";

type Props = {
  retirement: KlimaRetire;
  nameserviceDomain?: string;
};

export const RetirementItem: FC<Props> = (props) => {
  const { retirement, nameserviceDomain } = props;
  const { locale } = useRouter();

  const retirementNumber = Number(retirement.index) + 1;
  const retirementDate = new Date(parseInt(retirement.retire.timestamp) * 1000); //expects milliseconds
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(retirementDate);

  const poolTokenName = getRetirementTokenByAddress(
    retirement.retire.credit?.poolBalances?.pool?.id ??
      retirement.retire.credit.id
  );
  // can be null
  const projectTokenName = getProjectTokenFromBridgeProtocol(
    retirement.retire.credit.bridgeProtocol
  );

  const tokenData = carbonTokenInfoMap[poolTokenName || projectTokenName];

  const url = `/retirements/${
    nameserviceDomain || retirement.retire.beneficiaryAddress.id
  }/${retirementNumber}`;

  return (
    <Link href={url} passHref className={styles.allRetirementsListItem}>
      {tokenData ? (
        <Image
          alt={tokenData.label}
          src={tokenData.icon}
          width={48}
          height={48}
          className="tokenIcon"
        />
      ) : (
        <LeafIcon />
      )}
      <div className="content">
        <div className="amount">
          <Text>
            {trimWithLocale(formatUnits(retirement.retire.amount), 4, locale)}
          </Text>
          <Text color="lightest">
            {(tokenData && tokenData.label) ||
              concatAddress(retirement.retire.pool.id)}
          </Text>
        </div>
        <Text color="lightest" className="time">
          {formattedDate}
        </Text>
      </div>
      <ArrowForwardIcon className="arrow-icon" />
    </Link>
  );
};
