import { Anchor } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { LO } from "lib/luckyOrange";
import { CarbonmarkPaymentMethod, Listing } from "lib/types/carbonmark.types";
import { validateIcrAmount } from "lib/validateIcrAmount";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  listing: Listing;
  values: null | FormValues;
  balance: string | null;
};

export const PurchaseInputs: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, clearErrors } =
    useFormContext<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    LO.track("Purchase: Continue Clicked");
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

        <div className={styles.labelWithInput}>
          <div className={styles.amountLabel}>
            <Text>{t`Purchase amount (tonnes):`}</Text>
            <Text t="body3">
              <Trans>Available: {Number(props.listing.leftToSell)}</Trans>
            </Text>
          </div>

          <InputField
            id="amount"
            inputProps={{
              placeholder: t`Tonnes`,
              type: "number",
              min: 1,
              max: Number(props.listing.leftToSell),
              ...register("amount", {
                onChange: () => clearErrors("price"),
                required: {
                  value: true,
                  message: t`Amount is required`,
                },
                min: {
                  value: 1,
                  message: t`The minimum amount to buy is 1 Tonne`,
                },
                max: {
                  value: Number(props.listing.leftToSell),
                  message: t`Available supply exceeded`,
                },
                validate: {
                  isWholeNumber: (value) =>
                    validateIcrAmount(value, props.listing.project.id),
                },
              }),
            }}
            label={t`How many tonnes of carbon do you want to buy?`}
            errorMessage={formState.errors.amount?.message}
            hideLabel
          />
        </div>

        <div className={styles.labelWithInput}>
          <div className={styles.paymentLabel}>
            <Text>{t`Pay with:`}</Text>
            {!!props.balance && (
              <Text t="body3">
                {t`Balance: ${formatToPrice(props.balance, locale)}`}
              </Text>
            )}
          </div>

          <Dropdown
            name="paymentMethod"
            initial={carbonmarkPaymentMethodMap["usdc"].id}
            className={styles.paymentDropdown}
            aria-label={t`Toggle payment method`}
            renderLabel={(selected) => (
              <div className={styles.paymentDropDownHeader}>
                <Image
                  className="icon"
                  src={
                    carbonmarkPaymentMethodMap[
                      selected.id as CarbonmarkPaymentMethod
                    ].icon
                  }
                  width={28}
                  height={28}
                  alt={
                    carbonmarkPaymentMethodMap[
                      selected.id as CarbonmarkPaymentMethod
                    ].id
                  }
                />{" "}
                {selected.label}
              </div>
            )}
            control={control}
            options={Object.values(carbonmarkPaymentMethodMap).map((val) => ({
              id: val.id,
              label: val.label,
              value: val.id,
              icon: val.icon,
              disabled: val.disabled,
            }))}
          />
          <div className={styles.paymentHelp}>
            <HelpOutline className={styles.helpIcon} />
            <div className={styles.paymentText}>
              <Text t="body3">
                <Trans>
                  Currently, Carbonmark only accepts Polygon USDC payments.{" "}
                  <Anchor href="/blog/how-to-get-usdc-or-matic">
                    Learn how to acquire USDC on Polygon.
                  </Anchor>
                </Trans>
              </Text>
            </div>
          </div>
        </div>
      </div>
      <InputField
        id="price"
        inputProps={{
          type: "hidden",
          ...register("price", {
            required: {
              value: true,
              message: t`Price is required`,
            },
            max: {
              value: Number(props.balance || "0"),
              message: t`You exceeded your available amount of tokens`,
            },
          }),
        }}
        label={"Price"}
        hideLabel
      />
    </form>
  );
};
