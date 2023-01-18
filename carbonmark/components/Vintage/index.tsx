import { FC } from "react";

import * as styles from "./styles";

type Props = {
  vintage: string;
};

export const Vintage: FC<Props> = (props) => {
  return <div className={styles.vintage}>{props.vintage}</div>;
};
