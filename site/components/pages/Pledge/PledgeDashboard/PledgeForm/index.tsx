import React, { FC, useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { InputField, TextareaField } from "components/Form";
import { putPledge } from "queries/pledge";
import { PledgeFormValues } from "lib/moralis";

import * as styles from "./styles";

type Props = {
  pledge: PledgeFormValues;
  onFormSubmit: (data: PledgeFormValues) => void;
};

// temporarily duplicated due to weird interaction with moralis-sdk resulting in a breaking build
// we should be able to export the schema object from another file
const schema = yup
  .object({
    objectId: yup.string().nullable(),
    ownerAddress: yup.string().required(),
    name: yup.string().required("Enter a name"),
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

export const PledgeForm: FC<Props> = (props) => {
  const [serverError, setServerError] = useState(false);
  const { register, handleSubmit, formState, reset } =
    useForm<PledgeFormValues>({
      mode: "onBlur",
      defaultValues: props.pledge,
      resolver: yupResolver(schema),
    });

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    try {
      const response = await putPledge({
        pledge: values,
        signature: "boo",
      });
      const data = await response.json();

      props.onFormSubmit(data.pledge);
      reset(data.pledge);
    } catch (error) {
      console.error(error);
      setServerError(true);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <Text className={styles.errorMessage} t="caption">
          Something went wrong. Please try again.
        </Text>
      )}

      <InputField
        label="Name"
        placeholder="Name or company name"
        type="text"
        errors={formState.errors.name}
        {...register("name")}
      />

      <TextareaField
        id="pledge"
        label="Pledge"
        rows={2}
        placeholder="What is your pledge?"
        errors={formState.errors.description}
        {...register("description")}
      />

      <TextareaField
        id="methodology"
        label="Methodology"
        rows={6}
        placeholder="How will you meet your pledge?"
        errors={formState.errors.methodology}
        {...register("methodology")}
      />

      <InputField
        label="Footprint"
        placeholder="Footprint (carbon tonnes)"
        type="number"
        errors={formState.errors.footprint}
        {...register("footprint")}
      />

      <ButtonPrimary label="Save pledge" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};
