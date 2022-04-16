import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { InputField, TextareaField } from "components/Form";
import { Pledge } from "lib/moralis";

import * as styles from "./styles";

type Props = {
  pledge: Pledge;
  onFormSubmit: (data: PledgeForm) => void;
};

const schema = yup
  .object({
    name: yup.string().required("Enter a name"),
    pledge: yup.string().required("Enter a pledge").max(280),
    methodology: yup.string().required("Enter a methodology").max(280),
    footprint: yup
      .number()
      .min(10)
      .required("Enter your carbon footprint")
      .typeError("Enter your carbon footprint"),
  })
  .noUnknown();

type PledgeForm = yup.InferType<typeof schema>;

export const PledgeForm: FC<Props> = (props) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    defaultValues: props.pledge,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<PledgeForm> = (data: PledgeForm) => {
    console.log(data);
    props.onFormSubmit(data);
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
        id="footprint"
        type="number"
        label="Footprint (carbon tonnes)"
        placeholder="Quantity in carbon tonnes"
        errors={formState.errors.footprint}
        {...register("footprint")}
      />

      <ButtonPrimary label="Save pledge" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};
