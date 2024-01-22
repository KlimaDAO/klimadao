import { cx } from "@emotion/css";
import { safeSub } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import {
  getListingConsumptionCost,
  getPoolConsumptionCost,
} from "lib/actions.retire";
import { CARBONMARK_FEE, urls } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { Product } from "lib/types/carbonmark.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "./styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  product: Product;
  userBalance: string | null;
  fiatBalance: string | null;
  fiatMinimum: string | null;
  costs: string;
  setCosts: (costs: string) => void;
  approvalValue: string;
};

const getStringBetween = (str: string, start: string, end: string) => {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result && result[1];
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const { locale, asPath } = useRouter();
  const { control, setValue } = useFormContext<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  const isFiat = paymentMethod === "fiat";
  const isBankTransfer = paymentMethod === "bank-transfer";
  const isFiatOrBankTransfer = isFiat || isBankTransfer;

  const priceWithoutFees =
    Number(amount) * Number(props.product.singleUnitPrice);

  /** Credit card fee string to display in the price card for fiat payments */
  const calcCreditCardFee = (): string => {
    if (!isFiat || !Number(props.costs) || isLoading) return "$0.00";
    // we have the total cost and the price per tonne.
    const fee = Number(safeSub(props.costs, priceWithoutFees.toString()));
    if (fee <= 0) return "$0.00";
    return formatToPrice(fee.toString(), locale, isFiat);
  };

  useEffect(() => {
    // for the usdc icons to be visible for the required transition
    // on first load the default paymentMethod is set as usdc & then
    // immediately set to fiat.
    setValue("paymentMethod", "fiat");
  }, []);

  useEffect(() => {
    const newCosts = async () => {
      setError("");

      if (isBankTransfer) {
        props.setCosts(priceWithoutFees.toFixed(2));
        return;
      }

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

        const totalPrice = await (props.product.type === "pool"
          ? getPoolConsumptionCost({
              inputToken: paymentMethod,
              retirementToken: props.product.poolName,
              quantity: amount,
              isDefaultProject: props.product.isPoolDefault,
              projectTokenAddress: props.product.projectTokenAddress,
              currentUrl: asPath,
            })
          : getListingConsumptionCost({
              inputToken: paymentMethod,
              quantity: amount,
              unitPrice: props.product.singleUnitPrice,
              currentUrl: asPath,
              listingId: props.product.id,
            }));

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
          isFiat &&
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
    Number(props.userBalance) <= Number(props.approvalValue);
  const currentBalance = formatToPrice(props.userBalance || "0", locale);
  const fiatBalance = formatToPrice(props.fiatBalance || "0", locale);

  const formattedCosts =
    (isFiatOrBankTransfer && formatToPrice(props.costs, locale)) ||
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
          <div className="icon">
            <Image
              width={20}
              height={20}
              className={cx(isFiatOrBankTransfer && styles.iconFade)}
              src={carbonmarkPaymentMethodMap["usdc"].icon}
              alt={carbonmarkPaymentMethodMap["usdc"].id}
            />
          </div>

          <Text
            t="h5"
            className={cx(isFiatOrBankTransfer && styles.textTransition)}
          >
            {formatToPrice(
              props.product.singleUnitPrice,
              locale,
              isFiatOrBankTransfer
            )}
          </Text>
        </div>
      </div>

      <div className={cx(styles.totalsText, styles.feeText)}>
        <Text>{t`Carbonmark fee`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              width={20}
              height={20}
              className={cx(isFiatOrBankTransfer && styles.iconFade)}
              src={carbonmarkPaymentMethodMap["usdc"].icon}
              alt={carbonmarkPaymentMethodMap["usdc"].id}
            />
          </div>
          <Text
            t="h5"
            className={cx(
              isFiatOrBankTransfer && styles.textTransition,
              isFiatOrBankTransfer && "carbonmark-fee"
            )}
          >
            {formatToPrice(CARBONMARK_FEE, locale, isFiatOrBankTransfer)}
          </Text>
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
          <Text
            t="h5"
            className={cx(
              isFiatOrBankTransfer && styles.textTransition,
              isFiatOrBankTransfer && "processing-fee"
            )}
          >
            {calcCreditCardFee()}
          </Text>
        </div>
      )}

      <div className={styles.divider}></div>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Total cost`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              width={36}
              height={36}
              className={cx(isFiatOrBankTransfer && styles.iconFade)}
              src={carbonmarkPaymentMethodMap["usdc"].icon}
              alt={carbonmarkPaymentMethodMap["usdc"].id}
            />
          </div>
          <Text
            t="h3"
            className={cx(
              isFiatOrBankTransfer && styles.textTransition,
              isFiatOrBankTransfer && "total-cost",
              styles.breakText,
              {
                error: exceededBalance || !!error,
              }
            )}
          >
            {isLoading ? t`Loading...` : formattedCosts}
          </Text>
        </div>
      </div>

      {exceededBalance && !isBankTransfer && (
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
