import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

export const RetirementFooter: FC = () => (
  <div className={styles.retirementFooter}>
    <Text t="button" color="lightest" uppercase style={{ color: "#8B8FAE" }}>
      <Trans id="retirement.footer.aboutCarbonmark.title">
        About Carbonmark
      </Trans>
    </Text>
    <div className={styles.footerContent}>
      <Text color="lightest">
        <Trans id="retirement.footer.aboutCarbonmark.left">
          With over 20 million verified digital carbon credits from hundreds of
          projects, Carbonmark offers the largest selection of digital carbon
          credits worldwide. Buy, sell, and retire digital carbon from any
          project instantly with zero-commission trading. Get started today.
        </Trans>
      </Text>
    </div>
  </div>
);
