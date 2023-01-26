import { Text } from "@klimadao/lib/components";
import { PodcastDetails } from "lib/queries";

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
      </div>
      <div className={styles.image}>
        {props.podcast && props.podcast.embed && (
          <div
            dangerouslySetInnerHTML={{ __html: props.podcast.embed }}
            key={props.podcast.embed}
          />
        )}
      </div>
    </div>
  );
}
