import { Section, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { NextPage } from "next";
import * as styles from "./styles";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { ArticlesSlider } from "./FeaturedArticles/ArticlesSlider";
import { ResourcesList } from "./ResourcesList";

import { Document, FeaturedPost } from "lib/queries";

export interface Props {
  documents: Document[];
  featuredArticles: FeaturedPost[];
}

export const Resources: NextPage<Props> = (props) => {
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

      <Navigation activePage="Resource Center" />

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

      {!!props.featuredArticles?.length && (
        <Section variant="gray" style={{ padding: "unset" }}>
          <ArticlesSlider articles={props.featuredArticles} />
        </Section>
      )}

      <ResourcesList documents={props.documents} />

      <Footer />
    </>
  );
};
