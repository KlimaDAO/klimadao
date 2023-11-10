import { CarbonmarkPaymentMethod } from "lib/types/carbonmark.types";

export type FormValues = {
  paymentMethod: CarbonmarkPaymentMethod;
  projectTokenAddress: string;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  totalPrice: string;
};
