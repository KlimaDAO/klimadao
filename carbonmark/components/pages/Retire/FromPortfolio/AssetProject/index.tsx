import { Trans } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { formatToTonnes } from "lib/formatNumbers";
import { AssetForListing } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  asset: AssetForListing;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();

  // typeguard
  if (!props.asset.project) {
    return null;
  }

  return (
    <Link
      href={`/portfolio/${props.asset.tokenAddress}/retire`}
      passHref
      className={styles.card}
    >
      <div className={styles.tags}>
        <Category category={props.asset.project.category} />
        <Vintage vintage={props.asset.project.vintage} />
        <ProjectKey projectKey={props.asset.project.key} />
      </div>

      <Text t="h4">{props.asset.project?.name || props.asset.tokenName}</Text>

      <div className={styles.belowHeadline}>
        <div className={styles.image}>
          <ProjectImage category={props.asset.project?.category} />
        </div>

        <Text t="body1">
          <Trans>Available Tonnes:</Trans>{" "}
          <b>{formatToTonnes(props.asset.balance, locale)}</b>
        </Text>
      </div>
    </Link>
  );
};
