import { CarbonmarkPaymentMethod } from "lib/types/carbonmark.types";

export type FormValues = {
  listingId: string;
  amount: string;
  price: string;
  paymentMethod: CarbonmarkPaymentMethod;
};
