import { cx } from "@emotion/css";
import { CategoryName } from "@klimadao/lib/types/carbonmark";
import { categoryInfoMap } from "lib/getCategoryInfo";
import { FC } from "react";
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
