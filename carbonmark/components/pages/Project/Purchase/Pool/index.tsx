import { Price, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { PurchaseForm } from "./PurchaseForm";

type Props = {
  price: Price;
  project: Project;
};

export const PoolPurchase: FC<Props> = (props) => {
  // TODO: Fetch the latest pool price here and pass down, maybe with SWR??

  return <PurchaseForm project={props.project} price={props.price} />;
};
