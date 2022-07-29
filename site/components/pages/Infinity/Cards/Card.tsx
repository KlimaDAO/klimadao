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
          <Trans id="infinity.quote">“{card.description}”</Trans>
        </Text>
        <div className={styles.cardFooter}>
          <div>
            <Text t="h3">
              <Trans id="infinity.retired_tons_number">
                {trimWithLocale(card.tonsRetired, 2, locale)}
              </Trans>
            </Text>
            <Text>
              <Trans id="infinity.tonnes">Tonnes</Trans>
            </Text>
          </div>
          <Text t="badge" className={styles.cardDate}>
            <Trans id="infinity.retired_date">{card.date}</Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};
