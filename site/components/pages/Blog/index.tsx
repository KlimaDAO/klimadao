import React, { FC } from "react";
import { Trans, t } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { AllPosts } from "lib/queries";
import { Card } from "components/Card";
import { Container } from "../Resources/Container";
import * as styles from "./styles";

type Props = {
  posts: AllPosts;
};

export const Blog: FC<Props> = (props) => (
  <Container
    activePage={"blog"}
    title={t({ id: "blog.head.title", message: "KlimaDAO Blog" })}
    headline={t({ id: "blog.head.headline", message: "Blog" })}
    subline={t({
      id: "blog.head.description",
      message:
        "Updates and thought leadership from the founders, DAO contributors, advisors and community.",
    })}
    mediaTitle={t({ id: "blog.head.title" })}
    metaDescription={t({
      id: "blog.head.description",
      message:
        "Updates and thought leadership from the founders, DAO contributors, advisors and community.",
    })}
    mediaImageSrc={urls.mediaImage}
  >
    <div className={styles.container}>
      <section className="cardsSection">
        <Text t="h4" className="articles">
          <Trans>Articles</Trans>
        </Text>
        <div className="cards">
          {props.posts.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  </Container>
);
