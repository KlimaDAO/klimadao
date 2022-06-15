import React, { FC } from "react";
import { Trans, t } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { AllPodcasts } from "lib/queries";
import { PodcastCard } from "components/PodcastCard";
import styles from "./index.module.css";
import { Container } from "../Resources/Container";

type Props = {
  podcasts: AllPodcasts;
};

export const Podcast: FC<Props> = (props) => {
  return (
    <Container
      activePage={"podcast"}
      title={t({ id: "podcast.head.title", message: "KlimaDAO Podcast" })}
      headline={t({ id: "podcast.head.headline", message: "Podcast" })}
      subline={
        <Trans id="podcast.head.description">
          Planet of the Klimates is a community-driven podcast featuring all the
          latest on KlimaDAO, as well in-depth conversations with Klima partners
          and global thought leaders on carbon markets, web3, climate science,
          and more. Hosted by Klimates Phaedrus, Diamond Hands Klima, and REG,
          you can explore the latest episodes and full archive of shows directly
          below, and also find PotK on your favourite podcast platform,
          including <a href="https://rss.com/podcasts/potk/">RSS</a> and{" "}
          <a href="https://podcasts.apple.com/us/podcast/planet-of-the-klimates/id1597590318">
            Apple Podcasts
          </a>
        </Trans>
      }
      mediaTitle={t({ id: "podcast.head.title" })}
      metaDescription={t({
        id: "shared.head.description",
        message:
          "Drive climate action and earn rewards with a carbon-backed digital currency.",
      })}
      mediaImageSrc={urls.mediaImage}
    >
      <div className={styles.container}>
        <section className={styles.cardsSection}>
          <Text t="h4" className={styles.articles}>
            <Trans>Episodes</Trans>
          </Text>
          <div className={styles.cards}>
            {props.podcasts.map((podcast) => (
              <PodcastCard podcast={podcast} key={podcast.embed} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
};
