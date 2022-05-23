import React, { FC } from "react";
import { css } from "@emotion/css";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { Footprint, Category } from "../../../types";
import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  footprint: Footprint[];
};

interface CategoryWithPercent extends Category {
  percent: number;
}

const calcFootprintPercent = (
  total: number,
  categories: Category[]
): CategoryWithPercent[] => {
  return categories.map((category) => ({
    ...category,
    percent: Math.round((category.quantity / total) * 100),
  }));
};

export const FootprintCard: FC<Props> = (props) => {
  const footprint = props.footprint[props.footprint.length - 1];

  const categoriesWithPercent = calcFootprintPercent(
    footprint.total,
    footprint.categories
  );

  return (
    <BaseCard
      title="Footprint"
      icon={<LocalGasStationOutlinedIcon fontSize="large" />}
    >
      <div className={styles.footprintTotal}>
        <Text t="h1" uppercase>
          {footprint.total}k
        </Text>
        <Text t="h4" color="lightest" uppercase>
          Tonnes
        </Text>
      </div>

      {footprint.total === 0 ? (
        <FootprintSkeleton />
      ) : (
        <div className={styles.categories}>
          {categoriesWithPercent.map((category, index) => (
            <div key={index}>
              <div className={styles.categoryRow} key={index}>
                <Text t="h4" className={styles.categoryRow_name} uppercase>
                  {category.name}
                </Text>
                <Text t="h4" uppercase>
                  {category.quantity}k{" "}
                  <span className={styles.categoryRow_divider}>|</span>{" "}
                  <span className={styles.categoryRow_percentage}>
                    {category.percent}%
                  </span>
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </BaseCard>
  );
};

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

const FootprintSkeleton: FC = () => (
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
