import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export type FormValues = {
  projectAddress: string;
  paymentMethod: CarbonmarkPaymentMethod;
  maxAmountIn: string;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  totalPrice: string;
};
