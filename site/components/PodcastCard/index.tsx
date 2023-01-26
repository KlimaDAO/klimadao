import Image from "next/image";

import { Anchor as A, PlayIcon, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { PodcastDetails } from "lib/queries";
import podcastImage from "public/podcast.png";

import * as styles from "./styles";

interface CardProps {
  podcast: PodcastDetails;
}

export function PodcastCard(props: CardProps) {
  const date = new Date(props.podcast.publishedAt).toLocaleDateString("en");
  return (
    <A
      className={styles.card}
      href={`${urls.podcast}/${props.podcast.rssId}/?listen-on=true}`}
    >
      <div className={styles.content}>
        <Text t="body3" className="date">
          {date}
        </Text>
        <Text t="body1">{props.podcast.title}</Text>
        <Text t="body2" className="summary">
          {props.podcast.summary}
        </Text>
        <PlayIcon />
      </div>
      <div className={styles.image}>
        <Image
          fill
          src={podcastImage}
          alt={props.podcast.title}
          style={{ objectFit: "cover" }}
        />
      </div>
    </A>
  );
}
