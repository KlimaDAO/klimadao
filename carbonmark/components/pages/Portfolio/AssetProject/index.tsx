import { Anchor } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createRetireLink } from "lib/createUrls";
import { formatToTonnes } from "lib/formatNumbers";
import { AssetForListing } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";
interface Props {
  asset: AssetForListing;
  onSell: () => void;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();
  const retireLink = createRetireLink({
    retirementToken: props.asset.tokenAddress,
  });

  return (
    <Card>
      {props.asset.project && (
        <div className={styles.tags}>
          <Category category={props.asset.project.category} />
          <Vintage vintage={props.asset.project.vintage} />
          <ProjectKey projectKey={props.asset.project.key} />
        </div>
      )}

      <Link
        href={`/projects/${props.asset.project?.key}-${props.asset.project?.vintage}`}
      >
        <Text t="h4" className={styles.link}>
          {props.asset.project?.name || props.asset.tokenName}
        </Text>
      </Link>

      {props.asset.project && (
        <div className={styles.image}>
          <Link
            href={`/projects/${props.asset.project.key}-${props.asset.project.vintage}`}
          >
            <ProjectImage category={props.asset.project?.category} />
          </Link>
        </div>
      )}
      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.asset.balance, locale)}
      </Text>
      <div className={styles.buttons}>
        <ButtonPrimary
          label={<Trans>Retire</Trans>}
          href={retireLink}
          renderLink={(linkProps) => <Anchor {...linkProps} />}
        />
        <CarbonmarkButton label={<Trans>Sell</Trans>} onClick={props.onSell} />
      </div>
    </Card>
  );
};
