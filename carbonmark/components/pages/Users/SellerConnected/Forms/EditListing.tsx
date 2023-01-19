import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Listing } from "@klimadao/lib/types/carbonmark";
import { formatUnits } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { InputField } from "components/shared/Form/InputField";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as styles from "./styles";

export type FormValues = {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  batches?: string;
  batchPrices?: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  listing: Listing;
  values: null | FormValues;
  assetBalance: string;
};

export const EditListing: FC<Props> = (props) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      tokenAddress: props.listing.tokenAddress,
      totalAmountToSell: formatUnits(props.listing.leftToSell),
      singleUnitPrice: formatUnits(props.listing.singleUnitPrice),
      ...props.values,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="caption">
          <Trans id="user.listing.edit.project.label">Project</Trans>
        </Text>
        <Text t="caption" className={styles.editLabelProjectName}>
          {props.listing.project.name}
        </Text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <InputField
            id="tokenAddress"
            inputProps={{
              type: "hidden",
              ...register("tokenAddress"),
            }}
            label={"token address"}
            hideLabel
          />
          <InputField
            id="quantity"
            inputProps={{
              placeholder: t({
                id: "user.listing.edit.input.quantity.placeholder",
                message: "How many do you want to sell",
              }),
              type: "number",
              ...register("totalAmountToSell", {
                required: {
                  value: true,
                  message: t({
                    id: "user.listing.edit.input.quantity.required",
                    message: "Quantity is required",
                  }),
                },
                min: {
                  value: 1,
                  message: t({
                    id: "user.listing.edit.input.quantity.minimum",
                    message: "The minimum quantity to sell is 1 Tonne",
                  }),
                },
                max: {
                  value: Number(props.assetBalance),
                  message: t({
                    id: "user.listing.edit.input.quantity.maxAmount",
                    message: "You exceeded your available quantity",
                  }),
                },
              }),
            }}
            label={t({
              id: "user.edit.form.edit.quantity.label",
              message: "Quantity",
            })}
            errorMessage={formState.errors.totalAmountToSell?.message}
          />
          <Text t="badge" className={styles.availableAmount}>
            Available: {props.assetBalance}
          </Text>
          <InputField
            id="price"
            inputProps={{
              placeholder: t({
                id: "user.edit.form.edit.price.placeholder",
                message: "USDC per ton",
              }),
              type: "number",
              ...register("singleUnitPrice", {
                required: true,
              }),
            }}
            label={t({
              id: "user.edit.edit.input.price.label",
              message: "Price",
            })}
            errorMessage={
              formState.errors.singleUnitPrice && "Price is required"
            }
          />

          <ButtonPrimary
            label={
              <Trans id="profile.editListing_modal.submit">
                Update Listing
              </Trans>
            }
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
          />
        </div>
      </form>
    </div>
  );
};
