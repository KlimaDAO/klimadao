import * as yup from "yup";

import { formSchema } from "../lib";

export type Footprint = {
  timestamp: number;
  total: number;
};

export type Pledge = {
  id: string;
  ownerAddress: string;
  name: string;
  nonce: number;
  description: string;
  methodology: string;
  footprint: Footprint[];
};

export type PledgeFormValues = yup.InferType<typeof formSchema>;