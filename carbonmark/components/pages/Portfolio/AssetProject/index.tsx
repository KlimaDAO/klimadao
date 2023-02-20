import { Anchor, ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createRetireLink } from "lib/createUrls";
import { formatToTonnes } from "lib/formatNumbers";
import { AssetExtended } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  assetsData: AssetExtended;
  onSell: () => void;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();
  const retireLink = createRetireLink({
    quantity: props.assetsData.balance,
    tokenAddress: props.assetsData.tokenAddress,
  });

  return (
    <Card>
      <div className={styles.tags}>
        <Category category={props.assetsData.category} />
        <Vintage vintage={props.assetsData.vintage} />
      </div>
      <Text t="h4">{props.assetsData.projectName}</Text>

      <div className={styles.image}>
        <ProjectImage category={props.assetsData.category} />
      </div>

      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.assetsData.balance, locale)}
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
