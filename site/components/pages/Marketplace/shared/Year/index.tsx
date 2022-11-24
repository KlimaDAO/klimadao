import { FC } from "react";

import * as styles from "./styles";

type Props = {
  year: string;
};

export const Year: FC<Props> = (props) => {
  return <div className={styles.year}>{props.year}</div>;
};
