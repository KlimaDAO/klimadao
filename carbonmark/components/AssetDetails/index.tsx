import { Anchor } from "@klimadao/lib/components";
import { PoolToken } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Accordion } from "components/Accordion";
import { Text } from "components/Text";
import { formatToTonnes } from "lib/formatNumbers";
import { getPoolTokenType } from "lib/getPoolData";
import { createProjectTokenName } from "lib/projectGetter";
import { Product, Project } from "lib/types/carbonmark.types";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type TotalValuesProps = {
  product: Product;
  project: Project;
  actionLabel: string;
  availableLabel: string;
  polyscanUrl: string;
};

export const AssetDetails: FC<TotalValuesProps> = (props) => {
  const { locale } = useRouter();

  let tokenName: string;
  if (props.product.type === "pool") {
    const tokenType = getPoolTokenType(
      props.product.poolName.toUpperCase() as Uppercase<PoolToken>
    );
    tokenName = createProjectTokenName(props.project, tokenType);
  } else {
    tokenName = props.product.symbol;
  }
  const availableTonnes =
    props.product.type === "pool"
      ? formatToTonnes(props.product.supply, locale, 2)
      : props.product.leftToSell;

  return (
    <Accordion label={t`Asset details`} className={styles.accordion}>
      <div className={styles.totalsText}>
        <Text color="lightest">{props.actionLabel}</Text>
        <div className={styles.iconAndText}>
          <Text t="h5">{tokenName}</Text>
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
