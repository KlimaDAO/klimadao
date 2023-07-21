import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { getConsumptionCost } from "lib/actions.retire";
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
  price: Price;
  userBalance: string | null;
  fiatBalance: string | null;
};

const getStringBetween = (str: string, start: string, end: string) => {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result && result[1];
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const poolName = props.price.poolName;
  const isPoolDefault = props.price.isPoolDefault;

  const { locale, asPath } = useRouter();
  const { formState, control, setValue } = useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [costs, setCosts] = useState("");
  const [error, setError] = useState("");

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const isFiat = paymentMethod === "fiat";

  useEffect(() => {
    const newCosts = async () => {
      setError("");

      if (
        Number(amount) <= 0 ||
        (isFiat && Number(amount) < 1) ||
        // wait for react-hook-form to convert quantity to whole numbers when fiat!
        (isFiat && !Number.isInteger(Number(amount)))
      ) {
        setCosts("0");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const totalPrice = await getConsumptionCost({
          inputToken: paymentMethod,
          retirementToken: poolName,
          quantity: amount,
          isDefaultProject: isPoolDefault,
          projectTokenAddress: props.price.projectTokenAddress,
          currentUrl: asPath,
        });

        setCosts(totalPrice);
      } catch (e: any) {
        console.error("e", e);

        // Check Offsetra API Errors
        if (e?.name === "BalanceExceeded") {
          // read the maxCosts from error message
          const maxCosts = getStringBetween(
            e.message,
            "maxCosts:",
            ", balance:"
          );

          // Update costs with value from error
          !!maxCosts && setCosts(maxCosts.trim());
          setError(
            t`At this time Carbonmark cannot process credit card payments exceeding: ${fiatBalance}`
          );
        } else {
          setError(t`There was an error loading the total cost.`);
          setCosts("0");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!!amount && !!paymentMethod) {
      newCosts();
    }
  }, [amount, paymentMethod]);

  useEffect(() => {
    if (!!costs) {
      setValue("totalPrice", costs);
    }
  }, [costs]);

  const exceededBalance =
    !!props.userBalance &&
    !isFiat &&
    Number(props.userBalance) <= Number(costs);
  const currentBalance = formatToPrice(props.userBalance || "0", locale);
  const fiatBalance = formatToPrice(props.fiatBalance || "0", locale);

  const formattedCosts =
    (isFiat && formatToPrice(costs, locale)) ||
    Number(costs)?.toLocaleString(locale);

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
          {!isFiat && (
            <div className="icon">
              <Image
                src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
                width={20}
                height={20}
                alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
              />
            </div>
          )}

          <Text t="h5">
            {formatToPrice(props.price.singleUnitPrice, locale, isFiat)}
          </Text>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total cost`}</Text>
        <div className={cx(styles.iconAndText)}>
          {!isFiat && (
            <div className="icon">
              <Image
                src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
                width={36}
                height={36}
                alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
              />
            </div>
          )}
          <Text
            t="h3"
            className={cx(styles.breakText, {
              error: exceededBalance || !!error,
            })}
          >
            {isLoading ? t`Loading...` : formattedCosts}
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
