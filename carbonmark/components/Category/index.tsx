import { cx } from "@emotion/css";
import { getCategoryInfo } from "lib/getCategoryInfo";
import { CategoryName } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  category: CategoryName;
};

export const Category: FC<Props> = (props) => {
  // there are more than one category if coming from a pool!
  // quick fix: take the first one
  const categoryInfo = getCategoryInfo(props.category);

  if (!categoryInfo) {
    return <div className={styles.category}>??</div>;
  }

  const Icon = categoryInfo.icon;

  const other = categoryInfo.key === "Other";

  return (
    <div
      className={cx(styles.category, { other })}
      style={{ backgroundColor: categoryInfo.color }}
    >
      <Icon /> {categoryInfo.label}
    </div>
  );
};
