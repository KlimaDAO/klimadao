import { t } from "@lingui/macro";
import * as yup from "yup";

export const pledgeErrorTranslationsMap = {
  ["pledges.form.errors.name.required"]: t({
    id: "pledges.form.errors.name.required",
    message: "Enter a name",
  }),
  ["pledges.form.errors.profileImageUrl.url"]: t({
    id: "pledges.form.errors.profileImageUrl.url",
    message: "Enter a valid url",
  }),
  ["pledges.form.errors.description.required"]: t({
    id: "pledges.form.errors.description.required",
    message: "Enter a pledge",
  }),
  ["pledges.form.errors.description.max"]: t({
    id: "pledges.form.errors.description.max",
    message: "Enter less than 500 characters",
  }),
  ["pledges.form.errors.methodology.required"]: t({
    id: "pledges.form.errors.methodology.required",
    message: "Enter a methodology",
  }),
  ["pledges.form.errors.methodology.max"]: t({
    id: "pledges.form.errors.methodology.max",
    message: "Enter less than 1000 characters",
  }),
  ["pledges.form.errors.footprint.generic_error"]: t({
    id: "pledges.form.errors.footprint.generic_error",
    message: "Enter a carbon tonne estimate",
  }),
  ["pledges.form.errors.footprint.min"]: t({
    id: "pledges.form.errors.footprint.min",
    message: "Enter a value greater than 0",
  }),
  ["pledges.form.errors.categoryName.required"]: t({
    id: "pledges.form.errors.categoryName.required",
    message: "Enter a category",
  }),
  ["pledges.form.errors.categoryName.max"]: t({
    id: "pledges.form.errors.categoryName.max",
    message: "Enter less than 32 characters",
  }),
  ["pledges.form.errors.categoryQuantity.min"]: t({
    id: "pledges.form.errors.categoryQuantity.min",
    message: "Enter a value greater than 0",
  }),
} as const;

export type PledgeErrorId = keyof typeof pledgeErrorTranslationsMap;

export const formSchema = yup
  .object({
    id: yup.string().nullable(),
    ownerAddress: yup.string().required().trim(),
    nonce: yup.string().required().trim(),
    name: yup.string().required("pledges.form.errors.name.required").trim(),
    profileImageUrl: yup
      .string()
      .url("pledges.form.errors.profileImageUrl.url")
      .trim()
      .ensure(),
    description: yup
      .string()
      .required("pledges.form.errors.description.required")
      .max(500, "pledges.form.errors.description.max")
      .trim(),
    wallets: yup.array().of(
      yup.object({
        address: yup
          .string()
          .required("pledges.form.errors.secondaryWalletAddress.required")
          .min(1, "pledges.form.errors.secondaryWalletAddress.min")
          .trim(),
        verified: yup.boolean().required(),
        saved: yup.boolean().required(),
      })
    ),
    methodology: yup
      .string()
      .required("pledges.form.errors.methodology.required")
      .max(1000, "pledges.form.errors.methodology.max")
      .trim(),
    footprint: yup
      .number()
      .required("pledges.form.errors.footprint.generic_error")
      .typeError("pledges.form.errors.footprint.generic_error")
      .min(0, "pledges.form.errors.footprint.min"),
    categories: yup
      .array()
      .of(
        yup.object({
          name: yup
            .string()
            .required("pledges.form.errors.categoryName.required")
            .max(32, "pledges.form.errors.categoryName.max")
            .trim(),
          quantity: yup
            .number()
            .required("pledges.form.errors.footprint.generic_error")
            .typeError("pledges.form.errors.footprint.generic_error")
            .min(0, "pledges.form.errors.categoryQuantity.min"),
        })
      )
      .required()
      .min(1, "pledges.form.errors.footprint.generic_error"),
  })
  .noUnknown();
