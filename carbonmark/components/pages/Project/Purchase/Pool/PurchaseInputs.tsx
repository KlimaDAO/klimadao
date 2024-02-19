import { cx } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { Text } from "components/Text";
import { urls } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { LO } from "lib/luckyOrange";
import {
  CarbonmarkPaymentMethod,
  TokenPrice,
} from "lib/types/carbonmark.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  price: TokenPrice;
  values: null | FormValues;
  balance: string | null;
  approvalValue: string;
};

export const PurchaseInputs: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, clearErrors } =
    useFormContext<FormValues>();

  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    LO.track("Purchase: Continue Clicked");
    props.onSubmit(values);
  };

  const exceededBalance =
    paymentMethod !== "fiat" &&
    !!props.balance &&
    Number(props.balance) <= Number(props.approvalValue);

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
                Available: {formatToTonnes(props.price.supply, locale, 2)}
              </Trans>
            </Text>
          </div>

          <InputField
            id="quantity"
            inputProps={{
              placeholder: t`Tonnes`,
              type: "number",
              min: 1,
              max: Number(props.price.supply),
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
                  value: Number(props.price.supply),
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
            className={cx(styles.paymentDropdown, {
              error: exceededBalance,
            })}
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

          {exceededBalance && (
            <Text t="body1" className={cx(styles.errorMessagePrice, "balance")}>
              <Trans>
                Your balance must equal at least 1% more than the cost of the
                transaction.
              </Trans>
            </Text>
          )}
        </div>
        <div className={styles.paymentHelp}>
          <HelpOutline className={styles.helpIcon} />
          <div className={styles.paymentText}>
            <Text t="body3">
              <Trans>
                Currently, Carbonmark only accepts Polygon USDC.e payments.{" "}
                <Anchor
                  href={`${urls.docs}/get-started/how-to-get-usdc-or-matic`}
                >
                  Learn how to acquire USDC.e on Polygon.
                </Anchor>
              </Trans>
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
};
