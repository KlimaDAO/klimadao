import React from "react";

import { Text } from "@klimadao/lib/components";
import { PodcastDetails } from "lib/queries";

import styles from "./index.module.css";

interface CardProps {
  podcast: PodcastDetails;
}

export function PodcastCard(props: CardProps) {
  const date = new Date(props.podcast.publishedAt).toLocaleDateString("en");
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Text t="body3" className={styles.date}>
          {date}
        </Text>
        <Text t="body1">{props.podcast.title}</Text>
        <Text t="body2" className={styles.summary}>
          {props.podcast.summary}
        </Text>
      </div>
      <div className={styles.image}>
        {props.podcast && props.podcast.embed && (
          <div
            className={styles.podcast}
            dangerouslySetInnerHTML={{ __html: props.podcast.embed }}
            key={props.podcast.embed}
          />
        )}
      </div>
    </div>
  );
}
