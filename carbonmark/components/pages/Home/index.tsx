import { GridContainer, Section } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { Text } from "components/Text";
import { NextPage } from "next";
import * as styles from "./styles";

export const Home: NextPage = () => {
  return (
    <GridContainer>
      <PageHead
        title={t`Carbonmark.com`}
        mediaTitle={t`Carbonmark | Universal Carbon Market`}
        metaDescription={t`The open platform for digital carbon.`}
      />
      <Navigation activePage="Home" />
      <Section variant="gray" className={styles.hero}>
        <div className="stack">
          <Text t="h1">CarbonMark Cuban</Text>
          <Text>Our Hero</Text>
        </div>
      </Section>
      <Section variant="white" className={styles.section1}>
        <div className="stack">
          <Text t="h2">This is how I like to do layouts.</Text>
          <Text>GridContainer -&gt; Section -&gt; Stack</Text>
        </div>
      </Section>
      <Section variant="gray" className={styles.section1}>
        <div className="stack">
          <Text t="h3">Very easy - Not too many divs or classnames</Text>
          <Text t="h1" as="p">
            👍
          </Text>
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
