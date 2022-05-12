import { putPledgeParams } from "queries/pledge";
import * as yup from "yup";

export type Footprint = {
  timestamp: number;
  total: number;
};

export type Pledge = {
  id: string;
  ownerAddress: string;
  name: string;
  description: string;
  methodology: string;
  footprint: Footprint[];
};

export const formSchema = yup
  .object({
    id: yup.string().uuid(),
    ownerAddress: yup.string().required(),
    name: yup.string().required("Enter a name"),
    description: yup
      .string()
      .required("Enter a pledge")
      .max(280, "Enter less than 280 characters"),
    methodology: yup
      .string()
      .required("Enter a methodology")
      .max(280, "Enter less than 280 characters"),
    footprint: yup
      .number()
      .typeError("Enter your estimated carbon footprint")
      .required("Enter your estimated carbon footprint")
      .min(1, "Value needs to be greater than 1"),
  })
  .noUnknown();

export type PledgeFormValues = yup.InferType<typeof formSchema>;

export const pledgeResolver = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint
    ? pledge.footprint.at(-1)?.total
    : 0;

    console.log({pledge})

  return {
    id: pledge.id || "",
    ownerAddress: pledge.ownerAddress || "",
    name: pledge.name || "",
    description: pledge.description || "",
    methodology: pledge.methodology || "",
    footprint: currentFootprint as number,
  };
};