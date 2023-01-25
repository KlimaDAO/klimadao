import Image from "next/legacy/image";

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
    <div className={styles.card}>
      <div className={styles.content}>
        <Text t="body3" className="date">
          {date}
        </Text>
        <Text t="body1">{props.podcast.title}</Text>
        <Text t="body2" className="summary">
          {props.podcast.summary}
        </Text>
        {props.podcast.rssId && (
          <A href={`${urls.podcast}/${props.podcast.rssId}/?listen-on=true`}>
            <PlayIcon />
          </A>
        )}
      </div>
      <div className={styles.image}>
        <Image
          src={podcastImage}
          alt={props.podcast.title}
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  );
}
