import * as yup from "yup";

export const formSchema = yup
  .object({
    id: yup.string().nullable(),
    ownerAddress: yup.string().required().trim(),
    nonce: yup.string().required().trim(),
    name: yup.string().required("Enter a name").trim(),
    description: yup
      .string()
      .required("Enter a pledge")
      .max(280, "Enter less than 280 characters")
      .trim(),
    methodology: yup
      .string()
      .required("Enter a methodology")
      .max(280, "Enter less than 280 characters")
      .trim(),
    footprint: yup
      .number()
      .required("Enter a carbon tonne estimate")
      .typeError("Enter a carbon tonne estimate")
      .required("Enter a carbon tonne estimate")
      .min(1, "Value needs to be greater than 1"),
    categories: yup.array().of(
      yup.object({
        name: yup.string().required('Enter a category').trim(),
        quantity: yup
          .number()
          .required("Enter a carbon tonne estimate")
          .typeError("Enter a carbon tonne estimate")
          .min(1, "Value needs to be greater than 1"),
      })
    ).required(),
  })
  .noUnknown();
