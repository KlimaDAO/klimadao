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
  width?: number;
  height?: number;
};

type Props = {
  card: Card;
};

export const Card: FC<Props> = (props) => {
  const { locale } = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleContainer}>
        <div className={styles.cardImageContainer}>
          {props.card.width && props.card.height ? <Image src={props.card.logo} alt="logo" width={props.card.width} height={props.card.height} className={styles.cardImage}/> :
          <Image layout="intrinsic" src={props.card.logo} alt="logo" className={styles.cardImage}/>}
        </div>
        <Anchor href={props.card.link}>
          <LaunchIcon />
        </Anchor>
      </div>
      <div className={styles.cardContent}>
        <Text t="body4" className={styles.cardMessage}>
          “{props.card.description}”
        </Text>
        <div className={styles.cardFooter}>
          <div>
            <Text t="h3">{trimWithLocale(props.card.tonsRetired, 2, locale)}</Text>
            <Text>
              <Trans id="infinity.tonnes">Tonnes</Trans>
            </Text>
          </div>
          <Text t="badge" className={styles.cardDate}>
            {props.card.date}
          </Text>
        </div>
      </div>
    </div>
  );
};
