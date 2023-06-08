import { cx } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Text } from "components/Text";
import { formatToTonnes } from "lib/formatNumbers";
import { getPoolTokenType } from "lib/getPoolData";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { createProjectTokenName } from "lib/projectGetter";
import { Price, Project } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "../styles";

type TotalValuesProps = {
  price: Price;
  project: Project;
};

export const AssetDetails: FC<TotalValuesProps> = (props) => {
  const { locale } = useRouter();
  const tokenType = getPoolTokenType(props.price.name);
  const tokenData = carbonTokenInfoMap[tokenType];
  const projectTokenName = createProjectTokenName(props.project, tokenType);
  const availableTonnes = formatToTonnes(props.price.leftToSell, locale, 2);

  return (
    <>
      <Text t="h4">{t`Asset Details`}</Text>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Token you will receive`}</Text>
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
        <Text color="lightest">{t`Available to purchase`}</Text>
        <Text t="h5">
          {availableTonnes} {t`Tonnes`}
        </Text>
      </div>
      <div className={styles.totalsText}>
        <Anchor
          className={styles.iconAndText}
          href={`https://polygonscan.com/address/${props.project.projectAddress}`}
        >
          <Text className={styles.externalLink} t="body2">
            {t`View on PolygonScan`} <LaunchIcon />
          </Text>
        </Anchor>
      </div>
    </>
  );
};
