import { FC, ReactNode } from "react";
import * as styles from "./styles";

interface Props {
  title: string;
  children: ReactNode;
}
export const ChartContainer: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.chartContainer}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};
