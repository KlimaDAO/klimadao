import {
  CarbonmarkPaymentMethod,
  CarbonmarkRetirementToken,
} from "lib/types/carbonmark";

export type FormValues = {
  projectAddress: string;
  paymentMethod: CarbonmarkPaymentMethod;
  maxAmountIn: string;
  retirementToken: CarbonmarkRetirementToken;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  totalPrice: string;
};
