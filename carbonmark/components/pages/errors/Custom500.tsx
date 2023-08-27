import { GridContainer, Section } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { Text } from "components/Text";
import * as styles from "./styles";

export const Custom500 = () => {
  return (
    <GridContainer>
      <PageHead
        title={t`500 - Server Error`}
        mediaTitle={t`500 - Server Error`}
        metaDescription={t`500 - Server Error`}
      />
      <div className={styles.errorPageWrapper}>
        <Navigation activePage="Home" />
        <Section variant="gray">
          <div className={styles.textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans>500 - Server error occurred</Trans>
            </Text>
            <Text align="center">
              <Trans>Sorry, something went wrong.</Trans>
            </Text>
          </div>
        </Section>
        <Footer />
      </div>
    </GridContainer>
  );
};
