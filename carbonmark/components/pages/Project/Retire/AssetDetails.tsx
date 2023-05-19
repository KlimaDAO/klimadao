import { cx } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import { CarbonToken } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { FC } from "react";
import * as styles from "./styles";

type TotalValuesProps = {
  price: Price;
};

export const AssetDetails: FC<TotalValuesProps> = (props) => {
  const tokenName = props.price.name.toLowerCase() as CarbonToken;
  const tokenData = carbonTokenInfoMap[tokenName];

  return (
    <>
      <Text t="h4">{t`Asset Details`}</Text>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Retiring Token`}</Text>
        <div className={cx(styles.iconAndText)}>
          <Image
            className="icon"
            src={tokenData.icon}
            width={20}
            height={20}
            alt={tokenData.label}
          />
          <Text t="h5">{tokenData.label}</Text>
        </div>
        <Anchor href="">{t`View on PolygonScan`}</Anchor>
      </div>
    </>
  );
};
