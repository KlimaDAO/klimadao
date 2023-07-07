import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { Text } from "components/Text";
import { utils } from "ethers";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkRetirePaymentMethodMap } from "lib/getPaymentMethods";
import {
  CarbonmarkPaymentMethod,
  Price as PriceType,
} from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  price: PriceType;
  values: null | FormValues;
  userBalance: string | null;
  fiatBalance: string | null;
};

const validations = (
  userBalance: string | null,
  fiatBalance: string | null
) => ({
  usdc: {
    quantity: {
      min: {
        value: 0.001,
        message: t`The minimum amount to retire is 0.001 Tonnes`,
      },
    },
    totalPrice: {
      max: {
        value: Number(userBalance || "0"),
        message: t`You exceeded your available amount of tokens`,
      },
    },
  },
  fiat: {
    quantity: {
      min: {
        value: 1,
        message: t`The minimum amount to retire is 1 Tonnes`,
      },
    },
    totalPrice: {
      max: {
        value: Number(fiatBalance || "2000"),
        message: t`At this time, Carbonmark cannot process credit card payments exceeding ${formatToPrice(
          fiatBalance || 0
        )}.`,
      },
    },
  },
});

export const RetireInputs: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { register, handleSubmit, formState, control, clearErrors, setValue } =
    useFormContext<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  const paymentMethod = useWatch({ name: "paymentMethod", control });
  const getValidations = () =>
    validations(props.userBalance, props.fiatBalance)[paymentMethod];


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
        <Text>
          <span className={styles.required}>* </span> {t`Required Field`}
        </Text>

        <div className={styles.labelWithInput}>
          <div className={styles.quantityLabel}>
            <Text>
              {t`How many tonnes of carbon would you like to retire?`}{" "}
              <span className={styles.required}>*</span>
            </Text>
            <Text t="body3">
              <Trans>Available:</Trans>{" "}
              {formatToTonnes(props.price.supply, locale, 2)}
            </Text>
            <InputField
              id="quantity"
              inputProps={{
                placeholder: t`Tonnes`,
                type: "number",
                min: getValidations().quantity.min.value,
                max: Number(props.price.supply),
                ...register("quantity", {
                  onChange: (e) => {
                    clearErrors("totalPrice");

                    // Enforce whole numbers for Fiat, API throws otherwise
                    paymentMethod === "fiat" &&
                      setValue(
                        "quantity",
                        Math.ceil(Number(e.target.value)).toString()
                      );
                  },
                  required: {
                    value: true,
                    message: t`Quantity is required`,
                  },
                  min: getValidations().quantity.min,
                  max: {
                    value: Number(props.price.supply),
                    message: t`Available supply exceeded`,
                  },
                }),
              }}
              label={t`How many tonnes of carbon do you want to retire?`}
              errorMessage={formState.errors.quantity?.message}
              hideLabel
            />
          </div>
        </div>

        <div className={styles.labelWithInput}>
          <Text>{t`Who will this retirement be credited to?`}</Text>
          <InputField
            id="beneficiaryName"
            inputProps={{
              placeholder: t`Beneficiary name`,
              ...register("beneficiaryName"),
            }}
            label={t`Who will this retirement be credited to?`}
            errorMessage={formState.errors.beneficiaryName?.message}
            hideLabel
          />
          <InputField
            id="beneficiaryAddress"
            inputProps={{
              placeholder: t`Beneficiary wallet address (optional)`,
              ...register("beneficiaryAddress", {
                validate: {
                  isAddress: (v) =>
                    v === "" || // no beneficiary, fallback to default address
                    utils.isAddress(v) || // allow polygon addresses only
                    t`Not a valid polygon address`,
                },
              }),
            }}
            label={t`Beneficiary Address`}
            hideLabel
            errorMessage={formState.errors.beneficiaryAddress?.message}
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
            {!!props.userBalance && paymentMethod !== "fiat" && (
              <Text t="body3">
                {t`Balance: ${formatToPrice(props.userBalance, locale)}`}
              </Text>
            )}
            {paymentMethod === "fiat" && props.fiatBalance && (
              <Text t="body3">{t`${formatToPrice(
                props.fiatBalance,
                locale
              )} maximum for credit cards`}</Text>
            )}
          </div>

          <Dropdown
            name="paymentMethod"
            initial={carbonmarkRetirePaymentMethodMap["usdc"].id}
            className={styles.paymentDropdown}
            aria-label={t`Toggle payment method`}
            renderLabel={(selected) => (
              <div className={styles.paymentDropDownHeader}>
                <Image
                  className="icon"
                  src={
                    carbonmarkRetirePaymentMethodMap[
                      selected.id as CarbonmarkPaymentMethod
                    ].icon
                  }
                  width={28}
                  height={28}
                  alt={
                    carbonmarkRetirePaymentMethodMap[
                      selected.id as CarbonmarkPaymentMethod
                    ].id
                  }
                />{" "}
                {selected.label}
              </div>
            )}
            control={control}
            options={Object.values(carbonmarkRetirePaymentMethodMap).map(
              (val) => ({
                id: val.id,
                label: val.label,
                value: val.id,
                icon: val.icon,
                disabled: val.disabled,
              })
            )}
          />
        </div>

        <div className={styles.paymentHelp}>
          <HelpOutline className={styles.helpIcon} />
          <div className={styles.paymentText}>
            <Text t="body3">
              {t`Currently, Carbonmark only accepts Polygon USDC or Credit Card Payments. To retire this project using a different form of payment,`}{" "}
              <Anchor href={urls.app}>click here</Anchor>.
            </Text>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <GppMaybeOutlined />
          <Text t="body3">
            <Trans>
              Be careful not to include any sensitive personal information (such
              as an email address) in your retirement name or message. The
              information you enter here cannot be edited once it is submitted
              and will permanently exist on a public blockchain.
            </Trans>
          </Text>
        </div>
      </div>
      <InputField
        id="totalPrice"
        inputProps={{
          type: "hidden",
          ...register("totalPrice", {
            required: {
              value: true,
              message: t`Could not calculate Total Cost`,
            },
            max: validations(props.balance)[paymentMethod].totalPrice.max,
          }),
        }}
        label={"Total Price"}
        hideLabel
      />
    </form>
  );
};
