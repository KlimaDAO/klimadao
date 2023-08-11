import { Trans, t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import * as styles from "./styles";

export const Custom500 = () => {
  return (
    <>
      <PageHead
        title={t`500 - Server Error`}
        mediaTitle={t`500 - Server Error`}
        metaDescription={t`500 - Server Error`}
      />
      <Layout >
        <div className={styles.errorPageWrapper}>
          <div className={styles.textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans>500 - Server error occurred</Trans>
            </Text>
            <Text align="center">
              <Trans>Sorry, something went wrong.</Trans>
            </Text>
          </div>
        </div>
      </Layout >
    </>
  );
};
