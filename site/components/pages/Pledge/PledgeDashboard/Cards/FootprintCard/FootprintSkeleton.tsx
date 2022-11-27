import { css } from "@emotion/css";
import { FC } from "react";

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
      <Skeleton width={24} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
    <div className={styles.categoryRow}>
      <Skeleton width={18} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
    <div className={styles.categoryRow}>
      <Skeleton width={22} />
      <div className={styles.skeleton_right}>
        <Skeleton width={5} />
        <Skeleton width={5} />
      </div>
    </div>
  </div>
);
