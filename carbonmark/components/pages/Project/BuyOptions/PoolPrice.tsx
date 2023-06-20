import { PoolIcon } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { ExitModal } from "components/ExitModal";
import { Text } from "components/Text";
import { createProjectPoolRetireLink, createRedeemLink } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { LO } from "lib/luckyOrange";
import { PriceFlagged, Project } from "lib/types/carbonmark";
import Link from "next/link";
import { FC, useState } from "react";
import * as styles from "./styles";

type Props = {
  price: PriceFlagged;
  project: Project;
  isBestPrice: boolean;
};

export const PoolPrice: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [retireLink, setRetireLink] = useState("");
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
            setIsOpen(true);
            setRetireLink(
              createRedeemLink({
                projectTokenAddress: props.price.projectTokenAddress,
                poolName: props.price.poolName,
              })
            );
          }}
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
      <ExitModal
        showModal={isOpen}
        title={t`Leaving Carbonmark`}
        retireLink={retireLink}
        onToggleModal={() => setIsOpen(false)}
      />
    </Card>
  );
};
