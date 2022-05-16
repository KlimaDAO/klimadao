import * as yup from "yup";

export const formSchema = yup
  .object({
    id: yup.string().uuid(),
    ownerAddress: yup.string().required(),    
    name: yup.string().required("Enter a name"),
    nonce: yup.number().required(),
    description: yup
      .string()
      .required("Enter a pledge")
      .max(280, "Enter less than 280 characters"),
    methodology: yup
      .string()
      .required("Enter a methodology")
      .max(280, "Enter less than 280 characters"),
    footprint: yup
      .number()
      .typeError("Enter your estimated carbon footprint")
      .required("Enter your estimated carbon footprint")
      .min(1, "Value needs to be greater than 1"),
  })
  .noUnknown();