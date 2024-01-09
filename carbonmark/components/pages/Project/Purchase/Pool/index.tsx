import { Project, TokenPrice } from "lib/types/carbonmark.types";
import { FC } from "react";
import { PurchaseForm } from "./PurchaseForm";

type Props = {
  price: TokenPrice;
  project: Project;
};

export const PoolPurchase: FC<Props> = (props) => {
  // TODO: Fetch the latest pool price here and pass down, maybe with SWR??

  return <PurchaseForm project={props.project} price={props.price} />;
};
