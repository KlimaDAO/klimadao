import { FC } from "react";
import { Category as CategoryType } from "@klimadao/lib/types/marketplace";

import { categoryInfoMap } from "components/pages/Marketplace/lib/getCategoryInfo";
import * as styles from "./styles";

type Props = {
  category: CategoryType;
};

export const Category: FC<Props> = (props) => {
  const category = categoryInfoMap[props.category];

  if (!category) {
    return <div className={styles.category}>??</div>;
  }

  const Icon = category.icon;

  return (
    <div
      className={styles.category}
      style={{ backgroundColor: category.color }}
    >
      <Icon /> {category.label}
    </div>
  );
};
