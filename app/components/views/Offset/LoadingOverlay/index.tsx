import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { FC } from "react";

import { LeafIcon } from "components/LeafIcon";
import * as styles from "./styles";

export const LoadingOverlay: FC = () => (
  <div className={styles.loadingOverlay}>
    <LeafIcon className={styles.leafIcon} />
    <Text t="body1">
      <Trans id="offset.selectiveRetirement.finding_projects">
        Finding projects...
      </Trans>
    </Text>
  </div>
);
