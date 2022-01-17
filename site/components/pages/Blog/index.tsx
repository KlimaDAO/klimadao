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

interface BlogProps {
  posts: AllPosts;
}

export function Blog(props: BlogProps) {
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO | Blog"
        mediaTitle="KlimaDAO | Blog"
        metaDescription="Updates and thought leadership from the founders, DAO contributors, advisors and community."
        mediaImageSrc="/og-media.jpg"
      />
      <PageWrap>
        <HeaderDesktop
          buttons={[
            <ButtonPrimary key="Enter App" label="Enter App" href={urls.app} />,
          ]}
        >
          <NavItemDesktop url={urls.home} name="Home" active={true} />
          <NavItemDesktop
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemDesktop url={urls.stake} name="Stake" />
          <NavItemDesktop url={urls.wrap} name="Wrap" />
          <NavItemDesktop url={urls.bond} name="Bond" />
        </HeaderDesktop>
        <HeaderMobile>
          <NavItemMobile url={urls.home} name="Home" />
          <NavItemMobile
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemMobile url={urls.stake} name="Stake" />
          <NavItemMobile url={urls.stake} name="Wrap" />
          <NavItemMobile url={urls.bond} name="Bond" />
        </HeaderMobile>
        <div className={styles.container}>
          <section className={styles.headerSection}>
            <h1>Blog</h1>
            <p>
              Updates and thought leadership from the founders, DAO
              contributors, advisors and community.
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
        <Footer />
      </PageWrap>
    </>
  );
}
