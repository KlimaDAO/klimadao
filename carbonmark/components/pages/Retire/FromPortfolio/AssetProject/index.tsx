import { Trans } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { AssetWithProject } from "lib/actions";
import { formatToTonnes } from "lib/formatNumbers";
import { CategoryName } from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  asset: AssetWithProject;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();

  if (!props.asset.project) {
    return null;
  }

  const category = props.asset.project?.methodologies?.[0]?.category || "Other";

  return (
    <Link
      href={`/portfolio/${props.asset.token.id}/retire`}
      passHref
      className={styles.card}
    >
      <div className={styles.tags}>
        <Category category={category as CategoryName} />
        <Vintage vintage={props.asset.project.vintage} />
        <ProjectKey projectKey={props.asset.project.key} />
      </div>

      <Text t="h4">
        {props.asset.project?.name || props.asset.token.symbol}
      </Text>

      <div className={styles.belowHeadline}>
        <div className={styles.image}>
          <ProjectImage category={category as CategoryName} />
        </div>

        <Text t="body1">
          <Trans>Available Tonnes:</Trans>{" "}
          <b>{formatToTonnes(props.asset.amount, locale)}</b>
        </Text>
      </div>
    </Link>
  );
};
