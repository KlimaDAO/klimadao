import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { InputField, TextareaField } from "components/Form";

import { OffsetLayout } from "./OffsetLayout";
import * as styles from "./styles";

/* TODO
  - URL params support
  - setSelectedRetirementToken is a useEffect on a few conditons
  - default beneficiary address to connected wallet
*/

export const formSchema = yup.object({
  retirementToken: yup.string(),
  projectAddress: yup.string(),
  quantity: yup.number(),
  beneficiaryName: yup.string(),
  beneficiaryAddress: yup.string(),
  retirementMessage: yup.string(),
  paymentMethod: yup.string(),
});

export const OffsetV2 = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { isDirty, errors } = formState;

  return (
    <OffsetLayout>
      <div className={styles.offsetCard_ui}>
        <InputField
          id="quantity"
          inputProps={{
            id: "quantity",
            placeholder: "Enter quantity to offset",
            type: "number",
            ...register("quantity"),
          }}
          label="How many tonnes of carbon would you like to offset?"
        />

        <InputField
          id="beneficiaryName"
          inputProps={{
            id: "beneficiaryName",
            placeholder: "Beneficiary name",
            type: "text",
            ...register("beneficiaryName"),
          }}
          label="Who will this retirement be credited to?"
        />

        <InputField
          id="beneficiaryAddress"
          inputProps={{
            id: "beneficiaryAddress",
            placeholder: "Defaults to connected wallet address",
            type: "text",
            ...register("beneficiaryAddress"),
          }}
          label="Address associated with retirement"
        />

        <TextareaField
          id="retirementMessage"
          textareaProps={{
            id: "retirementMessage",
            placeholder: "Describe the purpose of this retirement",
            rows: 6,
            ...register("retirementMessage"),
          }}
          label="Retirement message"
        />
      </div>
    </OffsetLayout>
  );
};
