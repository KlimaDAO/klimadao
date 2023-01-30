import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Asset } from "@klimadao/lib/types/carbonmark";
import { t, Trans } from "@lingui/macro";
import { InputField } from "components/shared/Form/InputField";
import { MINIMUM_TONNE_PRICE } from "lib/constants";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ProjectTokenDropDown } from "../ProjectTokenDropDown";
import * as styles from "./styles";
export type FormValues = {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  batches?: string;
  batchPrices?: string;
};

type Props = {
  assets: Asset[];
  onSubmit: (values: FormValues) => void;
  values: null | FormValues;
};

const defaultValues = {
  tokenAddress: "",
  totalAmountToSell: "",
  singleUnitPrice: "",
};

export const AddListing: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, setValue } =
    useForm<FormValues>({
      defaultValues: {
        ...defaultValues,
        ...props.values,
        tokenAddress:
          props.values?.tokenAddress || props.assets[0].tokenAddress,
      },
    });

  const selectedTokenAddress = useWatch({
    name: "tokenAddress",
    control,
  });
  const selectedAsset =
    props.assets.find((t) => t.tokenAddress === selectedTokenAddress) ||
    props.assets[0];

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="caption">
          <Trans id="user.listing.form.input.select_project.label">
            Select Project:
          </Trans>
        </Text>
        <ProjectTokenDropDown
          setValue={setValue}
          assets={props.assets}
          selectedAsset={selectedAsset}
        />
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
            id="totalAmountToSell"
            inputProps={{
              placeholder: t({
                id: "user.listing.form.input.totalAmountToSell.placeholder",
                message: "How many do you want to sell",
              }),
              type: "number",
              ...register("totalAmountToSell", {
                required: {
                  value: true,
                  message: t({
                    id: "user.listing.form.input.totalAmountToSell.required",
                    message: "Total Amount to Sell is required",
                  }),
                },
                min: {
                  value: 1,
                  message: t({
                    id: "user.listing.form.input.totalAmountToSell.minimum",
                    message: "The minimum amount to sell is 1 Tonne",
                  }),
                },
                max: {
                  value: Number(selectedAsset.balance),
                  message: t({
                    id: "user.listing.form.input.totalAmountToSell.maxAmount",
                    message: "You exceeded your available amount",
                  }),
                },
              }),
            }}
            label={t({
              id: "user.edit.form.input.totalAmountToSell.label",
              message: `Total Amount`,
            })}
            errorMessage={formState.errors.totalAmountToSell?.message}
          />
          <Text t="badge" className={styles.availableAmount}>
            Available: {selectedAsset.balance}
          </Text>
          <InputField
            id="singleUnitPrice"
            inputProps={{
              placeholder: t({
                id: "user.edit.form.input.singleUnitPrice.placeholder",
                message: "USDC per ton",
              }),
              type: "number",
              ...register("singleUnitPrice", {
                required: {
                  value: true,
                  message: t({
                    id: "user.listing.form.input.singleUnitPrice.required",
                    message: "Single Price is required",
                  }),
                },
                min: {
                  value: 0.1,
                  message: t({
                    id: "user.listing.form.input.singleUnitPrice.minimum",
                    message: `The minimum price per tonne is ${MINIMUM_TONNE_PRICE.toLocaleString(
                      locale
                    )}`,
                  }),
                },
              }),
            }}
            label={t({
              id: "user.edit.form.input.singleUnitPrice.label",
              message: "Single Unit Price",
            })}
            errorMessage={formState.errors.singleUnitPrice?.message}
          />

          <ButtonPrimary
            label={
              <Trans id="profile.addListing_modal.submit">Create Listing</Trans>
            }
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};
