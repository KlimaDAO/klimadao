import { formatUnits } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { HighlightValue } from "components/Transaction/HighlightValue";
import { CARBONMARK_FEE } from "lib/constants";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  singleUnitPrice: string;
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const singleUnitPrice = formatUnits(
    props.singleUnitPrice,
    getTokenDecimals("usdc")
  );

  const { locale } = useRouter();
  const { formState, control, setValue } = useFormContext<FormValues>();

  const amount = useWatch({ name: "amount", control });
  const price = Number(props.singlePrice) * Number(amount);
  const totalPrice = price + price * CARBONMARK_FEE || 0;
  const totalPriceTrimmed = totalPrice.toFixed(getTokenDecimals("usdc")); // deal with js math overflows
  const totalPriceFormatted = parseFloat(totalPriceTrimmed).toString(); // trim trailing zeros
  useEffect(() => {
    // setValue on client only to prevent infinite loop
    setValue("price", totalPriceFormatted);
  }, [amount]);

  return (
    <>
      <HighlightValue
        label={t`Listing cost, incl. ${CARBONMARK_FEE * 100}% fee`}
        value={formatToPrice(totalPriceFormatted, locale)}
        icon={carbonmarkPaymentMethodMap["usdc"].icon}
        warn={!!formState.errors.price?.message}
      />
      {!!formState.errors.price?.message && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {formState.errors.price?.message}
        </Text>
      )}
    </>
  );
};
