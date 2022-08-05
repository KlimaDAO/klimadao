import React, { FC } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Trans, t } from "@lingui/macro";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

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

const calculateFootprintPercent = (
  total: number,
  categories: Category[]
): CategoryWithPercent[] => {
  return categories.map((category, index) => ({
    ...category,
    percent: (category.quantity / total) * 100,
    fill: COLOR_PALETTE[index],
  }));
};

export const FootprintCard: FC<Props> = (props) => {
  const { locale } = useRouter();
  const footprint = props.footprint[props.footprint.length - 1];
  const hasFootprint = footprint.total !== 0;
  // footprint categories sorted from low to high
  const sortedCategories = footprint.categories.sort(
    (a, b) => a.quantity - b.quantity
  );
  const categoriesWithPercent = calculateFootprintPercent(
    footprint.total,
    sortedCategories
  );

  return (
    <BaseCard
      title={t({
        id: "pledges.dashboard.footprint.title",
        message: "Footprint",
      })}
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
            {trimWithLocale(footprint.total, 2, locale)}
          </Text>
          <Text t="h3" color="lightest" uppercase>
            <Trans id="pledges.dashboard.footprint.tonnes">Tonnes</Trans>
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
                    {trimWithLocale(category.quantity, 2, locale)}{" "}
                    <span className={styles.categoryRow_divider}>|</span>{" "}
                    <span
                      className={styles.categoryRow_percentage}
                      style={{ color: `${category.fill}` }}
                    >
                      {trimWithLocale(category.percent, 2, locale)}%
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
