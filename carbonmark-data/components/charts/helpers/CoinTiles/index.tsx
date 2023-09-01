import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface CoinTileDataFact {
    value: string
    label: string
}
type CoinTileData = {
    title: string
    globalFact: string
    icon: ReactNode
    facts: Array<CoinTileDataFact>
}
export type CoinTilesData = Array<CoinTileData>

interface Props {
  data: CoinTilesData;
}
export function CoinTile(props: { data: CoinTileData}) {
  return (
      <div className={styles.tile}>
        <div className={styles.header}>
          {props.data.icon}
          <div className={styles.headerText}>
            <div aria-describedby="title">{props.data.title}</div>
            <div aria-describedby="fact">{props.data.globalFact}</div>
          </div>
        </div>
        <div className={styles.content}>
          {props.data.facts.map((fact, index) => (
            <div key={index} className={styles.fact}>
              <div>{fact.value}</div>
              <div>{fact.label}</div>
            </div>
          ))}
        </div>
      
      </div>
  );
}
export function CoinTiles(props: Props) {
  return (
    <>{props.data.map((tileData, index) => 
      <CoinTile key={index} data={tileData}></CoinTile>
      )}</>
  );
}
