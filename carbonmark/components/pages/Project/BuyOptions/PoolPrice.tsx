import { PoolIcon } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { ExitModal } from "components/ExitModal";
import { Text } from "components/Text";
import { createRedeemLink, createRetireLink } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { LO } from "lib/luckyOrange";
import { PriceFlagged, Project } from "lib/types/carbonmark";
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
      <Text t="body1">{props.price.name}</Text>
      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.price.leftToSell)}
      </Text>
      <div className={styles.buttons}>
        <ButtonPrimary
          label={t`Buy`}
          onClick={() => {
            LO.track("Purchase - Pool: Buy Clicked");
            setIsOpen(true);
            setRetireLink(
              createRedeemLink({
                projectTokenAddress: props.project.projectAddress,
                poolName: props.price.name.toLowerCase(),
              })
            );
          }}
        />
        <CarbonmarkButton
          label={t`Retire now`}
          onClick={() => {
            LO.track("Retire - Pool: Retire Button Clicked");
            setIsOpen(true);
            setRetireLink(
              createRetireLink({
                retirementToken: props.price.name.toLowerCase(),
                projectTokens: props.project.projectAddress,
              })
            );
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
