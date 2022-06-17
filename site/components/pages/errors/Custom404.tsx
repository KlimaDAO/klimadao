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
          id: "shared.404",
          message: "404 - Page Not Found",
        })}
        mediaTitle={t({
          id: "shared.404",
          message: "404 - Page Not Found",
        })}
        metaDescription={t({
          id: "shared.404",
          message: "404 - Page Not Found",
        })}
      />
      <Navigation activePage="Home" />

      <Section variant="gray">
        <div className={styles.textGroup}>
          <Text t="h2" as="h2" align="center">
            <Trans id="shared.404">404 - Page Not Found</Trans>
          </Text>
          <Text align="center">
            <Trans id="error.404.page.text">
              Sorry, looks like we sent you the wrong way. <br />
              Let us guide you back to the home page:
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
