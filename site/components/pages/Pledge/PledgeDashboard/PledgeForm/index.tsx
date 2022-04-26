import React, { FC } from "react";
import { useMoralis } from "react-moralis";
import { ButtonPrimary } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { InputField, TextareaField } from "components/Form";
import { Pledge } from "lib/moralis";
import { putPledge } from "queries/pledge";

import * as styles from "./styles";

type Props = {
  pledge: Pledge;
  onFormSubmit: (data: PledgeForm) => void;
};

const schema = yup
  .object({
    objectId: yup.string().nullable(),
    address: yup.string().required(),
    name: yup.string().required("Enter a name"),
    pledge: yup.string().required("Enter a pledge").max(280),
    methodology: yup.string().required("Enter a methodology").max(280),
    footprint: yup.array().of(
      yup.object({
        category: yup.string().required("Enter a category"),
        amount: yup
          .number()
          .required("Enter a number")
          .typeError("Enter a number")
          .min(1, "Enter a number greater than 0"),
      })
    ),
  })
  .noUnknown();

type PledgeForm = yup.InferType<typeof schema>;

export const PledgeForm: FC<Props> = (props) => {
  const { user } = useMoralis();
  const { register, handleSubmit, formState, reset, getValues } =
    useForm<PledgeForm>({
      defaultValues: props.pledge,
      resolver: yupResolver(schema),
    });

  const onSubmit: SubmitHandler<PledgeForm> = async (values: PledgeForm) => {
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
      {/* {JSON.stringify(getValues(), null, 2)} */}
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
        label="footprint"
        placeholder="Footprint (carbon tonnes)"
        type="number"
        errors={formState.errors.name}
        {...register("footprint")}
      />

      <ButtonPrimary label="Save pledge" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};
