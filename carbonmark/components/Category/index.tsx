import { cx } from "@emotion/css";
import { CategoryNames } from "@klimadao/lib/types/carbonmark";
import { categoryInfoMap, getFirstCategory } from "lib/getCategoryInfo";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  category: CategoryNames;
};

export const Category: FC<Props> = (props) => {
  // there are more than one category if coming from a pool!
  // quick fix: take the first one
  const firstCategory = getFirstCategory(props.category);
  const category = categoryInfoMap[firstCategory];

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
