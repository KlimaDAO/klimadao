import { Text } from "components/Text";
import { getCategoryInfo } from "lib/getCategoryInfo";
import { CategoryName } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  category: CategoryName;
};

export const Category: FC<Props> = (props) => {
  const categoryInfo = getCategoryInfo(props.category);

  const Icon = categoryInfo.icon;

  return (
    <Text className={styles.category}>
      <Icon /> {categoryInfo.label}
    </Text>
  );
};
