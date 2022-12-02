import { Section, Text } from "@klimadao/lib/components";

import { Trans } from "@lingui/macro";
import { captureException } from "@sentry/nextjs";
import * as styles from "./styles";

export const Custom404 = () => {
  captureException(Error(`404 Route not found '${window.location}'`));
  return (
    <div className={styles.error404Card}>
      <Section variant="gray">
        <div>
          <Text t="h2" as="h2" align="center">
            <Trans id="shared.404">404 - Page Not Found</Trans>
          </Text>
          <Text align="center">
            <Trans id="error.404.page.text">
              Sorry, looks like we sent you the wrong way. <br />
              Please select a destination from the menu.
            </Trans>
          </Text>
        </div>
      </Section>
    </div>
  );
};
