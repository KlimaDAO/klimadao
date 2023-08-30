import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}
export const ChartContainer: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};
