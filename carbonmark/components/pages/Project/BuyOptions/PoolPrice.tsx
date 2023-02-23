import { Anchor, ButtonPrimary, PoolIcon } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { createRetireLink } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { PriceFlagged, Project } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  price: PriceFlagged;
  project: Project;
  isBestPrice: boolean;
};

export const PoolPrice: FC<Props> = (props) => {
  return (
    <Card>
      <div className={styles.sellerInfo}>
        <PoolIcon />
        <div className={styles.sellerBadge}>
          <Trans>Carbon Pool</Trans>
        </div>
        {props.isBestPrice && (
          <div className={styles.bestPriceBadge}>
            <Trans>Best Price</Trans>
          </div>
        )}
      </div>
      <Text t="h4">{formatToPrice(props.price.singleUnitPrice)}</Text>
      <Text t="body1">{props.price.name}</Text>
      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.price.leftToSell)}
      </Text>

      <div className={styles.buttons}>
        <ButtonPrimary
          className={styles.buyButton}
          label={t`Buy` + ` ${props.price.name}`}
          href={"https://klimadao.finance"} // go where?
        />

        <CarbonmarkButton
          label={t`Retire now`}
          href={createRetireLink({
            quantity: props.price.leftToSell,
            tokenAddress: props.price.tokenAddress,
          })}
          renderLink={(linkProps) => <Anchor {...linkProps} />}
        />
      </div>
    </Card>
  );
};
