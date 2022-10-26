import * as yup from "yup";

export const formSchema = yup
  .object({
    name: yup
      .string()
      .required("A name is required")
      .max(50, "Name must be less than 50 chars")
      .trim(),
    loveLetter: yup
      .string()
      .required("A message is required")
      .max(280, "Message must be less than 280 chars")
      .trim(),
  })
  .noUnknown();

export type FormSchema = yup.InferType<typeof formSchema>;
