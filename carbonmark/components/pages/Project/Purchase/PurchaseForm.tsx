import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { formatUnits, useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Dropdown } from "components/Dropdown";
import { InputField } from "components/shared/Form/InputField";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { HighlightValue } from "components/Transaction/HighlightValue";
import { getUSDCBalance } from "lib/actions";
import { CARBONMARK_FEE } from "lib/constants";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { LO } from "lib/luckyOrange";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { CarbonmarkToken, Listing } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Control, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as styles from "./styles";

type TotalValueProps = {
  control: Control<FormValues>;
  singlePrice: string;
  setValue: (field: "price", value: string) => void;
  errorMessage?: string;
};

const TotalValue: FC<TotalValueProps> = (props) => {
  const { locale } = useRouter();
  const amount = useWatch({ name: "amount", control: props.control });
  const price = Number(props.singlePrice) * Number(amount);
  const totalPrice = price + price * CARBONMARK_FEE || 0;
  const totalPriceTrimmed = totalPrice.toFixed(getTokenDecimals("usdc")); // deal with js math overflows
  const totalPriceFormatted = parseFloat(totalPriceTrimmed).toString(); // trim trailing zeros
  useEffect(() => {
    // setValue on client only to prevent infinite loop
    props.setValue("price", totalPriceFormatted);
  }, [amount]);

  return (
    <>
      <HighlightValue
        label={t`Listing cost, incl. ${CARBONMARK_FEE * 100}% fee`}
        value={formatToPrice(totalPriceFormatted, locale)}
        icon={carbonmarkTokenInfoMap["usdc"].icon}
        warn={!!props.errorMessage}
      />
      {!!props.errorMessage && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {props.errorMessage}
        </Text>
      )}
    </>
  );
};

export type FormValues = {
  listingId: string;
  amount: string;
  price: string;
  paymentMethod: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  listing: Listing;
  values: null | FormValues;
  isLoading: boolean;
};

export const PurchaseForm: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address, isConnected, toggleModal } = useWeb3();
  const singleUnitPrice = formatUnits(
    props.listing.singleUnitPrice,
    getTokenDecimals("usdc")
  );
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const getBalance = async () => {
      const balance = await getUSDCBalance({
        userAddress: address,
      });

      setBalance(balance);
    };

    !balance && getBalance();
  }, [address]);

  const { register, handleSubmit, formState, control, setValue, clearErrors } =
    useForm<FormValues>({
      mode: "onChange",
      defaultValues: {
        listingId: props.listing.id,
        ...props.values,
      },
    });

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

        <div className={styles.amountLabel}>
          <Text>{t`How many tonnes of carbon do you want to buy?`}</Text>
          <Text t="body3">
            <Trans>Available:</Trans> {formatUnits(props.listing.leftToSell)}
          </Text>
        </div>

        <InputField
          id="amount"
          inputProps={{
            placeholder: t({
              id: "purchase.input.amount.placeholder",
              message: "Tonnes",
            }),
            type: "number",
            min: 1,
            max: Number(formatUnits(props.listing.leftToSell)),
            ...register("amount", {
              onChange: () => clearErrors("price"),
              required: {
                value: true,
                message: t({
                  id: "purchase.input.amount.required",
                  message: "Amount is required",
                }),
              },
              min: {
                value: 1,
                message: t({
                  id: "purchase.input.amount.minimum",
                  message: "The minimum amount to buy is 1 Tonne",
                }),
              },
              max: {
                value: Number(formatUnits(props.listing.leftToSell)),
                message: t({
                  id: "purchase.input.amount.maxAmount",
                  message: "You exceeded the available amount of tonnes",
                }),
              },
            }),
          }}
          label={t`How many tonnes of carbon do you want to buy?`}
          errorMessage={formState.errors.amount?.message}
          hideLabel
        />

        <TotalValue
          singlePrice={singleUnitPrice}
          control={control}
          setValue={setValue}
          errorMessage={formState.errors.price?.message}
        />

        <div className={styles.paymentLabel}>
          <Text>{t`Pay with:`}</Text>
          <Text t="body3">
            {t`Balance:`}{" "}
            {!balance ? <i>{t`Loading...`}</i> : formatToPrice(balance, locale)}
          </Text>
        </div>

        <Dropdown
          name="paymentMethod"
          initial={carbonmarkTokenInfoMap["usdc"].key}
          className={styles.paymentDropdown}
          aria-label={t`Toggle payment method`}
          renderLabel={(selected) => (
            <div className={styles.paymentDropDownHeader}>
              <Image
                className="icon"
                src={
                  carbonmarkTokenInfoMap[selected.id as CarbonmarkToken].icon
                }
                width={28}
                height={28}
                alt={carbonmarkTokenInfoMap[selected.id as CarbonmarkToken].key}
              />{" "}
              {selected.label}
            </div>
          )}
          control={control}
          options={[
            {
              id: carbonmarkTokenInfoMap["usdc"].key,
              label: carbonmarkTokenInfoMap["usdc"].label,
              value: carbonmarkTokenInfoMap["usdc"].key,
              icon: carbonmarkTokenInfoMap["usdc"].icon,
            },
          ]}
        />
        <div className={styles.paymentHelp}>
          <HelpOutline className={styles.helpIcon} />
          <div className={styles.paymentText}>
            <Text t="body3">
              {t`Currently, Carbonmark only accepts Polygon USDC Payments.`}{" "}
              <Anchor>{t`Learn how
            to acquire USDC on Polygon.`}</Anchor>
            </Text>
            <Text t="body3">
              {t`If you’d like to retire this project with another form of cryptocurrency, 
            or with a credit card, you can do so at`}{" "}
              <Anchor href={urls.app}>app.klimadao.finance.</Anchor>
            </Text>
          </div>
        </div>

        {!address && !isConnected && (
          <ButtonPrimary
            label={t({
              id: "shared.connect_to_buy",
              message: "Sign In / Connect To Buy",
            })}
            onClick={toggleModal}
          />
        )}

        {address && isConnected && (
          <ButtonPrimary
            label={
              props.isLoading ? (
                <Spinner />
              ) : (
                <Trans id="purchase.button.continue">Continue</Trans>
              )
            }
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </div>
      <InputField
        id="price"
        inputProps={{
          type: "hidden",
          ...register("price", {
            required: {
              value: true,
              message: t({
                id: "purchase.input.price.required",
                message: "Price is required",
              }),
            },
            max: {
              value: Number(balance),
              message: t({
                id: "purchase.input.price.maxAmount",
                message: "You exceeded your available amount of tokens",
              }),
            },
          }),
        }}
        label={"Price"}
        hideLabel
      />
    </form>
  );
};
