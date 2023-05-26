import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { getConsumptionCost } from "lib/actions.retire";
import { CARBONMARK_FEE } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  singleUnitPrice: Price["singleUnitPrice"];
  balance: string | null;
  pool: Lowercase<Price["name"]>;
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const { locale } = useRouter();
  const { formState, control, setValue } = useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [costs, setCosts] = useState("");
  const [error, setError] = useState("");

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  useEffect(() => {
    const newCosts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const totalPrice = await getConsumptionCost({
          inputToken: paymentMethod,
          retirementToken: props.pool,
          quantity: amount,
          getSpecific: true,
        });

        setCosts(totalPrice);
      } catch (e) {
        console.error("e", e);
        setError(
          t`Could not load the costs. Are you sure you are connected to the correct network?`
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!!amount && !!paymentMethod) {
      newCosts();
    }
  }, [amount]);

  useEffect(() => {
    if (!!costs) {
      setValue("totalPrice", costs);
    }
  }, [costs]);

  const exceededBalance =
    !!props.balance && Number(props.balance) <= Number(costs);
  const currentBalance = formatToPrice(props.balance || "0", locale);

  return (
    <>
      <Text t="h4">{t`Total Price`}</Text>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Amount to retire`}</Text>
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
          <Text t="h5">
            {formatToPrice(props.singleUnitPrice, locale, false)}
          </Text>
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
            className={cx(styles.breakText, {
              error: exceededBalance || !!error,
            })}
          >
            {isLoading ? t`Loading...` : Number(costs)?.toLocaleString(locale)}
          </Text>
        </div>
      </div>

      {formState.errors.totalPrice?.message && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {formState.errors.totalPrice?.message}
        </Text>
      )}
      {exceededBalance && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {t`Your balance:`} {currentBalance}
        </Text>
      )}
      {error && (
        <Text t="body1" className={styles.errorMessagePrice}>
          {error}
        </Text>
      )}
    </>
  );
};
