import { Text, Section } from "@klimadao/lib/components";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import * as styles from "./styles";

export const Custom500 = () => {
  return (
    <div className={styles.errorPageWrapper}>
      <PageHead
        title={t({
          id: "error.page.500.title",
          message: "500 - Page Not Found",
        })}
        mediaTitle={t({
          id: "error.page.500.head.title",
          message: "500 - Page Not Found",
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />
      <Navigation activePage="Home" />

      <Section variant="gray">
        <div className={styles.textGroup}>
          <Text t="h2" as="h2" align="center">
            <Trans id="error.500.page.title">
              500 - Server-side error occurred
            </Trans>
          </Text>
          <Text align="center">
            <Trans id="error.500.page.text">
              Sorry, something bad happened.
              <br />
              Try to go back to the Start Page:
            </Trans>
          </Text>
          <Text>
            <a href={urls.home}>{urls.home}</a>
          </Text>
        </div>
      </Section>
      <Footer />
    </div>
  );
};
