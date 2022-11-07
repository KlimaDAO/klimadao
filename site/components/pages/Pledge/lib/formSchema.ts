import { t } from "@lingui/macro";
import { utils } from "ethers";
import * as yup from "yup";

// extends yup.string schema with custom validation methods
yup.addMethod<yup.StringSchema>(
  yup.string,
  "isAddress",
  function (errorMessage: string) {
    return this.test("is-address", errorMessage, function (value: any) {
      if (utils.isAddress(value)) return true;

      return this.createError({ message: errorMessage });
    });
  }
);

export const pledgeErrorTranslationsMap = {
  ["pledges.form.errors.name.required"]: t({
    id: "pledges.form.errors.name.required",
    message: "Enter a name",
  }),
  ["pledges.form.errors.profileImageUrl.url"]: t({
    id: "pledges.form.errors.profileImageUrl.url",
    message: "Enter a valid url",
  }),
  ["pledges.form.errors.profileWebsiteUrl.url"]: t({
    id: "pledges.form.errors.profileWebsiteUrl.url",
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
    profileWebsiteUrl: yup
      .string()
      .url("pledges.form.errors.profileWebsiteUrl.url")
      .trim()
      .ensure(),
    description: yup
      .string()
      .required("pledges.form.errors.description.required")
      .max(500, "pledges.form.errors.description.max")
      .trim(),
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
