import React from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";
import { Text, Section } from "@klimadao/lib/components";
import * as styles from "./styles";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";

import { Document } from "lib/queries";

export interface Props {
  documents: Document[];
}

export const Resources: NextPage<Props> = ({ documents }) => {
  return (
    <>
      <PageHead
        title={t({
          id: "resources.head.title",
          message: "KlimaDAO | Klima Resources",
        })}
        mediaTitle={t({
          id: "resources.head.metaTitle",
          message: `Klima Resources - Go beyond Carbon neutral`,
        })}
        metaDescription={t({
          id: "resources.head.metaDescription",
          message:
            "Updates and thought leadership from the founders, DAO contributors, advisors and community.",
        })}
      />

      <Navigation activePage="Resources" />

      <Section variant="black">
        <div className={styles.header}>
          <Text t="h3" align="center">
            Resources Page - Hidden on Production
          </Text>
        </div>
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
