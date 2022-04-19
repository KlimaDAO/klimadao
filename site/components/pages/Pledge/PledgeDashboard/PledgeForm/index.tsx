import React, { FC } from "react";
import { useMoralis } from "react-moralis";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
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
      yup
        .object({
          category: yup.string().required("Enter a category"),
          amount: yup
            .number()
            .required("Enter a number")
            .typeError("Enter a number")
            .min(1, "Enter a number greater than 0"),
        })
        .required()
    ),
  })
  .noUnknown();

type PledgeForm = yup.InferType<typeof schema>;

export const PledgeForm: FC<Props> = (props) => {
  const { user } = useMoralis();
  const { register, handleSubmit, formState, reset, getValues, control } =
    useForm<PledgeForm>({
      defaultValues: props.pledge,
      resolver: yupResolver(schema),
    });
  const { fields, append, remove } = useFieldArray<PledgeForm>({
    control,
    name: "footprint",
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

      <Text t="caption">Footprint (carbon tonnes)</Text>
      {fields.map((category, index) => (
        <div className={styles.footprintContainer} key={category.id}>
          <div className={styles.footprintRow}>
            <InputField
              hideLabel={true}
              label="Category"
              placeholder="Category"
              type="text"
              errors={formState.errors.footprint?.[index]?.category}
              {...register(`footprint.${index}.category` as const)}
            />
            <InputField
              hideLabel={true}
              label="Amount"
              placeholder="Amount"
              type="number"
              step={1}
              errors={formState.errors.footprint?.[index]?.amount}
              {...register(`footprint.${index}.amount` as const)}
            />
            {index !== 0 && <button onClick={() => remove(index)}>-</button>}
          </div>
        </div>
      ))}
      <button
        onClick={() => append({ category: undefined, amount: undefined })}
      >
        +
      </button>

      <ButtonPrimary label="Save pledge" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};
