import { FC, ReactNode } from "react";
import layout from "theme/layout.module.scss";

export const TwoColumnRetirementTrendsTab: FC<{
  leftColumn: Array<ReactNode>;
  rightColumn: Array<ReactNode>;
}> = ({ leftColumn, rightColumn }) => {
  return (
    <div className={layout.twoColumns}>
      <div className={layout.cardStackedRows}>
        {leftColumn.map((node, key) => {
          return (
            <div className={layout.cardRow} key={key}>
              {node}
            </div>
          );
        })}
      </div>
      <div className={layout.cardStackedRows}>
        {rightColumn.map((node, key) => {
          return (
            <div className={layout.cardRow} key={key}>
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
};
