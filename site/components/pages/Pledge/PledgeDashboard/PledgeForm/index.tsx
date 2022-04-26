import React, { FC } from "react";
import { useMoralis } from "react-moralis";
import { ButtonPrimary } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { InputField, TextareaField } from "components/Form";
import { putPledge } from "queries/pledge";

import * as styles from "./styles";

type Props = {
  pledge: PledgeFormValues;
  onFormSubmit: (data: PledgeFormValues) => void;
};

const schema = yup
  .object({
    objectId: yup.string().nullable(),
    address: yup.string().required(),
    name: yup.string().required("Enter a name"),
    pledge: yup.string().required("Enter a pledge").max(280),
    methodology: yup.string().required("Enter a methodology").max(280),
    footprint: yup
      .number()
      .required("Enter your footprint")
      .min(1, "Value needs to be greater than 1"),
  })
  .noUnknown();

export type PledgeFormValues = yup.InferType<typeof schema>;

export const PledgeForm: FC<Props> = (props) => {
  const { user } = useMoralis();
  const { register, handleSubmit, formState, reset } =
    useForm<PledgeFormValues>({
      defaultValues: props.pledge,
      resolver: yupResolver(schema),
    });

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    try {
      const response = await putPledge({
        pledge: values,
        sessionToken: user?.getSessionToken(),
      });
      const data = await response.json();

      props.onFormSubmit(data.pledge);
      reset(data.pledge);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
        errors={formState.errors.pledge}
        {...register("pledge")}
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
