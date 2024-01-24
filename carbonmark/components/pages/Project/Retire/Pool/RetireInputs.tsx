import { cx } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import { safeSub, useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import GppMaybeOutlined from "@mui/icons-material/GppMaybeOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { InputField } from "components/shared/Form/InputField";
import { TextareaField } from "components/shared/Form/TextareaField";
import { isAddress } from "ethers-v6";
import {
  MINIMUM_TONNE_QUANTITY,
  MINIMUM_TONNE_QUANTITY_BANK_TRANSFER,
  urls as carbonmarkUrls,
} from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkRetirePaymentMethodMap } from "lib/getPaymentMethods";
import {
  CarbonmarkPaymentMethod,
  TokenPrice as PriceType,
} from "lib/types/carbonmark.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFormContext,
  useWatch,
} from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type Props = {
  onSubmit: (values: FormValues) => void;
  price: PriceType;
  values: null | FormValues;
  userBalance: string | null;
  fiatBalance: string | null;
  fiatMinimum: string | null;
  address?: string;
  fiatAmountError?: boolean;
  approvalValue: string;
  enabledPaymentMethods: Array<CarbonmarkPaymentMethod>;
};

const validations = (
  userBalance: string | null,
  fiatBalance: string | null,
  fiatMinimum: string | null
) => ({
  usdc: {
    quantity: {
      min: {
        value: MINIMUM_TONNE_QUANTITY,
        message: t`The minimum amount to retire is 0.001 Tonnes`,
      },
    },
    totalPrice: {
      min: {
        value: MINIMUM_TONNE_QUANTITY,
        message: t`The minimum amount to retire is 0.001 Tonnes`,
      },
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
        message: t`The minimum amount to retire is 1 Tonne`,
      },
    },
    totalPrice: {
      min: {
        value: Number(fiatMinimum || "0"),
        message: t`Credit card minimum purchase is ${formatToPrice(
          fiatMinimum || 0
        )}`,
      },
      max: {
        value: Number(fiatBalance || "2000"),
        message: t`
            At this time, Carbonmark cannot process credit card payments
            exceeding ${formatToPrice(fiatBalance || 0)}. Please adjust the
            quantity and try again later.
          `,
      },
    },
  },
  "bank-transfer": {
    quantity: {
      min: {
        value: MINIMUM_TONNE_QUANTITY_BANK_TRANSFER,
        message: t`The minimum amount to retire via bank transfer is 100 Tonnes`,
      },
    },
    totalPrice: {
      min: {
        value: MINIMUM_TONNE_QUANTITY_BANK_TRANSFER,
        message: t`The minimum amount to retire via bank transfer is 100 Tonnes`,
      },
      max: {
        value: Infinity,
        message: "",
      },
    },
  },
});

export const RetireInputs: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address, isConnected, toggleModal } = useWeb3();
  const { register, handleSubmit, formState, control, clearErrors, setValue } =
    useFormContext<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    props.onSubmit(values);
  };

  const paymentMethod = useWatch({ name: "paymentMethod", control });
  const quantity = useWatch({ name: "quantity", control });
  const totalPrice = useWatch({ name: "totalPrice", control });

  const getValidations = () =>
    validations(props.userBalance, props.fiatBalance, props.fiatMinimum)[
      paymentMethod
    ];

  const belowFiatMinimum =
    paymentMethod === "fiat" &&
    quantity !== "0" &&
    Number(props.fiatMinimum) > Number(totalPrice);

  const isFiat = paymentMethod === "fiat";
  const isBankTransfer = paymentMethod === "bank-transfer";

  const isDisabled = (item: string) =>
    item === "usdc" && !address && !isConnected;

  const exceededFiatBalance =
    isFiat && Number(props.fiatBalance) < Number(totalPrice);

  const payWithItems = Object.entries(carbonmarkRetirePaymentMethodMap);

  /** Credit card fee string to display in the price card for fiat payments */
  const calcCreditCardFee = (): string => {
    if (!isFiat || !Number(totalPrice)) return "$0.00";
    const priceWithoutFees =
      Number(quantity) * Number(props.price.singleUnitPrice);
    const fee = Number(safeSub(totalPrice, priceWithoutFees.toString()));
    if (fee <= 0) return "$0.00";
    return formatToPrice(fee.toString(), locale, isFiat);
  };

  useEffect(() => {
    // remove all errors when changed
    clearErrors();
    // When the user choose to pay by credit card,
    // we convert the existing quantity to a whole number (1.123 -> 2)
    if (isFiat && !!quantity && !props.fiatAmountError) {
      setValue("quantity", Math.ceil(Number(quantity)).toString());
    }

    // If the payment method changes to bank-transfer
    // set the minimum allowed quantity as the default
    if (isBankTransfer && !!quantity) {
      setValue(
        "quantity",
        Math.ceil(MINIMUM_TONNE_QUANTITY_BANK_TRANSFER).toString()
      );
    }

    // clear quantity when error
    if (isFiat && !!props.fiatAmountError) {
      setValue("quantity", "");
    }
  }, [paymentMethod, props.fiatAmountError]);

  const exceededBalance =
    paymentMethod === "usdc" &&
    !!props.userBalance &&
    Number(props.userBalance) <= Number(props.approvalValue);

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
                    isFiat &&
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
          <Text>
            {t`Who will this retirement be credited to?`}{" "}
            {isFiat && <span className={styles.required}>*</span>}
          </Text>
          <InputField
            id="beneficiaryName"
            inputProps={{
              placeholder: t`Beneficiary name`,
              ...register("beneficiaryName", {
                required: {
                  value: isFiat,
                  message: t`Required when proceeding with Credit Card`,
                },
              }),
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
                required: {
                  value: isFiat && !props.address,
                  message: t`You either need to provide a beneficiary address or login with your browser wallet.`,
                },
                validate: {
                  isAddress: (v) =>
                    v === "" || // no beneficiary, fallback to default address
                    isAddress(v) || // allow polygon addresses only
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
          <Text>
            {t`Retirement Message`}{" "}
            {isFiat && <span className={styles.required}>*</span>}
          </Text>
          <TextareaField
            id="retirementMessage"
            textareaProps={{
              placeholder: t`Describe the purpose of this retirement`,
              ...register("retirementMessage", {
                required: {
                  value: isFiat,
                  message: t`Required when proceeding with Credit Card`,
                },
              }),
            }}
            label={t`Retirement Message`}
            hideLabel
            errorMessage={formState.errors.retirementMessage?.message}
          />
        </div>
        <div className={styles.labelWithInput}>
          <div className={styles.paymentLabel}>
            <Text>
              {t`Pay with:`} <span className={styles.required}>*</span>
            </Text>
            {!!props.userBalance && !isFiat && (
              <Text t="body3">
                {t`Balance: ${formatToPrice(props.userBalance, locale)}`}
              </Text>
            )}
            {isFiat && props.fiatBalance && (
              <Text t="body3">{t`${formatToPrice(
                props.fiatBalance,
                locale
              )} maximum for credit cards`}</Text>
            )}
          </div>
          {payWithItems?.map(([item, value]) => (
            <Controller
              control={control}
              name="paymentMethod"
              key={`payment-method-${item}`}
              render={({ field }) => (
                <>
                  <button
                    type="button"
                    disabled={!props.enabledPaymentMethods.includes(value.id)}
                    aria-label="Payment Method"
                    onClick={() => {
                      if (value.id === "usdc" && !isConnected && !address) {
                        toggleModal();
                      }
                      setValue(
                        "paymentMethod",
                        value.id as CarbonmarkPaymentMethod
                      );
                    }}
                    className={cx(styles.paymentMethod, {
                      error:
                        exceededFiatBalance ||
                        belowFiatMinimum ||
                        exceededBalance,
                      selected: item === field.value,
                    })}
                  >
                    <div>
                      <Image
                        width={28}
                        height={28}
                        className="icon"
                        src={value.icon}
                        alt={value.label}
                      />
                      {item === "fiat" || item === "bank-transfer" ? (
                        <>{value.label}</>
                      ) : (
                        <>
                          {isConnected && address ? (
                            value.label
                          ) : (
                            <Trans>Login to pay with USDC</Trans>
                          )}
                        </>
                      )}
                    </div>
                    <Text
                      t="body3"
                      className={cx({ selected: item === field.value })}
                    >
                      {item === "fiat" && (
                        <>
                          <Trans>Processing Fee:</Trans>
                          <strong>{calcCreditCardFee()}</strong>
                        </>
                      )}
                      {item === "usdc" && !isDisabled(item) && (
                        <>
                          <Trans>Balance</Trans>
                          <strong>
                            {formatToPrice(props.userBalance!, locale)}
                          </strong>
                        </>
                      )}
                    </Text>
                  </button>
                </>
              )}
            />
          ))}

          {exceededBalance && (
            <Text t="body1" className={cx(styles.errorMessagePrice, "balance")}>
              <Trans>
                Your balance must equal at least 1% more than the cost of the
                transaction.
              </Trans>
            </Text>
          )}
        </div>

        {belowFiatMinimum && (
          <Text t="body1" className={styles.errorMessagePrice}>
            {getValidations().totalPrice.min.message}
          </Text>
        )}

        {exceededFiatBalance && (
          <Text t="body1" className={styles.errorMessagePrice}>
            {getValidations().totalPrice.max.message}
          </Text>
        )}
        <div className={styles.paymentHelp}>
          <HelpOutline className={styles.helpIcon} />
          <div className={styles.paymentText}>
            <Text t="body3">
              <Trans>
                Currently, Carbonmark only accepts Polygon USDC or Credit Card
                Payments.{" "}
                <Anchor
                  href={`${carbonmarkUrls.docs}/get-started/how-to-get-usdc-or-matic`}
                >
                  Learn how to acquire USDC on Polygon.
                </Anchor>
              </Trans>
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
            validate: {
              moreThanZero: (v) => Number(v) > 0 || t`Total Cost is required`,
              lessThanMax: (v) =>
                parseInt(v) < getValidations().totalPrice.max.value ||
                getValidations().totalPrice.max.message,
            },
          }),
        }}
        label={"Total Price"}
        hideLabel
      />
    </form>
  );
};
