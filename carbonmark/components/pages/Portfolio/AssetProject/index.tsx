import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToTonnes } from "lib/formatNumbers";
import { LO } from "lib/luckyOrange";
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

  return (
    <Card>
      {props.asset.project && (
        <div className={styles.tags}>
          <Category category={props.asset.project.category} />
          <Vintage vintage={props.asset.project.vintage} />
          <ProjectKey projectKey={props.asset.project.key} />
        </div>
      )}

      {props.asset.project ? (
        <Link href={createProjectLink(props.asset.project)}>
          <Text t="h4" className={styles.link}>
            {props.asset.project?.name || props.asset.tokenName}
          </Text>
        </Link>
      ) : (
        <Text t="h4" className={styles.link}>
          {props.asset.tokenName}
        </Text>
      )}

      {props.asset.project && (
        <div className={styles.image}>
          <Link href={createProjectLink(props.asset.project)}>
            <ProjectImage category={props.asset.project?.category} />
          </Link>
        </div>
      )}
      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.asset.balance, locale)}
      </Text>

      <div className={styles.buttons}>
        <Link href={`/portfolio/${props.asset.tokenAddress}/retire`}>
          <ButtonPrimary
            label={<Trans>Retire</Trans>}
            onClick={() => {
              LO.track("Retire: Retire Button Clicked");
            }}
          />
        </Link>
        <CarbonmarkButton label={<Trans>Sell</Trans>} onClick={props.onSell} />
      </div>
    </Card>
  );
};
