import React from "react";

import { Card } from "components/Card";

import styles from "./index.module.css";
import { AllPosts } from "lib/queries";

interface BlogProps {
  posts: AllPosts;
}

export function Blog(props: BlogProps) {
  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <h1>Blog</h1>
        <p>
          KlimaDAO enables mass participation in the carbon markets and governs
          the development of KLIMA, an algorithmic, carbon-backed currency.
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
  );
}
