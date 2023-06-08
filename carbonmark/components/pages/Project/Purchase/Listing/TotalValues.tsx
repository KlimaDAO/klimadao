import { cx } from "@emotion/css";
import { formatUnits } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { CARBONMARK_FEE } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  singleUnitPrice: string;
  balance: string | null;
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const singleUnitPrice = formatUnits(
    props.singleUnitPrice,
    getTokenDecimals("usdc")
  );

  const { locale } = useRouter();
  const { formState, control, setValue } = useFormContext<FormValues>();

  const amount = useWatch({ name: "amount", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const price = Number(singleUnitPrice) * Number(amount);
  const totalPrice = price + price * CARBONMARK_FEE || 0;
  const totalPriceTrimmed = totalPrice.toFixed(getTokenDecimals("usdc")); // deal with js math overflows
  const totalPriceFormatted = parseFloat(totalPriceTrimmed).toString(); // trim trailing zeros

  useEffect(() => {
    // setValue on client only to prevent infinite loop
    setValue("price", totalPriceFormatted);
  }, [amount]);

  const exceededBalance =
    !!props.balance && Number(props.balance) <= Number(totalPriceFormatted);
  const currentBalance = formatToPrice(props.balance || "0", locale);

  return (
    <>
      <Text t="h4">{t`Total price`}</Text>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Amount to purchase`}</Text>
        <Text t="h5" className={styles.breakText}>
          {formatToTonnes(amount || "0", locale)} {t`Tonnes`}
        </Text>
      </div>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Price per tonne`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
              width={20}
              height={20}
              alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
            />
          </div>
          <Text t="h5">{formatToPrice(singleUnitPrice, locale, false)}</Text>
        </div>
      </div>

      <div className={styles.totalsText}>
        <Text className={styles.feeColor}>{t`Carbonmark fee`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
              width={20}
              height={20}
              alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
            />
          </div>
          <Text t="h5" className={styles.feeColor}>
            {formatToPrice(CARBONMARK_FEE, locale, false)}
          </Text>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total cost`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
              width={36}
              height={36}
              alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
            />
          </div>
          <Text
            t="h3"
            className={cx(styles.breakText, { error: exceededBalance })}
          >
            {formatToPrice(totalPriceFormatted, locale, false)}
          </Text>
        </div>
      </div>

      {formState.errors.price?.message && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {formState.errors.price?.message}
        </Text>
      )}
      {exceededBalance && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {t`Your balance:`} {currentBalance}
        </Text>
      )}
    </>
  );
};
