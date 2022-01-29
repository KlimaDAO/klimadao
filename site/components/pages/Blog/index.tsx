import React, { FC, PropsWithChildren, ReactNode } from "react";

import { AllPosts } from "lib/queries";

import { Card } from "components/Card";

import { t } from "@lingui/macro";

import styles from "./index.module.css";
import { Container } from "../Resources/Container";

type BlogProps = PropsWithChildren<ReactNode> & {
  posts: AllPosts;
};

const TopElement: FC<PropsWithChildren<ReactNode>> = () => (
  <div className={styles.container}>
    <section className={styles.headerSection}>
      <h1>Blog</h1>
      <p>
        Updates and thought leadership from the founders, DAO contributors,
        advisors and community.
      </p>
    </section>
  </div>
);

export function Blog(props: BlogProps) {
  return (
    <Container
      activePage={"blog"}
      title={t`KlimaDAO Blog`}
      mediaTitle={t`KlimaDAO Blog`}
      metaDescription={t`Updates and thought leadership from the founders, DAO contributors,
        advisors and community.`}
      mediaImageSrc="/og-media.jpg"
      topMobileElement={TopElement}
    >
      <div className={styles.container}>
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
