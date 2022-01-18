import React from "react";

import {
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
  PageWrap,
} from "@klimadao/lib/components";
import { AllPosts } from "lib/queries";
import { PageHead } from "components/PageHead";

import { Card } from "components/Card";

import styles from "./index.module.css";
import { urls } from "@klimadao/lib/constants";
import { IS_PRODUCTION } from "lib/constants";
import { Container } from "../Resources/Container";

interface BlogProps {
  posts: AllPosts;
}

export function Blog(props: BlogProps) {
  return (
    <Container activePage={"blog"}>
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
