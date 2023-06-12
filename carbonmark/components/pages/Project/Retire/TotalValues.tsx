import { cx } from "@emotion/css";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Text } from "components/Text";
import { getConsumptionCost, getFeeFactor } from "lib/actions.retire";
import { AGGREGATOR_FEE, CARBONMARK_FEE, SUSHI_SWAP_FEE } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { isDefaultProjectAddress } from "lib/getPoolData";
import { Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  price: Price;
  balance: string | null;
};

const getSwapFee = (costs: number, pool: Lowercase<Price["name"]>) => {
  const singleSwap = costs * SUSHI_SWAP_FEE;
  if (pool === "bct") {
    return singleSwap * 2;
  }

  return singleSwap;
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const poolName = props.price.name.toLowerCase() as Lowercase<Price["name"]>;
  const { locale } = useRouter();
  const { formState, control, setValue } = useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [costs, setCosts] = useState("");
  const [feesFactor, setFeesFactor] = useState(0);
  const [error, setError] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const redemptionFee = Number(costs || 0) * feesFactor;
  const aggregatorFee = Number(amount || 0) * AGGREGATOR_FEE;
  const swapFee = getSwapFee(Number(costs || 0), props.pool);
  const networkFees = redemptionFee + aggregatorFee + swapFee;

  useEffect(() => {
    const selectiveFee = async () => {
      const factor = await getFeeFactor(poolName);
      setFeesFactor(factor);
    };
    selectiveFee();
  }, []);

  useEffect(() => {
    const newCosts = async () => {
      setError("");

      if (Number(amount) <= 0) {
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
          isDefaultProject: isDefaultProjectAddress(props.projectAddress),
        });

        setCosts(totalPrice);
      } catch (e) {
        console.error("e", e);
        setError(t`There was an error loading the total cost.`);
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
            {formatToPrice(props.price.singleUnitPrice, locale, false)}
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

      <div className={styles.totalsText}>
        <Text>{t`Network fees`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
              width={20}
              height={20}
              alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
            />
          </div>
          <div className={styles.withToggle}>
            <Text t="h5">
              {isLoading ? t`Loading` : trimWithLocale(networkFees, 5, locale)}
            </Text>
            <Text
              t="body3"
              color="lighter"
              onClick={() => setIsToggled((prev) => !prev)}
              className={styles.toggleFees}
            >
              {isToggled ? t`Hide Details` : t`Show Details`}
              {isToggled ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Text>
          </div>
        </div>
        {isToggled && (
          <div className={styles.fees}>
            <div className={styles.feeBreakdown}>
              <div className={cx(styles.iconAndText)}>
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon
                    }
                    width={20}
                    height={20}
                    alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
                  />
                </div>
                <Text t="body2">{trimWithLocale(swapFee, 5, locale)}</Text>
              </div>
              <div className={styles.feeText}>
                <Text t="body2">SushiSwap</Text>
                <Text t="body2">
                  {`(${trimWithLocale(
                    SUSHI_SWAP_FEE * 100,
                    2,
                    locale
                  )}% per swap)`}
                </Text>
              </div>
            </div>

            <div className={styles.feeBreakdown}>
              <div className={cx(styles.iconAndText)}>
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon
                    }
                    width={20}
                    height={20}
                    alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
                  />
                </div>
                <Text t="body2">
                  {trimWithLocale(aggregatorFee, 5, locale)}
                </Text>
              </div>
              <div className={styles.feeText}>
                <Text t="body2">{t`KlimaDAO Contracts`}</Text>
                <Text t="body2">
                  {`(${trimWithLocale(AGGREGATOR_FEE * 100, 5, locale)}%)`}
                </Text>
              </div>
            </div>

            <div className={styles.feeBreakdown}>
              <div className={cx(styles.iconAndText)}>
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon
                    }
                    width={20}
                    height={20}
                    alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
                  />
                </div>
                <Text t="body2">
                  {trimWithLocale(redemptionFee, 5, locale)}
                </Text>
              </div>
              <div className={styles.feeText}>
                <Text t="body2">
                  {props.price.name} {t`redemption Fee`}
                </Text>
                <Text t="body2">
                  {`(${trimWithLocale(feesFactor * 100, 2, locale)}%)`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isToggled && <div className={styles.divider}></div>}

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
