import React, { FC } from "react";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { Footprint, Category } from "../../../types";
import { BaseCard } from "../BaseCard";
import { FootprintSkeleton } from "./FootprintSkeleton";
import * as styles from "./styles";

import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

type FootprintPieChartProps = {
  data: CategoryWithPercent[];
};

const COLORS = [
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

const FootprintPieChart: FC<FootprintPieChartProps> = (props) => {
  return (
    <ResponsiveContainer width={175} height={175}>
      <PieChart>
        <Tooltip />
        <Pie
          data={props.data}
          nameKey="name"
          dataKey="percent"
          stroke="var(--surface-01)"
          fill="var(--klima-green)"
          outerRadius={80}
          innerRadius={65}
          paddingAngle={2}
          isAnimationActive={true}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`${entry.fill}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const PlaceholderPieChart: FC = () => {
  return (
    <ResponsiveContainer width={175} height={175}>
      <PieChart>
        <Pie
          data={[{ name: "Example", percent: 100 }]}
          nameKey="name"
          dataKey="percent"
          stroke="var(--surface-01)"
          fill="var(--surface-01)"
          outerRadius={80}
          innerRadius={65}
          isAnimationActive={true}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

type Props = {
  footprint: Footprint[];
};

interface CategoryWithPercent extends Category {
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
    fill: COLORS[index],
  }));
};

export const FootprintCard: FC<Props> = (props) => {
  const footprint = props.footprint[props.footprint.length - 1];
  const hasFootprint = footprint.total !== 0;
  const sortedCategories = footprint.categories.sort(
    (a, b) => b.quantity - a.quantity
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
          <FootprintPieChart data={categoriesWithPercent} />
        ) : (
          <PlaceholderPieChart />
        )}
        <div className={styles.footprintTotal}>
          <Text t="h1" uppercase>
            {footprint.total}k
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
                    {category.quantity}k{" "}
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
