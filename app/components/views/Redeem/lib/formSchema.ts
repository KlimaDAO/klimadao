import { t } from "@lingui/macro";
import { utils } from "ethers";
import * as yup from "yup";

yup.addMethod<yup.StringSchema>(
  yup.string,
  "isAddress",
  function (errorMessage: string) {
    return this.test("is-address", errorMessage, function (value) {
      if (utils.isAddress(value || "")) return true;

      return this.createError({ message: errorMessage });
    });
  }
);

export const redeemErrorTranslationsMap = {
  ["redeem.form.errors.retirementToken.required"]: t({
    id: "redeem.form.errors.retirementToken.required",
    message: "Enter a name",
  }),
  ["redeem.form.errors.retirementToken.isAddress"]: t({
    id: "redeem.form.errors.retirementToken.isAddress",
    message: "Enter a valid address",
  }),
  ["redeem.form.errors.projectAddress.required"]: t({
    id: "redeem.form.errors.projectAddress.required",
    message: "Select a project",
  }),
  ["redeem.form.errors.projectAddress.isAddress"]: t({
    id: "redeem.form.errors.projectAddress.isAddress",
    message: "Invalid project address",
  }),
  ["redeem.form.errors.quantity.required"]: t({
    id: "redeem.form.errors.quantity.required",
    message: "Enter a quantity",
  }),
  ["redeem.form.errors.quantity.min"]: t({
    id: "redeem.form.errors.quantity.min",
    message: "Enter a value greater than 0.001",
  }),
  ["redeem.form.errors.paymentMethod.required"]: t({
    id: "redeem.form.errors.paymentMethod.required",
    message: "Enter a payment method",
  }),
} as const;

export type RedeemErrorId = keyof typeof redeemErrorTranslationsMap;

export const formSchema = yup.object({
  retirementToken: yup
    .string()
    .required("redeem.form.errors.retirementToken.required")
    .isAddress("redeem.form.errors.retirementToken.isAddress")
    .trim(),
  projectAddress: yup
    .string()
    .required("redeem.form.errors.projectAddress.required")
    .isAddress("redeem.form.errors.projectAddress.isAddress")
    .trim(),
  project: yup.object(),
  quantity: yup
    .number()
    .required("redeem.form.errors.quantity.required")
    .min(0.001, "redeem.form.errors.quantity.min"),
  paymentMethod: yup
    .string()
    .required("redeem.form.errors.paymentMethod.required"),
  cost: yup.string().nullable(),
});

export type RedeemFormValues = yup.InferType<typeof formSchema>;
