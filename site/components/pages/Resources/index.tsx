import React from "react";
import { NextPage } from "next";
import { Trans, t } from "@lingui/macro";
import { Text, Section } from "@klimadao/lib/components";
import * as styles from "./styles";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";
import { ArticlesSlider } from "./FeaturedArticles/ArticlesSlider";

import { Document, FeaturedPost } from "lib/queries";

export interface Props {
  documents: Document[];
  featuredArticles: FeaturedPost[];
}

export const Resources: NextPage<Props> = ({ documents, featuredArticles }) => {
  console.log("WORKS", featuredArticles);
  // To show that the slider works this is a tmp fix for Featured Articles
  // as currently there are not enough saved as "featured" in Sanity (currently only one)
  const tmpFixForFeatureArticles = documents.map((doc) => ({
    ...doc,
    isFeaturedArticle: true,
  }));
  return (
    <>
      <PageHead
        title={t({
          id: "resources.head.title",
          message: "KlimaDAO | Resources",
        })}
        mediaTitle={t({
          id: "resources.head.metaTitle",
          message: `KlimaDAO Resources - Go beyond Carbon neutral`,
        })}
        metaDescription={t({
          id: "resources.head.metaDescription",
          message:
            "Updates and thought leadership from the founders, DAO contributors, advisors and community.",
        })}
      />

      <Navigation activePage="Resources" />

      <Section variant="gray" className={styles.sectionHead}>
        <div className={styles.header}>
          <Text t="h1" align="center">
            <Trans id="resources.page.header.title">Featured Articles</Trans>
          </Text>
          <Text t="body3" align="center">
            <Trans id="resources.page.header.subline">
              Updates and thought leadership from the founders, DAO
              contributors, advisors and community.
            </Trans>
          </Text>
        </div>
      </Section>

      <Section variant="gray" style={{ padding: "unset" }}>
        <ArticlesSlider articles={tmpFixForFeatureArticles as FeaturedPost[]} />
      </Section>

      <Section variant="gray">
        <div className={styles.list}>
          {documents.map((doc) => {
            if (doc.type === "post") {
              return <Card key={doc.slug} post={doc} />;
            }
            return <PodcastCard podcast={doc} key={doc.slug} />;
          })}
        </div>
      </Section>

      <Footer />
    </>
  );
};
