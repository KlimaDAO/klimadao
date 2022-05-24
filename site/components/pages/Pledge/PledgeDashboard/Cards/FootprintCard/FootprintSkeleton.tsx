import React, { FC } from "react";
import { css } from "@emotion/css";

import * as styles from "./styles";

type SkeletonProps = {
  width: number;
};

const Skeleton: FC<SkeletonProps> = (props) => (
  <div
    className={css({
      width: `${props.width}rem`,
      height: "2.6rem",
      borderRadius: "0.6rem",
      backgroundColor: "var(--surface-01)",
    })}
  />
);

export const FootprintSkeleton: FC = () => (
  <div className={styles.categories}>
    <div className={styles.categoryRow}>
      <Skeleton width={26} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
    <div className={styles.categoryRow}>
      <Skeleton width={20} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
    <div className={styles.categoryRow}>
      <Skeleton width={23} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
  </div>
);
