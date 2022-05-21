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
      .typeError("Enter an estimated carbon footprint")
      .required("Enter an estimated carbon footprint")
      .min(1, "Value needs to be greater than 1"),
    categories: yup.array().of(
      yup.object({
        name: yup.string().required('Enter a category'),
        quantity: yup
          .number()
          .required("Enter carbon tonnes")
          .typeError("Enter carbon tonnes")
          .min(1, "Value needs to be greater than 1"),
      })
    ),
  })
  .noUnknown();
