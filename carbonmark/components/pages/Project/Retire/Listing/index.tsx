import { DetailedProject, Listing } from "lib/types/carbonmark.types";
import { FC } from "react";
import { RetireForm } from "./RetireForm";

export interface Props {
  project: DetailedProject;
  listing: Listing;
}

export const ListingRetire: FC<Props> = (props) => {
  return <RetireForm project={props.project} listing={props.listing} />;
};
