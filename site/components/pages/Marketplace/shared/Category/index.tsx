import { FC } from "react";
import { CategoryName } from "@klimadao/lib/types/marketplace";
import { cx } from "@emotion/css";
import { categoryInfoMap } from "components/pages/Marketplace/lib/getCategoryInfo";
import * as styles from "./styles";

type Props = {
  category: CategoryName;
};

export const Category: FC<Props> = (props) => {
  const category = categoryInfoMap[props.category];

  if (!category) {
    return <div className={styles.category}>??</div>;
  }

  const Icon = category.icon;

  const other = category.key === "Other";

  return (
    <div
      className={cx(styles.category, { other })}
      style={{ backgroundColor: category.color }}
    >
      <Icon /> {category.label}
    </div>
  );
};
