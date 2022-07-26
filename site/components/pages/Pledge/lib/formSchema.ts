import * as yup from "yup";

export const formSchema = yup
  .object({
    id: yup.string().nullable(),
    ownerAddress: yup.string().required().trim(),
    nonce: yup.string().required().trim(),
    name: yup.string().required("Enter a name").trim(),
    profileImageUrl: yup.string().url("Enter a valid url").trim().ensure(),
    description: yup
      .string()
      .required("Enter a pledge")
      .max(500, "Enter less than 500 characters")
      .trim(),
    methodology: yup
      .string()
      .required("Enter a methodology")
      .max(1000, "Enter less than 1000 characters")
      .trim(),
    footprint: yup
      .number()
      .required("Enter a carbon tonne estimate")
      .typeError("Enter a carbon tonne estimate")
      .required("Enter a carbon tonne estimate")
      .min(0, "Value needs to be greater than 0"),
    categories: yup
      .array()
      .of(
        yup.object({
          name: yup
            .string()
            .required("Enter a category")
            .max(32, "Enter less than 32 characters")
            .trim(),
          quantity: yup
            .number()
            .required("Enter a carbon tonne estimate")
            .typeError("Enter a carbon tonne estimate")
            .min(0, "Value needs to be greater than 0"),
        })
      )
      .required(),
  })
  .noUnknown();
