import { GridContainer, Section, Text } from "@klimadao/lib/components";

import { PageHead } from "components/PageHead";

import { t, Trans } from "@lingui/macro";
import { Footer } from "components/Footer";
import { Navigation } from "components/shared/Navigation";
import * as styles from "./styles";

export const Custom404 = () => {
  return (
    <GridContainer>
      <PageHead
        title={t`404 - Page Not Found`}
        mediaTitle={t`404 - Page Not Found`}
        metaDescription={t`404 - Page Not Found`}
      />
      <div className={styles.errorPageWrapper}>
        <Navigation activePage="Home" />
        <Section variant="gray">
          <div className={styles.textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans>404 - Page Not Found</Trans>
            </Text>
            <Text align="center">
              <Trans>Sorry, looks like we sent you the wrong way.</Trans>
            </Text>
          </div>
        </Section>
        <Footer />
      </div>
    </GridContainer>
  );
};
