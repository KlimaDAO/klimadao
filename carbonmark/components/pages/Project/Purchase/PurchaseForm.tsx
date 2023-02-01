import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { Listing } from "@klimadao/lib/types/carbonmark";
import { formatUnits, useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { InputField } from "components/shared/Form/InputField";
import { HighlightValue } from "components/Transaction/HighlightValue";
import { getTokenBalance } from "lib/actions";
import { FAKE_USDC } from "lib/constants";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { FC, useEffect, useState } from "react";
import { Control, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as styles from "./styles";

const CARBONMARK_FEE = 0.03; // 3%

type TotalValueProps = {
  control: Control<FormValues>;
  singlePrice: string;
  setValue: (field: "price", value: string) => void;
  warn: boolean;
};

const TotalValue: FC<TotalValueProps> = (props) => {
  const amount = useWatch({ name: "amount", control: props.control });
  const price = Number(props.singlePrice) * Number(amount);
  const totalPrice = price + price * CARBONMARK_FEE || 0;

  useEffect(() => {
    // setValue on client only to prevent infinite loop
    props.setValue("price", totalPrice.toString());
  }, [amount]);

  return (
    <HighlightValue
      label={t({
        id: "purchase.input.cost.label",
        message: "Cost incl. 3% fee",
      })}
      value={formatToPrice(totalPrice)}
      icon={carbonmarkTokenInfoMap["usdc"].icon}
      warn={props.warn}
    />
  );
};

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
  const { address, isConnected, toggleModal } = useWeb3();
  const singleUnitPrice = formatUnits(props.listing.singleUnitPrice);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const getBalance = async () => {
      const balance = await getTokenBalance({
        tokenAddress: FAKE_USDC,
        userAddress: address,
      });

      setBalance(balance);
    };

    getBalance();
  }, []);

  const { register, handleSubmit, formState, control, setValue, clearErrors } =
    useForm<FormValues>({
      defaultValues: {
        listingId: props.listing.id,
        ...props.values,
      },
    });

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
              id: "purchase.input.amount.placeholder",
              message: "Tonnes",
            }),
            type: "number",
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
          label={t({
            id: "purchase.input.amount.label",
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
        <TotalValue
          singlePrice={singleUnitPrice}
          control={control}
          setValue={setValue}
          warn={!!formState.errors.price?.message}
        />
        {!!formState.errors.price?.message && (
          <Text t="badge" className={styles.availableAmount}>
            {formState.errors.price.message}
          </Text>
        )}

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
    </form>
  );
};
