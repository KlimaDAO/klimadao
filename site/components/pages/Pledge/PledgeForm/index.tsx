import React, { FC, useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { InputField, TextareaField } from "components/Form";
// import { putPledge } from "queries/pledge";
import { useWeb3 } from "hooks/useWeb3/web3context";

import { editPledgeSignature, formSchema, putPledge } from "../lib";
import { PledgeFormValues } from "../types";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
  pledge: PledgeFormValues;
  onFormSubmit: (data: PledgeFormValues) => void;
};

export const PledgeForm: FC<Props> = (props) => {
  const [serverError, setServerError] = useState(false);
  const { signer } = useWeb3();
  const { register, handleSubmit, formState, reset } =
    useForm<PledgeFormValues>({
      mode: "onBlur",
      defaultValues: props.pledge,
      resolver: yupResolver(formSchema),
    });
  const { isDirty, isValid } = formState;

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    const nonce = values.nonce.toString();
    const signature = (await signer?.signMessage(
      editPledgeSignature(nonce)
    )) as string;

    const response = await putPledge({
      pageAddress: props.pageAddress,
      pledge: values,
      signature,
    });
    const data = await response.json();

    if (data.pledge) {
      props.onFormSubmit(data.pledge);
      reset(data.pledge);
      setServerError(false);
    } else {
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

      <ButtonPrimary
        disabled={!isDirty || !isValid}
        label="Save pledge"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
