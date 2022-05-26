import { Text, Section } from "@klimadao/lib/components";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import * as styles from "./styles";

export const Custom404 = () => {
  return (
    <div className={styles.errorPageWrapper}>
      <PageHead
        title={t({
          id: "error.page.404.title",
          message: "404 - Page Not Found",
        })}
        mediaTitle={t({
          id: "error.page.404.head.title",
          message: "404 - Page Not Found",
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
            <Trans id="error.404.page.title">404 - Page Not Found</Trans>
          </Text>
          <Text align="center">
            <Trans id="error.404.page.text">
              Sorry, looks like we sent you the wrong way. <br />
              Let us guide you back to the Start Page:
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
