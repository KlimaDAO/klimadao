import { Listing, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { InactivePurchase } from "../InactivePurchase";
import { PurchaseForm } from "./PurchaseForm";

type Props = {
  listing: Listing;
  project: Project;
};

export const ListingPurchase: FC<Props> = (props) => {
  const isActiveListing = props.listing.active && !props.listing.deleted;

  if (isActiveListing) {
    return <PurchaseForm project={props.project} listing={props.listing} />;
  }

  return (
    <InactivePurchase
      project={props.project}
      singleUnitPrice={props.listing.singleUnitPrice}
      seller={props.listing.seller}
    />
  );
};
