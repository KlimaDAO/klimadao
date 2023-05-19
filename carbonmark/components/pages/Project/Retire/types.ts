import { CarbonToken } from "@klimadao/lib/constants";
import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export type FormValues = {
  projectAddress: string;
  paymentMethod: CarbonmarkPaymentMethod;
  maxAmountIn: string;
  retirementToken: CarbonToken;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  totalPrice: string;
};
