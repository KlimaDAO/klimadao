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
                min: 0.001,
                max: Number(props.price.supply),
                ...register("quantity", {
                  onChange: () => clearErrors("totalPrice"),
                  required: {
                    value: true,
                    message: t`Quantity is required`,
                  },
                  min: {
                    value: 0.001,
                    message: t`The minimum amount to retire is 0.001 Tonnes`,
                  },
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
              {t`To retire this project using a different form of payment,`}{" "}
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
