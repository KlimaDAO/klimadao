import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { LO } from "lib/luckyOrange";
import { CarbonmarkPaymentMethod, Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  price: Price;
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
          id="totalPrice"
          inputProps={{
            type: "hidden",
            ...register("totalPrice", {
              required: {
                value: true,
                message: t`Could not calculate Total Cost`,
              },
              max: {
                value: Number(props.balance || "0"),
                message: t`You exceeded your available amount of tokens`,
              },
            }),
          }}
          label={"Total Price"}
          hideLabel
        />

        <div className={styles.labelWithInput}>
          <div className={styles.amountLabel}>
            <Text>{t`Purchase amount (tonnes):`}</Text>
            <Text t="body3">
              <Trans>
                Available: {formatToTonnes(props.price.leftToSell, locale, 2)}
              </Trans>
            </Text>
          </div>

          <InputField
            id="quantity"
            inputProps={{
              placeholder: t`Tonnes`,
              type: "number",
              min: 1,
              max: Number(props.price.leftToSell),
              ...register("quantity", {
                onChange: () => clearErrors("totalPrice"),
                required: {
                  value: true,
                  message: t`Amount is required`,
                },
                min: {
                  value: 1,
                  message: t`The minimum amount to buy is 1 Tonne`,
                },
                max: {
                  value: Number(props.price.leftToSell),
                  message: t`Available supply exceeded`,
                },
              }),
            }}
            label={t`How many tonnes of carbon do you want to buy?`}
            errorMessage={formState.errors.quantity?.message}
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
                {t`To purchase this project using a different form of payment,`}{" "}
                <Anchor href={urls.app}>click here</Anchor>.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
