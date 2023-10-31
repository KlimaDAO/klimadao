import { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface CoinTileDataFact {
  value: ReactNode;
  label: ReactNode;
}
type CoinTileData = {
  title: string;
  globalFact?: ReactNode;
  icon: ReactNode;
  facts: Array<CoinTileDataFact>;
  order?: number;
};
export type CoinTilesData = Array<CoinTileData>;

export type CoinTilesLayout = "row" | "column";
interface Props {
  data: CoinTilesData;
  layout: CoinTilesLayout;
}
export function CoinTile(props: { data: CoinTileData }) {
  return (
    <div className={styles.tile}>
      <div className={styles.header}>
        <div className={styles.iconBox}>{props.data.icon}</div>
        <div className={styles.headerText}>
          <div aria-describedby="title">{props.data.title}</div>
          <div aria-describedby="fact">{props.data.globalFact}</div>
        </div>
      </div>
      <div className={styles.content}>
        {props.data.facts.map((fact, index) => (
          <div key={index} className={styles.fact}>
            <div aria-describedby="value">{fact.value}</div>
            <div aria-describedby="label">{fact.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A component that renders tiles */
export function CoinTiles(props: Props) {
  const tiles_styles =
    props.layout == "row"
      ? styles.tiles_row_layout
      : styles.tiles_column_layout;
  const data = props.data.sort((a, b) => {
    if (a.order == undefined && b.order == undefined) return 0;
    if (a.order == undefined) return -1;
    if (b.order == undefined) return 1;
    return b.order == a.order ? 0 : b.order > a.order ? -1 : 1;
  });
  return (
    <div className={tiles_styles}>
      {data.map((tileData, index) => (
        <CoinTile key={index} data={tileData}></CoinTile>
      ))}
    </div>
  );
}
