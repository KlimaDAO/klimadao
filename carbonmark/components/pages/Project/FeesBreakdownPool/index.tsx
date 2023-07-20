import { cx } from "@emotion/css";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Text } from "components/Text";
import { getFeeFactor } from "lib/actions.retire";
import {
  AGGREGATOR_FEE,
  CARBONMARK_FEE,
  settings,
  SUSHI_SWAP_FEE,
} from "lib/constants";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { CarbonmarkPaymentMethod, Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

type Props = {
  transaction: "retire" | "redeem";
  price: Price;
  paymentMethod: CarbonmarkPaymentMethod;
  costs: number | string;
  quantity: string | number;
  isLoading: boolean;
};

const getSwapFee = (costs: number, pool: Price["poolName"]) => {
  const singleSwap = costs * SUSHI_SWAP_FEE;
  if (pool === "bct") {
    return singleSwap * 2;
  }

  return singleSwap;
};

export const FeesBreakdownPool: FC<Props> = (props) => {
  const showFees = settings.SHOW_FEES;

  const { locale } = useRouter();
  const [feesFactor, setFeesFactor] = useState(0);
  const [isToggled, setIsToggled] = useState(false);

  const poolName = props.price.poolName;
  const isPoolDefault = props.price.isPoolDefault;

  // NO fees for RA if buying from pool
  const aggregatorFeeValue =
    props.transaction === "redeem" ? 0 : AGGREGATOR_FEE;

  const isFiat = props.paymentMethod === "fiat";

  const redemptionFee =
    (!isPoolDefault && Number(props.costs || 0) * feesFactor) || 0;
  const aggregatorFee = Number(props.quantity || 0) * aggregatorFeeValue;
  const swapFee = getSwapFee(Number(props.costs || 0), poolName);
  const networkFees = redemptionFee + aggregatorFee + swapFee;

  const formatFees = (value: number) =>
    isFiat ? formatToPrice(value, locale) : trimWithLocale(value, 5, locale);

  useEffect(() => {
    const selectiveFee = async () => {
      // No fees for default retirement
      if (isPoolDefault) {
        setFeesFactor(0);
        return;
      }

      const factor = await getFeeFactor(poolName);
      setFeesFactor(factor);
    };
    showFees && selectiveFee();
  }, []);

  if (!showFees) {
    return <div className={styles.divider}></div>;
  }

  return (
    <>
      {showFees && (
        <>
          <div className={styles.totalsText}>
            <Text className={styles.feeColor}>{t`Carbonmark fee`}</Text>
            <div className={cx(styles.iconAndText)}>
              {!isFiat && (
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .icon
                    }
                    width={20}
                    height={20}
                    alt={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .id
                    }
                  />
                </div>
              )}
              <Text t="h5" className={styles.feeColor}>
                {formatToPrice(CARBONMARK_FEE, locale, isFiat)}
              </Text>
            </div>
          </div>
          <div className={styles.totalsText}>
            <Text>{t`Network fees`}</Text>
            <div className={cx(styles.iconAndText)}>
              {!isFiat && (
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .icon
                    }
                    width={20}
                    height={20}
                    alt={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .id
                    }
                  />
                </div>
              )}
              <div className={styles.withToggle}>
                <Text t="h5">
                  {props.isLoading ? t`Loading` : formatFees(networkFees)}
                </Text>

                <Text
                  t="body3"
                  color="lighter"
                  onClick={() => setIsToggled((prev) => !prev)}
                  className={styles.toggleFees}
                >
                  {isToggled ? t`Hide Details` : t`Show Details`}
                  {isToggled ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Text>
              </div>
            </div>
            {isToggled && (
              <div className={styles.fees}>
                <div className={styles.feeBreakdown}>
                  <div className={cx(styles.iconAndText)}>
                    {!isFiat && (
                      <div className="icon">
                        <Image
                          src={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].icon
                          }
                          width={20}
                          height={20}
                          alt={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].id
                          }
                        />
                      </div>
                    )}
                    <Text t="body2">{formatFees(swapFee)}</Text>
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
                    {!isFiat && (
                      <div className="icon">
                        <Image
                          src={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].icon
                          }
                          width={20}
                          height={20}
                          alt={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].id
                          }
                        />
                      </div>
                    )}
                    <Text t="body2">{formatFees(aggregatorFee)}</Text>
                  </div>
                  <div className={styles.feeText}>
                    <Text t="body2">{t`KlimaDAO Contracts`}</Text>
                    <Text t="body2">
                      {`(${trimWithLocale(
                        aggregatorFeeValue * 100,
                        5,
                        locale
                      )}%)`}
                    </Text>
                  </div>
                </div>

                <div className={styles.feeBreakdown}>
                  <div className={cx(styles.iconAndText)}>
                    {!isFiat && (
                      <div className="icon">
                        <Image
                          src={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].icon
                          }
                          width={20}
                          height={20}
                          alt={
                            carbonmarkPaymentMethodMap[
                              props.paymentMethod || "usdc"
                            ].id
                          }
                        />
                      </div>
                    )}
                    <Text t="body2">{formatFees(redemptionFee)}</Text>
                  </div>
                  <div className={styles.feeText}>
                    <Text t="body2">
                      {props.price.poolName.toUpperCase()}{" "}
                      <Trans>Redemption Fee</Trans>
                    </Text>
                    <Text t="body2">
                      {`(${trimWithLocale(feesFactor * 100, 2, locale)}%)`}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!isToggled && <div className={styles.divider}></div>}
    </>
  );
};
