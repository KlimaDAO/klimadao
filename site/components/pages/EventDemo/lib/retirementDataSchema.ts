import * as yup from "yup";

export const retirementDataSchema = yup
  .object({
    quantity: yup.string().required("RetirementData must contain quantity"),
    index: yup.string().required("RetirementData must contain index"),
    beneficiaryAddress: yup
      .string()
      .required("RetirementData must contain beneficiaryAddress"),
    transactionHash: yup
      .string()
      .required("RetirementData must contain transactionHash"),
  })
  .noUnknown();

/** Returned from contract after successful retirement */
export type RetirementData = yup.InferType<typeof retirementDataSchema>;
