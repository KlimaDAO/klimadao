import React from "react";

import { AllPosts } from "lib/queries";

import { Card } from "components/Card";

import { t } from "@lingui/macro";

import styles from "./index.module.css";
import { Container } from "../Resources/Container";

interface BlogProps {
  posts: AllPosts;
}

export function Blog(props: BlogProps) {
  return (
    <Container
      activePage={"blog"}
      title={t`KlimaDAO Blog`}
      mediaTitle={t`KlimaDAO Blog`}
      metaDescription={t`Updates and thought leadership from the founders, DAO contributors,
        advisors and community.`}
      mediaImageSrc="/og-media.jpg"
    >
      <div className={styles.container}>
        <section className={styles.headerSection}>
          <h1>Blog</h1>
          <p>
            Updates and thought leadership from the founders, DAO contributors,
            advisors and community.
          </p>
        </section>
        <section className={styles.cardsSection}>
          <h3>Articles</h3>
          <div className={styles.cards}>
            {props.posts.map((post) => (
              <Card key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
