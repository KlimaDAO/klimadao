import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export type FormValues = {
  listingId: string;
  amount: string;
  price: string;
  paymentMethod: CarbonmarkPaymentMethod;
};
