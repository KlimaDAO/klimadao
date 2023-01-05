import React, { FC } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { formatUnits } from "@klimadao/lib/utils";
import { ButtonPrimary, Text, Spinner } from "@klimadao/lib/components";
import { InputField } from "components/Form";
import { HighlightValue } from "components/pages/Marketplace/shared/Transaction/HighlightValue";
import { formatToPrice } from "components/pages/Marketplace/lib/formatNumbers";
import { Listing } from "@klimadao/lib/types/marketplace";
import { marketplaceTokenInfoMap } from "components/pages/Marketplace/lib/getTokenInfo";

import * as styles from "./styles";

const MARKETPLACE_FEE = 0.03; // 3%

export type FormValues = {
  listingId: string;
  amount: string;
  price: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  listing: Listing;
  values: null | FormValues;
  isLoading: boolean;
};

export const PurchaseForm: FC<Props> = (props) => {
  const singleUnitPrice = formatUnits(props.listing.singleUnitPrice);

  const { register, handleSubmit, formState, control, setValue } =
    useForm<FormValues>({
      defaultValues: {
        listingId: props.listing.id,
        ...props.values,
      },
    });

  const amount = useWatch({ name: "amount", control });

  const price = Number(singleUnitPrice) * Number(amount);
  const totalPrice = price + price * MARKETPLACE_FEE || 0;
  setValue("price", totalPrice.toString());

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputsContainer}>
        <InputField
          id="listingId"
          inputProps={{
            type: "hidden",
            ...register("listingId"),
          }}
          label={"listing ID"}
          hideLabel
        />
        <InputField
          id="amount"
          inputProps={{
            placeholder: t({
              id: "marketplace.purchase.input.amount.placeholder",
              message: "Tonnes",
            }),
            type: "number",
            ...register("amount", {
              required: {
                value: true,
                message: t({
                  id: "marketplace.purchase.input.amount.required",
                  message: "Amount is required",
                }),
              },
              min: {
                value: 1,
                message: t({
                  id: "marketplace.purchase.input.amount.minimum",
                  message: "The minimum amount to buy is 1 Tonne",
                }),
              },
              max: {
                value: Number(formatUnits(props.listing.leftToSell)),
                message: t({
                  id: "marketplace.purchase.input.amount.maxAmount",
                  message: "You exceeded the available amount of tonnes",
                }),
              },
            }),
          }}
          label={t({
            id: "marketplace.purchase.input.amount.label",
            message: "How many tonnes of carbon do you want to buy?",
          })}
          errorMessage={formState.errors.amount?.message}
        />
        <Text t="badge" className={styles.availableAmount}>
          Available: {formatUnits(props.listing.leftToSell)}
        </Text>
        <InputField
          id="price"
          inputProps={{
            type: "hidden",
            ...register("price"),
          }}
          label={"Price"}
          hideLabel
        />
        <HighlightValue
          label={t({
            id: "marketplace.purchase.input.cost.label",
            message: "Cost incl. 3% fee",
          })}
          value={formatToPrice(totalPrice)}
          icon={marketplaceTokenInfoMap["usdc"].icon}
        />

        <ButtonPrimary
          label={
            props.isLoading ? (
              <Spinner />
            ) : (
              <Trans id="marketplace.purchase.button.continue">Continue</Trans>
            )
          }
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};
