import React, { FC } from "react";
import Image from "next/image";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";

import { Text, Anchor } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

import LaunchIcon from "@mui/icons-material/Launch";

import * as styles from "./styles";

type Card = {
  logo: StaticImageData;
  link: string;
  description: string;
  tonsRetired: number;
  date: string;
};

type Props = {
  card: Card;
};

export const Card: FC<Props> = ({ card }) => {
  const { locale } = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleContainer}>
        <div className={styles.cardImageContainer}>
          <Image layout="intrinsic" src={card.logo} alt="logo" />
        </div>
        <Anchor href={card.link}>
          <LaunchIcon />
        </Anchor>
      </div>
      <div className={styles.cardContent}>
        <Text t="body4" className={styles.cardMessage}>
          “{card.description}”
        </Text>
        <div className={styles.cardFooter}>
          <div>
            <Text t="h3">{trimWithLocale(card.tonsRetired, 2, locale)}</Text>
            <Text>
              <Trans id="infinity.tonnes">Tonnes</Trans>
            </Text>
          </div>
          <Text t="badge" className={styles.cardDate}>
            {card.date}
          </Text>
        </div>
      </div>
    </div>
  );
};
