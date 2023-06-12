import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export type FormValues = {
  paymentMethod: CarbonmarkPaymentMethod;
  quantity: string;
  totalPrice: string;
};
