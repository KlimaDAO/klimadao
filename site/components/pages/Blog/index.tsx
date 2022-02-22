import React, { FC } from "react";
import { Trans, t } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";

import { AllPosts } from "lib/queries";
import { Card } from "components/Card";
import styles from "./index.module.css";
import { Container } from "../Resources/Container";

type Props = {
  posts: AllPosts;
};

export const Blog: FC<Props> = (props) => (
  <Container
    activePage={"blog"}
    title={t`KlimaDAO Blog`}
    headline={t`Blog`}
    subline={t`Updates and thought leadership from the founders, DAO contributors,
      advisors and community.`}
    mediaTitle={t`KlimaDAO Blog`}
    metaDescription={t`Updates and thought leadership from the founders, DAO contributors,
        advisors and community.`}
    mediaImageSrc="/og-media.png"
  >
    <div className={styles.container}>
      <section className={styles.cardsSection}>
        <Text t="h4" className={styles.articles}>
          <Trans>Articles</Trans>
        </Text>
        <div className={styles.cards}>
          {props.posts.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  </Container>
);
