import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { MINIMUM_TONNE_PRICE } from "lib/constants";
import { Asset } from "lib/types/carbonmark.types";
import { validateIcrAmount } from "lib/validateIcrAmount";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectTokenDropDown } from "./ProjectTokenDropDown";
import * as styles from "./styles";

export type FormValues = {
  amount: string;
  unitPrice: string;
  tokenAddress: string;
  tokenId?: string;
};

type Props = {
  assets: Asset[];
  onSubmit: (values: FormValues) => void;
  values: null | FormValues;
};

const defaultValues: FormValues = {
  tokenAddress: "",
  tokenId: "",
  amount: "",
  unitPrice: "",
};

export const CreateListingForm: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<FormValues>({
      defaultValues: {
        ...defaultValues,
        ...props.values,
        tokenAddress:
          props.values?.tokenAddress.toLowerCase() ||
          props.assets[0].token.id.toLowerCase(),
        tokenId: props.values?.tokenId || props.assets[0].token.tokenId,
      },
      mode: "onChange",
    });

  const selectedAddress = watch("tokenAddress");

  const selectedAsset =
    props.assets.find((t) => t.token.id.toLowerCase() === selectedAddress) ||
    props.assets[0];

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="body1">
          <Trans>Asset</Trans>
        </Text>
        <ProjectTokenDropDown
          onTokenSelect={(asset) => {
            setValue("tokenAddress", asset.token.id.toLowerCase());
            setValue("tokenId", asset.token.tokenId);
          }}
          assets={props.assets}
          selectedAsset={selectedAsset}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <InputField
            id="totalAmountToSell"
            inputProps={{
              placeholder: t`How many tonnes do you want to list for sale?`,
              type: "number",
              ...register("amount", {
                required: {
                  value: true,
                  message: t`Total Amount to Sell is required`,
                },
                min: {
                  value: 1,
                  message: t`The minimum amount to sell is 1 Tonne`,
                },
                max: {
                  value: Number(selectedAsset.amount),
                  message: t`Balance exceeded`,
                },
                validate: {
                  isWholeNumber: (value) =>
                    validateIcrAmount(value, selectedAsset.id),
                },
              }),
            }}
            label={t`Quantity`}
            errorMessage={formState.errors.amount?.message}
          />
          <Text t="body3" className={styles.availableAmount}>
            <Trans>Available to list: {selectedAsset.amount}</Trans>
          </Text>
          <InputField
            id="singleUnitPrice"
            inputProps={{
              placeholder: t`USDC per tonne`,
              type: "number",
              ...register("unitPrice", {
                required: {
                  value: true,
                  message: t`Unit price is required`,
                },
                pattern: {
                  // https://stackoverflow.com/questions/354044/what-is-the-best-u-s-currency-regex#:~:text=Number%3A%20Currency%20amount%20(cents%20optional)%20Optional%20thousands%20separators%3B%20optional%20two%2Ddigit%20fraction
                  value: /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
                  message: `Enter a complete price to the nearest cent e.g. "1.23", "0.10"`,
                },
                min: {
                  value: 0.1,
                  message: t`The minimum price per tonne is ${MINIMUM_TONNE_PRICE.toLocaleString(
                    locale
                  )}`,
                },
              }),
            }}
            label={t`Single unit price`}
            errorMessage={formState.errors.unitPrice?.message}
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
