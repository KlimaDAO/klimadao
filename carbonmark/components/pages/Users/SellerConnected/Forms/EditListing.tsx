import {
  formatTonnes,
  formatUnits,
  getTokenDecimals,
} from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { MINIMUM_TONNE_PRICE } from "lib/constants";
import { Listing } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as styles from "./styles";

export type FormValues = {
  tokenAddress: string;
  newQuantity: string;
  newSingleUnitPrice: string;
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

/**
 * list of editable listings to show on /profile
 * */
export const EditListing: FC<Props> = (props) => {
  const router = useRouter();
  const locale = router.locale || "en";

  const listedQuantity = formatTonnes({
    amount: formatUnits(props.listing.leftToSell),
    locale,
  });
  const totalAvailableQuantity = formatTonnes({
    amount: (Number(props.assetBalance) + Number(listedQuantity)).toString(),
    locale,
  });

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      tokenAddress: props.listing.tokenAddress,
      newQuantity: formatUnits(props.listing.leftToSell),
      newSingleUnitPrice: formatUnits(
        props.listing.singleUnitPrice,
        getTokenDecimals("usdc")
      ),
      ...props.values,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="body1">
          <Trans id="user.listing.edit.project.label">Project</Trans>
        </Text>
        <Text t="body1" className={styles.editLabelProjectName}>
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
            label={t`New Quantity`}
            inputProps={{
              placeholder: t`Total quantity to list for sale`,
              type: "number",
              ...register("newQuantity", {
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
                    message: "The minimum quantity to sell is 1 tonne",
                  }),
                },
                max: {
                  value: Number(totalAvailableQuantity),
                  message: t`Available balance exceeded`,
                },
              }),
            }}
            errorMessage={formState.errors.newQuantity?.message}
          />
          <Text t="body3" className={styles.availableAmount}>
            <Trans>
              Quantity listed: {listedQuantity}, Quantity unlisted:{" "}
              {props.assetBalance}, Total available: {totalAvailableQuantity}
            </Trans>
          </Text>
          <InputField
            id="price"
            label={t`New Unit Price (USDC)`}
            inputProps={{
              placeholder: t({
                id: "user.edit.form.edit.price.placeholder",
                message: "USDC per ton",
              }),
              type: "number",
              ...register("newSingleUnitPrice", {
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
            errorMessage={formState.errors.newSingleUnitPrice?.message}
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
