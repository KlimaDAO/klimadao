import { DetailedProject, TokenPrice } from "lib/types/carbonmark.types";
import { FC } from "react";
import { RetireForm } from "./RetireForm";

export interface Props {
  project: DetailedProject;
  poolPrice: TokenPrice;
}

export const PoolRetire: FC<Props> = (props) => {
  return <RetireForm project={props.project} price={props.poolPrice} />;
};
