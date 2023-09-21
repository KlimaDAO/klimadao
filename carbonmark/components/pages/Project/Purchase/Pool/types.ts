import { CarbonmarkPaymentMethod } from "lib/types/carbonmark.types";

export type FormValues = {
  paymentMethod: CarbonmarkPaymentMethod;
  quantity: string;
  totalPrice: string;
};
