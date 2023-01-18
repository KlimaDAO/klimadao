import { FC, ReactNode } from "react";

import * as styles from "./styles";

type Props = {
  children: ReactNode;
};

export const Card: FC<Props> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};
