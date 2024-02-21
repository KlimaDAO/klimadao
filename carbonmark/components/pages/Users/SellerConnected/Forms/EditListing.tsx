import { formatTonnes, safeSub } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Text } from "components/Text";
import { InputField } from "components/shared/Form/InputField";
import { DEFAULT_EXPIRATION_DAYS, MINIMUM_TONNE_PRICE } from "lib/constants";
import { Listing } from "lib/types/carbonmark.types";
import { getExpirationTimestamp } from "lib/utils/listings.utils";
import { validateIcrAmount } from "lib/validateIcrAmount";
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
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  const unlistedQuantity = safeSub(
    props.listableBalance.toString(),
    props.listing.leftToSell
  );

  const isExpired =
    Number(props.listing.expiration) <= Math.floor(Date.now() / 1000);

  const isInvalid = false; // TODO https://github.com/KlimaDAO/klimadao/issues/1586

  const expirationTimestamp = getExpirationTimestamp(DEFAULT_EXPIRATION_DAYS);

  const expirationDatestring = new Date(
    Math.floor(Number(expirationTimestamp) * 1000)
  ).toLocaleDateString(locale);

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsContainer}>
        <Text t="body1">
          <Trans>Asset</Trans>
        </Text>
        <Text className={styles.editLabelProjectName}>
          {props.listing.project.name} ({props.listing.project.id})
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
                  message: t`Quantity is required`,
                },
                min: {
                  value: 1,
                  message: t`The minimum quantity to sell is 1 tonne`,
                },
                max: {
                  value: Number(totalAvailableQuantity),
                  message: t`Available balance exceeded`,
                },
                validate: {
                  isWholeNumber: (value) =>
                    validateIcrAmount(value, props.listing.project.id),
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
            label={t`New Unit Price (USDC.e)`}
            inputProps={{
              placeholder: t`USDC.e per ton`,
              type: "number",
              ...register("newSingleUnitPrice", {
                required: {
                  value: true,
                  message: t`Single Price is required`,
                },
                min: {
                  value: MINIMUM_TONNE_PRICE,
                  message: t`The minimum price per tonne is ${MINIMUM_TONNE_PRICE.toLocaleString(
                    locale
                  )}`,
                },
                pattern: {
                  value: /^\d+(\.\d{1,6})?$/,
                  message: `The maximum decimals allowed is 6`,
                },
              }),
            }}
            errorMessage={formState.errors.newSingleUnitPrice?.message}
          />

          <div className={styles.expiration}>
            <Text t="body1">
              <Trans>Expiration</Trans>
            </Text>
            <div>
              <Text t="body1">
                <Trans>
                  {DEFAULT_EXPIRATION_DAYS} days ({expirationDatestring})
                </Trans>
              </Text>
              {isInvalid && <Badge type="Invalid" />}
              {isExpired && <Badge type="Expired" />}
            </div>
          </div>

          <ButtonPrimary
            label={<Trans>Update listing</Trans>}
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty && !isExpired}
          />
        </div>
      </form>
    </div>
  );
};
