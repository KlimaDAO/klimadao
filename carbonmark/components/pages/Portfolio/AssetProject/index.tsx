import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Vintage } from "components/Vintage";
import { AssetWithProject } from "lib/actions";
import { createProjectLink } from "lib/createUrls";
import { formatToTonnes } from "lib/formatNumbers";
import { getFeatureFlag } from "lib/getFeatureFlag";
import { hasListableBalance } from "lib/isListableToken";
import { LO } from "lib/luckyOrange";
import { CategoryName } from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  asset: AssetWithProject;
  onSell: () => void;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();
  const category = props.asset.project?.methodologies?.[0]?.category || "Other";
  const isListable = hasListableBalance(props.asset);

  return (
    <Card>
      {props.asset.project && (
        <div className={styles.tags}>
          <Category category={category as CategoryName} />
          <Vintage vintage={props.asset.project.vintage} />
          <ProjectKey projectKey={props.asset.project.key} />
        </div>
      )}

      {props.asset.project ? (
        <Link href={createProjectLink(props.asset.project)}>
          <Text t="h4" className={styles.link}>
            {props.asset.project?.name || props.asset.token.symbol}
          </Text>
        </Link>
      ) : (
        <Text t="h4" className={styles.link}>
          {props.asset.token?.symbol}
        </Text>
      )}

      {props.asset.project && (
        <div className={styles.image}>
          <Link href={createProjectLink(props.asset.project)}>
            <ProjectImage category={category as CategoryName} />
          </Link>
        </div>
      )}
      <div className={styles.tonnes}>
        <Text t="body1">
          <Trans>Unlisted Tonnes:</Trans>{" "}
          <strong>{formatToTonnes(props.asset.amount, locale)}</strong>
        </Text>

        <Text t="body1">
          <Trans>Listed Tonnes:</Trans>{" "}
          <strong>{formatToTonnes(props.asset.amount, locale)}</strong>
        </Text>
      </div>
      <div className={styles.buttons}>
        <ButtonPrimary
          label={<Trans>Retire</Trans>}
          href={`/portfolio/${props.asset.token.id}/retire`}
          renderLink={(linkProps) => <Link {...linkProps} />}
          onClick={() => {
            LO.track("Retire: Retire Button Clicked");
          }}
        />
        {getFeatureFlag("createListing") ? (
          <CarbonmarkButton
            label={<Trans>Sell</Trans>}
            onClick={props.onSell}
            disabled={!isListable}
          />
        ) : (
          <TextInfoTooltip tooltip="New listings are temporarily disabled while we upgrade our marketplace to a new version.">
            <div>
              <CarbonmarkButton
                label={<Trans>Sell</Trans>}
                onClick={props.onSell}
                disabled={true}
              />
            </div>
          </TextInfoTooltip>
        )}
      </div>
    </Card>
  );
};
