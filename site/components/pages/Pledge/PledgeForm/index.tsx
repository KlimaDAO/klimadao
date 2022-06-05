import React, { FC, useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import RemoveIcon from "@mui/icons-material/Remove";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  SubmitHandler,
} from "react-hook-form";

import { InputField, TextareaField } from "components/Form";
import { useWeb3 } from "hooks/useWeb3/web3context";

import {
  editPledgeSignature,
  formSchema,
  putPledge,
  pledgeFormAdapter,
} from "../lib";
import { Pledge, PledgeFormValues } from "../types";
import * as styles from "./styles";

type TotalFootprintProps = {
  control: Control<PledgeFormValues>;
  setValue: (field: "footprint", value: number) => void;
};

const TotalFootprint = ({ control, setValue }: TotalFootprintProps) => {
  const categories = useWatch({ name: "categories", control });

  const totalFootprint: number = categories.reduce(
    (acc, current) => Number(acc) + Number(current.quantity || 0),
    0
  );
  setValue("footprint", totalFootprint);

  return <Text t="h4">Total Footprint: {totalFootprint}</Text>;
};

type Props = {
  pageAddress: string;
  pledge: Pledge;
  onFormSubmit: (data: Pledge) => void;
};

export const PledgeForm: FC<Props> = (props) => {
  const [serverError, setServerError] = useState(false);
  const { signer } = useWeb3();
  const { control, register, handleSubmit, formState, reset, setValue } =
    useForm<PledgeFormValues>({
      mode: "onChange",
      defaultValues: pledgeFormAdapter(props.pledge),
      resolver: yupResolver(formSchema),
    });
  const { isDirty, isValid } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "categories",
    control,
  });

  const onSubmit: SubmitHandler<PledgeFormValues> = async (
    values: PledgeFormValues
  ) => {
    try {
      if (!signer) return;
      const signature = await signer.signMessage(
        editPledgeSignature(values.nonce)
      );

      const response = await putPledge({
        pageAddress: props.pageAddress,
        pledge: values,
        signature,
      });
      const data = await response.json();

      if (data.pledge) {
        props.onFormSubmit(data.pledge);
        reset(pledgeFormAdapter(data.pledge));
        setServerError(false);
      } else {
        setServerError(true);
      }
    } catch (error) {
      console.log(error);
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

      <div className={styles.categories_section}>
        <Text t="caption">Footprint</Text>

        {fields.length === 0 && (
          <Text t="caption" style={{ textAlign: "center", marginTop: "1rem" }}>
            Add a category and start calculating your carbon footprint
          </Text>
        )}

        <div className={styles.categories}>
          {fields.map((field, index) => (
            <div className={styles.categoryRow} key={field.id}>
              <div className={styles.categoryRow_inputs}>
                <InputField
                  label="Name"
                  hideLabel
                  placeholder="Category name"
                  type="text"
                  errors={formState.errors.categories?.[index]?.name}
                  {...register(`categories.${index}.name` as const)}
                />
                <InputField
                  label="Quantity"
                  hideLabel
                  placeholder="Carbon tonnes"
                  type="number"
                  errors={formState.errors.categories?.[index]?.quantity}
                  {...register(`categories.${index}.quantity` as const)}
                />
              </div>

              <ButtonPrimary
                variant="icon"
                className={styles.categoryRow_removeButton}
                label={<RemoveIcon fontSize="large" />}
                onClick={() => remove(index)}
              >
                <RemoveIcon fontSize="medium" />
              </ButtonPrimary>
            </div>
          ))}
        </div>

        {fields.length < 10 && (
          <div className={styles.categories_appendRow}>
            <ButtonPrimary
              className={styles.categories_appendButton}
              variant="gray"
              label="Add category"
              onClick={() => append({ name: "", quantity: 0 })}
            />
          </div>
        )}
      </div>

      <InputField
        label="Total footprint"
        hideLabel
        type="hidden"
        errors={formState.errors.footprint}
        {...register("footprint")}
      />

      <TotalFootprint control={control} setValue={setValue} />

      {/* better to use an input type=submit */}
      <ButtonPrimary
        disabled={!isDirty || !isValid}
        label="Save pledge"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
