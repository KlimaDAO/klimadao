import React, { FC } from "react";
import { Text } from "@klimadao/lib/components";

import { LeafIcon } from "../LeafIcon";
import * as styles from "./styles";

export const LoadingOverlay: FC = () => (
  <div className={styles.loadingOverlay}>
    <LeafIcon className={styles.leafIcon} />
    <Text t="body1">Finding projects...</Text>
  </div>
);
