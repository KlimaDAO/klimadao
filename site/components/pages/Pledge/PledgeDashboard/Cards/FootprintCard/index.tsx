import React, { FC } from "react";
import dynamic from "next/dynamic";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { Footprint, Category } from "../../../types";
import { BaseCard } from "../BaseCard";
import { FootprintSkeleton } from "./FootprintSkeleton";
import { FootprintChartProps } from "./FootprintCharts";
import * as styles from "./styles";

const FootprintChart: React.ComponentType<FootprintChartProps> = dynamic(
  () => import("./FootprintCharts").then((mod) => mod.FootprintChart),
  { ssr: false }
);
const PlaceholderFootprintChart: React.ComponentType = dynamic(
  () =>
    import("./FootprintCharts").then((mod) => mod.PlaceholderFootprintChart),
  { ssr: false }
);

const COLOR_PALETTE = [
  "#147b11",
  "#2c8e18",
  "#4aa11f",
  "#6db524",
  "#96cb27",
  "#c0dc30",
  "#e3e541",
  "#eedc51",
  "#f6d562",
  "#fdd175",
];

type Props = {
  footprint: Footprint[];
};

export interface CategoryWithPercent extends Category {
  percent: number;
  fill: string;
}

const calcFootprintPercent = (
  total: number,
  categories: Category[]
): CategoryWithPercent[] => {
  return categories.map((category, index) => ({
    ...category,
    percent: Math.round((category.quantity / total) * 100),
    fill: COLOR_PALETTE[index],
  }));
};

export const FootprintCard: FC<Props> = (props) => {
  const footprint = props.footprint[props.footprint.length - 1];
  const hasFootprint = footprint.total !== 0;
  const sortedCategories = footprint.categories.sort(
    (a, b) => a.quantity - b.quantity
  );
  const categoriesWithPercent = calcFootprintPercent(
    footprint.total,
    sortedCategories
  );

  return (
    <BaseCard
      title="Footprint"
      icon={<LocalGasStationOutlinedIcon fontSize="large" />}
    >
      <div className={styles.summary}>
        {hasFootprint ? (
          <FootprintChart data={categoriesWithPercent} />
        ) : (
          <PlaceholderFootprintChart />
        )}
        <div className={styles.footprintTotal}>
          <Text t="h1" uppercase>
            {+footprint.total.toFixed(2)}
          </Text>
          <Text t="h3" color="lightest" uppercase>
            Tonnes
          </Text>
        </div>
      </div>

      {hasFootprint ? (
        <div className={styles.categories}>
          {categoriesWithPercent.map((category, index) => (
            <div key={index}>
              <div className={styles.categoryRow} key={index}>
                <Text t="h4" className={styles.categoryRow_name} uppercase>
                  {category.name}
                </Text>
                <div className={styles.catergoryRow_values}>
                  <Text t="h4" uppercase>
                    {+category.quantity.toFixed(2)}{" "}
                    <span className={styles.categoryRow_divider}>|</span>{" "}
                    <span
                      className={styles.categoryRow_percentage}
                      style={{ color: `${category.fill}` }}
                    >
                      {category.percent}%
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <FootprintSkeleton />
      )}
    </BaseCard>
  );
};
