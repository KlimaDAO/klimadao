import React, { FC } from "react";
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

const calculatePercent = (
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

  const categoriesWithPercent = calculatePercent(
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

      {footprint.total === 0 ? null : (
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
