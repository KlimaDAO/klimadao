import { GridContainer } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { Document, FeaturedPost } from "lib/cms/queries";
import { NextPage } from "next";
import { ResourcesList } from "./ResourcesList";
import * as styles from "./styles";

export interface Props {
  documents: Document[];
  featuredArticles: FeaturedPost[];
}

export const Resources: NextPage<Props> = (props) => {
  return (
    <GridContainer className={styles.pageWrapper}>
      <PageHead
        title={t`Resources | Carbonmark`}
        mediaTitle={t`Resources | Carbonmark`}
        metaDescription={t`Find the latest updates, guides, and resources to help you leverage the Carbonmark platform.`}
      />
      <Navigation activePage="Resources" showThemeToggle={false} />
      {/* hide featured articles for now */}
      {/* {!!props.featuredArticles?.length && (
        <Section variant="gray" className={styles.sectionHead}>
          <div className={styles.header}>
            <Text t="h1" align="center">
              <Trans id="resources.page.header.title">Featured Articles</Trans>
            </Text>
            <Text t="body1" align="center">
              <Trans id="resources.page.header.subline">
                Updates and thought leadership from the CarbonMark team.
              </Trans>
            </Text>
          </div>
        </Section>
      )}
      {!!props.featuredArticles?.length && (
        <Section variant="gray" style={{ padding: "unset" }}>
          <ArticlesSlider articles={props.featuredArticles} />
        </Section>
      )} */}

      <ResourcesList documents={props.documents} />

      <Footer />
    </GridContainer>
  );
};
