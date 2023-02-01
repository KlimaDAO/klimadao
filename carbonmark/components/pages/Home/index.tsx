import { GridContainer, Section, Text } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Footer } from "components/shared/Footer";
import { Navigation } from "components/shared/Navigation";
import { PageHead } from "components/shared/PageHead";
import { NextPage } from "next";
import * as styles from "./styles";

export interface Props {
  deleteme?: () => void;
}

export const Home: NextPage<Props> = () => {
  return (
    <GridContainer>
      <PageHead
        title={t`CarbonMark.com`}
        mediaTitle={t`CarbonMark | Universal Carbon Market`}
        metaDescription={t`Open-source and open-access carbon toolkit. Powered by KlimaDAO`}
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
