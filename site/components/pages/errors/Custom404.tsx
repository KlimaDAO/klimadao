import { Section, Text } from "@klimadao/lib/components";

import { captureException } from "@sentry/nextjs";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";

import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import Link from "next/link";
import * as styles from "./styles";

export const Custom404 = () => {
  if (typeof window !== "undefined") {
    captureException(Error(`404 Route not found '${window.location}'`));
  }
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
            <Link href={urls.home}>{urls.home}</Link>
          </Text>
        </div>
      </Section>
      <Footer />
    </div>
  );
};
