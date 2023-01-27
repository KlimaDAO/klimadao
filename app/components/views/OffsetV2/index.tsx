import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "@klimadao/lib/components";
import { offsetCompatibility, retirementTokens } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { DropdownWithModal } from "components/DropdownWithModal";
import { InputField, TextareaField } from "components/Form";
import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { tokenInfo } from "lib/getTokenInfo";

import { SelectiveRetirement } from "../Offset/SelectiveRetirement";
import { CostDisplay } from "./CostDisplay";
import { OffsetLayout } from "./OffsetLayout";

import * as styles from "./styles";

/* TODO
  - URL params support
  - setSelectedRetirementToken is a useEffect on a few conditons
  - default beneficiary address to connected wallet
  - calculate cost
  - handle approval
*/

export const formSchema = yup.object({
  retirementToken: yup.string(),
  projectAddress: yup.string(),
  project: yup.object(),
  quantity: yup.number(),
  beneficiaryName: yup.string(),
  beneficiaryAddress: yup.string(),
  retirementMessage: yup.string(),
  paymentMethod: yup.string(),
});

const defaultValues = {
  retirementToken: "bct",
  projectAddress: "",
  project: {},
  quantity: 0,
  beneficiaryName: "",
  beneficiaryAddress: "",
  retirementMessage: "",
  paymentMethod: "fiat",
};

const retirementTokenItems = (paymentMethod) =>
  retirementTokens.map((tkn) => {
    const disabled = !offsetCompatibility[paymentMethod]?.includes(tkn);
    return {
      ...tokenInfo[tkn],
      disabled,
      description: disabled ? (
        <Trans id="offset.incompatible">INPUT TOKEN INCOMPATIBLE</Trans>
      ) : (
        ""
      ),
    };
  });

export const OffsetV2 = () => {
  const [retirementTokenModalOpen, setRetirementTokenModalOpen] =
    useState(false);
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);

  // form control
  const {
    control,
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { isDirty, errors } = formState;

  const values = getValues();

  useEffect(() => {
    console.log(values);
  }, [values]);

  const retirementToken = watch("retirementToken");
  const selectedProject = watch("project");
  const setSelectedProject = (project) => setValue("project", project);
  const setProjectAddress = (address) => setValue("projectAddress", address);

  return (
    <OffsetLayout>
      <div className={styles.offsetCard_ui}>
        <DropdownWithModal
          label={t({
            id: "offset.dropdown_retire.label",
            message: "Select carbon offset token to retire",
          })}
          modalTitle={t({
            id: "offset.modal_retire.title",
            message: "Select Carbon Type",
          })}
          currentItem={watch("retirementToken")}
          items={retirementTokenItems(watch("paymentMethod"))}
          isModalOpen={retirementTokenModalOpen}
          onToggleModal={() => setRetirementTokenModalOpen((s) => !s)}
          onItemSelect={(value) => setValue("retirementToken", value)}
        />

        <SelectiveRetirement
          projectAddress={watch("projectAddress")}
          selectedRetirementToken={retirementToken}
          setProjectAddress={setProjectAddress}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />

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

        {/* TODO: calculate cost */}
        <CostDisplay
          cost={22}
          paymentMethod={watch("paymentMethod")}
          warn={false}
        />

        <MiniTokenDisplay
          label={
            <Text t="caption" color="lighter">
              <Trans id="offset.retiring">Retiring</Trans>
            </Text>
          }
          amount={Number(watch("quantity"))?.toLocaleString("en")}
          icon={tokenInfo[retirementToken].icon}
          name={retirementToken}
          labelAlignment="start"
        />

        {/* <PaymentMethodInput
          selectedPaymentMethod={watch("paymentMethod")}
          isModalOpen={paymentMethodModalOpen}
          onToggleModal={() => setPaymentMethodModalOpen((s) => !s)}
          onPaymentMethodSelect={(value) => setValue("paymentMethod", value)}
        /> */}

        <div className="disclaimer">
          <GppMaybeOutlined />
          <Text t="caption">
            <Trans id="offset_disclaimer">
              Be careful not to expose any sensitive personal information. Your
              message can not be edited and will permanently exist on a public
              blockchain.
            </Trans>
          </Text>
        </div>
      </div>
    </OffsetLayout>
  );
};
