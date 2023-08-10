import { GridContainer, Section } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
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
      </div>
    </GridContainer>
  );
};
