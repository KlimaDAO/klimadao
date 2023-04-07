import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { MINIMUM_TONNE_PRICE } from "lib/constants";
import { AssetForListing } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ProjectTokenDropDown } from "./ProjectTokenDropDown";
import * as styles from "./styles";

export type FormValues = {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  tokenType: "1" | "2";
  batches?: string;
  batchPrices?: string;
};

type Props = {
  assets: AssetForListing[];
  onSubmit: (values: FormValues) => void;
  values: null | FormValues;
};

const defaultValues = {
  tokenAddress: "",
  totalAmountToSell: "",
  singleUnitPrice: "",
  tokenType: "",
};

export const CreateListingForm: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, setValue } =
    useForm<FormValues>({
      defaultValues: {
        ...defaultValues,
        ...props.values,
        tokenAddress:
          props.values?.tokenAddress || props.assets[0].tokenAddress,
        tokenType: props.values?.tokenType || props.assets[0].tokenType,
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
        <Text t="body1">
          <Trans id="user.listing.form.input.select_project.label">
            Select Project:
          </Trans>
        </Text>
        <ProjectTokenDropDown
          onTokenSelect={(asset) => {
            setValue("tokenAddress", asset.tokenAddress);
            setValue("tokenType", asset.tokenType);
          }}
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
            id="tokenType"
            inputProps={{
              type: "hidden",
              ...register("tokenType"),
            }}
            label={"Token Type"}
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
          <Text t="body3" className={styles.availableAmount}>
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
                pattern: {
                  // https://stackoverflow.com/questions/354044/what-is-the-best-u-s-currency-regex#:~:text=Number%3A%20Currency%20amount%20(cents%20optional)%20Optional%20thousands%20separators%3B%20optional%20two%2Ddigit%20fraction
                  value: /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
                  message: `Enter a complete price to the nearest cent e.g. "1.23", "0.10"`,
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
