import { cx } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import { PoolToken } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Accordion } from "components/Accordion";
import { Text } from "components/Text";
import { formatToTonnes } from "lib/formatNumbers";
import { getPoolTokenType } from "lib/getPoolData";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { createProjectTokenName } from "lib/projectGetter";
import {
  DetailedProject,
  ListingRetirement,
  TokenPrice,
} from "lib/types/carbonmark.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type TotalValuesProps = {
  price: TokenPrice;
  project: DetailedProject;
  actionLabel: string;
  availableLabel: string;
  polyscanUrl: string;
};

export const PoolAssetDetails: FC<TotalValuesProps> = (props) => {
  const { locale } = useRouter();
  const tokenType = getPoolTokenType(
    props.price.poolName.toUpperCase() as Uppercase<PoolToken>
  );
  const tokenData = carbonTokenInfoMap[tokenType];
  const projectTokenName = createProjectTokenName(props.project, tokenType);
  const availableTonnes = formatToTonnes(props.price.supply, locale, 2);

  return (
    <Accordion label={t`Asset details`} className={styles.accordion}>
      <div className={styles.totalsText}>
        <Text color="lightest">{props.actionLabel}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={tokenData.icon}
              width={20}
              height={20}
              alt={tokenData.label}
            />
          </div>
          <Text t="h5">{projectTokenName}</Text>
        </div>
      </div>
      <div className={styles.totalsText}>
        <Text color="lightest">{props.availableLabel}</Text>
        <Text t="h5">
          {availableTonnes} {t`Tonnes`}
        </Text>
      </div>
      <div className={styles.totalsText}>
        <Anchor className={styles.iconAndText} href={props.polyscanUrl}>
          <Text className={styles.externalLink} t="body2">
            {t`View on PolygonScan`} <LaunchIcon />
          </Text>
        </Anchor>
      </div>
    </Accordion>
  );
};

export const ListingAssetDetails: FC<{
  listing: ListingRetirement;
}> = (props) => {
  return (
    <Accordion label={t`Asset details`} className={styles.accordion}>
      <div className={styles.totalsText}>
        <Text color="lightest">{t`Retiring Token`}</Text>
        <div className={cx(styles.iconAndText)}>
          <Text t="h5">{props.listing.symbol}</Text>
        </div>
      </div>
      <div className={styles.totalsText}>
        <Text color="lightest">{t`Available to retire`}</Text>
        <Text t="h5">
          {props.listing.leftToSell} {t`Tonnes`}
        </Text>
      </div>
      <div className={styles.totalsText}>
        <Anchor
          className={styles.iconAndText}
          href={`https://polygonscan.com/address/${props.listing.tokenAddress}`}
        >
          <Text className={styles.externalLink} t="body2">
            {t`View on PolygonScan`} <LaunchIcon />
          </Text>
        </Anchor>
      </div>
    </Accordion>
  );
};
