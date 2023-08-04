import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { getConsumptionCost } from "lib/actions.retire";
import { CARBONMARK_FEE, urls } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { Price } from "lib/types/carbonmark";
import { notNil } from "lib/utils/functional.utils";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  price: Price;
  userBalance: string | null;
  //The maximum amount of fiat allowable to be spent by the user
  fiatMax: string | null;
};

const getStringBetween = (str: string, start: string, end: string) => {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result && result[1];
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const poolName = props.price.poolName;
  const isPoolDefault = props.price.isPoolDefault;

  const { locale, asPath } = useRouter();
  const { formState, control, setValue, trigger } =
    useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [costs, setCosts] = useState("");
  const [error, setError] = useState("");

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const isFiat = paymentMethod === "fiat";

  /** Credit card fee string to display in the price card for fiat payments */
  const calcCreditCardFee = (): string => {
    if (!isFiat || !Number(costs) || isLoading) return "$0.00";
    // we have the total cost and the price per tonne.
    const priceWithoutFees =
      Number(amount) * Number(props.price.singleUnitPrice);
    const fee = Number(costs) - priceWithoutFees;
    if (fee <= 0) return "$0.00";
    return formatToPrice(fee.toString(), locale, isFiat);
  };

  /** Surface form errors */
  useEffect(() => {
    const error = Object.values(formState.errors).at(0);
    if (notNil(error)) {
      setError(error.message ?? "");
    }
  }, [formState.errors]);

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
            t`At this time Carbonmark cannot process credit card payments exceeding: ${fiatMax}`
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

  // Keep our hidden field in sync with updates from offsetra API
  // This value is shared throughout the form and page
  useEffect(() => {
    if (!!costs) {
      setValue("totalPrice", costs);
      //Force field revalidation
      trigger("totalPrice");
    }
  }, [costs]);

  const exceededBalance =
    !!props.userBalance &&
    !isFiat &&
    Number(props.userBalance) <= Number(costs);

  const exceededMax =
    isFiat && notNil(props.fiatMax) && Number(props.fiatMax) <= Number(costs);

  const currentBalance = formatToPrice(props.userBalance || "0", locale);
  const fiatMax = formatToPrice(props.fiatMax || "0", locale);

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
              error: exceededBalance || exceededMax || !!error,
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
