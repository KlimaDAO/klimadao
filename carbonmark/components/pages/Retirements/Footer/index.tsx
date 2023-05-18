import { Anchor as A } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { urls } from "lib/constants";
import { FC } from "react";
import * as styles from "./styles";

export const RetirementFooter: FC = () => (
  <div className={styles.retirementFooter}>
    <Text t="button" uppercase>
      <Trans id="retirement.footer.about_carbonmark.title">
        About Carbonmark
      </Trans>
    </Text>
    <div className={styles.footerContent}>
      <Text color="lightest">
        <Trans id="retirement.footer.about_carbonmark.content">
          With over 20 million verified digital carbon credits from hundreds of
          projects, Carbonmark offers the largest selection of digital carbon
          credits worldwide. Buy, sell, and retire digital carbon from any
          project instantly with zero-commission trading.{" "}
          <A href={urls.baseUrl}>Get started today</A>.
        </Trans>
      </Text>
    </div>
  </div>
);
