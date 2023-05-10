import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import { FC } from "react";
import * as styles from "./styles";

export const RetirementFooter: FC = () => {
  return (
    <div className={styles.retirementFooter}>
      <Text t="caption" align="center" color="lightest" uppercase>
        <Trans id="retirement.footer.aboutCarbonmark.title">
          About Carbonmark
        </Trans>
      </Text>
      <div className={styles.footerContent}>
        <div className="column">
          <Text>
            <Trans id="retirement.footer.aboutCarbonmark.left">
              Carbonmark is an all-in-one platform for the carbon markets. With
              millions of carbon credits available, the platform allows users to
              quickly list, acquire and offset Digital Carbon Credits with no
              additional fees.
            </Trans>
          </Text>
        </div>
        <div className="column">
          <Text>
            <Trans id="retirement.footer.aboutCarbonmark.right">
              Carbonmark aims to reduce barriers to entry to the Digital Carbon
              Market, and empower market participants to better interact with
              one another. Learn more on our{" "}
              <a href={urls.resourcesCarbonmark}>resources</a> page.
            </Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};
