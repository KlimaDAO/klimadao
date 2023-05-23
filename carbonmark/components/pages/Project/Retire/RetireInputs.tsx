import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { Text } from "components/Text";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import {
  CarbonmarkPaymentMethod,
  Price as PriceType,
} from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  price: PriceType;
  values: null | FormValues;
  balance: string | null;
};

export const RetireInputs: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, clearErrors } =
    useFormContext<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputsContainer}>
        <Text>
          You are retiring carbon credits from this project. The information
          below will be broadcasted publicly and can be used to verify your
          environmental claim. This transaction is permanent; the information
          cannot be edited once your transaction is complete so be sure to
          confirm everything is correct before continuing.
        </Text>
        <Text>
          You can retire these credits for yourself or on behalf of another
          person or organization.
        </Text>

        <InputField
          id="projectAddress"
          inputProps={{
            type: "hidden",
            ...register("projectAddress"),
          }}
          label={"Project Address"}
          hideLabel
        />

        <div className={styles.labelWithInput}>
          <div className={styles.quantityLabel}>
            <Text>{t`How many tonnes of carbon would you like to retire?`}</Text>
            <Text t="body3">
              <Trans>Available: {props.price.leftToSell}</Trans>
            </Text>
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
                    message: t`Quantity is required`,
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
        </div>

        <div className={styles.labelWithInput}>
          <InputField
            id="beneficiaryName"
            inputProps={{
              placeholder: t`Beneficiary name`,
              ...register("beneficiaryName", {
                required: {
                  value: true,
                  message: t`Beneficiary Name is required`,
                },
              }),
            }}
            label={t`Who will this retirement be credited to?`}
            errorMessage={formState.errors.beneficiaryName?.message}
          />
          <InputField
            id="beneficiaryAddress"
            inputProps={{
              placeholder: t`Beneficiary wallet address (optional)`,
              ...register("beneficiaryAddress"),
            }}
            label={t`Beneficiary Address`}
            hideLabel
          />
          <Text t="body3">{t`Defaults to the connected wallet address`}</Text>
        </div>

        <div className={styles.labelWithInput}>
          <TextareaField
            id="retirementMessage"
            textareaProps={{
              placeholder: t`Describe the purpose of this retirement`,
              ...register("retirementMessage"),
            }}
            label={t`Retirement Message`}
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
        </div>

        <div className={styles.paymentHelp}>
          <HelpOutline className={styles.helpIcon} />
          <div className={styles.paymentText}>
            <Text t="body3">
              {t`Currently, Carbonmark only accepts Polygon USDC Payments.`}{" "}
              <Anchor href="https://www.klimadao.finance/buy">{t`Learn how
            to acquire USDC on Polygon.`}</Anchor>
            </Text>
            <Text t="body3">
              {t`If you’d like to retire this project with another form of cryptocurrency, 
            or with a credit card, you can do so at`}{" "}
              <Anchor href={urls.app}>app.klimadao.finance.</Anchor>
            </Text>
          </div>
        </div>
      </div>
      <InputField
        id="totalPrice"
        inputProps={{
          type: "hidden",
          ...register("totalPrice", {
            required: {
              value: true,
              message: t`totalPrice is required`,
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
    </form>
  );
};
