import { PoolIcon } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Text } from "components/Text";
import {
  createProjectPoolPurchaseLink,
  createProjectPoolRetireLink,
} from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { LO } from "lib/luckyOrange";
import { Project, TokenPrice } from "lib/types/carbonmark.types";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  price: TokenPrice;
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
      <Text t="body1">{props.price.poolName.toUpperCase()}</Text>
      <Text t="body1">
        <Trans>Quantity Available:</Trans> {formatToTonnes(props.price.supply)}
      </Text>
      <div className={styles.buttons}>
        <ButtonPrimary
          label={t`Buy`}
          renderLink={(linkProps) => <Link {...linkProps} />}
          onClick={() => {
            LO.track("Purchase - Pool: Buy Clicked");
          }}
          href={createProjectPoolPurchaseLink(
            props.project,
            props.price.poolName
          )}
        />
        <CarbonmarkButton
          label={t`Retire now`}
          href={createProjectPoolRetireLink(
            props.project,
            props.price.poolName
          )}
          renderLink={(linkProps) => <Link {...linkProps} />}
          onClick={() => {
            LO.track("Retire - Pool: Retire Button Clicked");
          }}
        />
      </div>
    </Card>
  );
};
