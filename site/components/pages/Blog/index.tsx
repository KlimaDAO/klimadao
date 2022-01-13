import React from "react";

import Card from "components/Card";
import { Blog } from "./types";

import styles from "./index.module.css";

interface BlogProps {
  blogs: Blog[];
}

function Blog(props: BlogProps) {
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
          {props.blogs.map((blog) => (
            <Card key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
