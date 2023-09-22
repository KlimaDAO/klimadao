import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { getConsumptionCost } from "lib/actions.retire";
import { CARBONMARK_FEE, urls } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { TokenPrice } from "lib/types/carbonmark.types";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  price: TokenPrice;
  userBalance: string | null;
  fiatBalance: string | null;
  fiatMinimum: string | null;
  costs: string;
  setCosts: (costs: string) => void;
};

const getStringBetween = (str: string, start: string, end: string) => {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result && result[1];
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const poolName = props.price.poolName;
  const isPoolDefault = props.price.isPoolDefault;

  const { locale, asPath } = useRouter();
  const { control, setValue } = useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const isFiat = paymentMethod === "fiat";

  /** Credit card fee string to display in the price card for fiat payments */
  const calcCreditCardFee = (): string => {
    if (!isFiat || !Number(props.costs) || isLoading) return "$0.00";
    // we have the total cost and the price per tonne.
    const priceWithoutFees =
      Number(amount) * Number(props.price.singleUnitPrice);
    const fee = Number(props.costs) - priceWithoutFees;
    if (fee <= 0) return "$0.00";
    return formatToPrice(fee.toString(), locale, isFiat);
  };

  useEffect(() => {
    const newCosts = async () => {
      setError("");

      if (
        Number(amount) <= 0 ||
        (isFiat && Number(amount) < 1) ||
        // wait for react-hook-form to convert quantity to whole numbers when fiat!
        (isFiat && !Number.isInteger(Number(amount)))
      ) {
        props.setCosts("0");
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

        props.setCosts(totalPrice);

        if (isFiat && Number(totalPrice) < Number(props.fiatMinimum)) {
          const formattedFiatMinimum = Number(props.fiatMinimum).toFixed(2);
          setError(t`Credit card minimum purchase is $${formattedFiatMinimum}`);
        }
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
          !!maxCosts && props.setCosts(maxCosts.trim());
          setError(
            t`At this time Carbonmark cannot process credit card payments exceeding: ${fiatBalance}`
          );
        } else {
          setError(t`There was an error loading the total cost.`);
          props.setCosts("0");
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
    if (!!props.costs) {
      setValue("totalPrice", props.costs);
    }
  }, [props.costs]);

  const exceededBalance =
    !!props.userBalance &&
    !isFiat &&
    Number(props.userBalance) <= Number(props.costs);
  const currentBalance = formatToPrice(props.userBalance || "0", locale);
  const fiatBalance = formatToPrice(props.fiatBalance || "0", locale);

  const formattedCosts =
    (isFiat && formatToPrice(props.costs, locale)) ||
    Number(props.costs)?.toLocaleString(locale);

  return (
    <>
      <Text t="h4" className={styles.title}>{t`Total price`}</Text>
      <div className={styles.totalsText}>
        <Text color="lightest">{t`Amount to retire`}</Text>
        <Text t="h5" className={styles.breakText}>
          {formatToTonnes(amount || "0", locale)} {t`Tonnes`}
        </Text>
      </div>

      <div className={styles.totalsText}>
        <Text color="lightest" className={styles.textWithHelpIcon}>
          {t`Price per tonne`}{" "}
          <TextInfoTooltip
            tippyProps={{ interactive: true }}
            tooltip={
              <Trans>
                Price includes network fees.{" "}
                <a target="_blank" href={urls.docsResourcesFees}>
                  See docs to learn more.
                </a>
              </Trans>
            }
          >
            <HelpOutline className={styles.helpIcon} />
          </TextInfoTooltip>
        </Text>

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

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Carbonmark fee`}</Text>
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
          <Text t="h5">{formatToPrice(CARBONMARK_FEE, locale, isFiat)}</Text>
        </div>
      </div>

      {isFiat && (
        <div className={styles.totalsText}>
          <Text color="lightest" className={styles.textWithHelpIcon}>
            {t`Payment processing fee`}{" "}
            <TextInfoTooltip
              tippyProps={{ interactive: true }}
              tooltip={
                <Trans>
                  Credit card payments incur an additional processing fee.{" "}
                  <a target="_blank" href={urls.docsResourcesFees}>
                    See docs to learn more.
                  </a>
                </Trans>
              }
            >
              <HelpOutline className={styles.helpIcon} />
            </TextInfoTooltip>
          </Text>
          <Text t="h5">{calcCreditCardFee()}</Text>
        </div>
      )}

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
