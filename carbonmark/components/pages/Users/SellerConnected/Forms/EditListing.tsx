import { formatTonnes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Text } from "components/Text";
import { InputField } from "components/shared/Form/InputField";
import { MINIMUM_TONNE_PRICE } from "lib/constants";
import { Listing } from "lib/types/carbonmark.types";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Badge } from "../../Badge";
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
  listableBalance: number;
};

/**
 * list of editable listings to show on /profile
 * */
export const EditListing: FC<Props> = (props) => {
  const router = useRouter();
  const locale = router.locale || "en";

  const listedQuantity = formatTonnes({
    amount: props.listing.leftToSell,
    locale,
  });
  const totalAvailableQuantity = formatTonnes({
    amount: props.listableBalance.toString(),
    locale,
  });

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      tokenAddress: props.listing.tokenAddress,
      newQuantity: props.listing.leftToSell,
      newSingleUnitPrice: props.listing.singleUnitPrice,
      ...props.values,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  const unlistedQuantity =
    props.listableBalance - Number(props.listing.leftToSell);

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="body1">
          <Trans>Asset</Trans>
        </Text>
        <Text className={styles.editLabelProjectName}>
          {props.listing.project.name || props.listing.project.id}
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
              {unlistedQuantity}, Total available: {totalAvailableQuantity}
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
                  value: MINIMUM_TONNE_PRICE,
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

          {/* @todo Makka - only hardcoded temporarily until data is available from api */}
          <div className={styles.expiration}>
            <Text t="body1">
              <Trans>Expiration</Trans>
            </Text>
            <div>
              <Text t="body1">90 days (12-12-2024)</Text>
              <Badge type="Invalid" />
            </div>
          </div>

          <ButtonPrimary
            label={<Trans>Update listing</Trans>}
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
          />
        </div>
      </form>
    </div>
  );
};
