import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { getRedeemCost } from "lib/actions.redeem";
import { CARBONMARK_FEE, urls } from "lib/constants";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { Price } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as styles from "../styles";
import { FormValues } from "./types";

type TotalValuesProps = {
  balance: string | null;
  price: Price;
};

export const TotalValues: FC<TotalValuesProps> = (props) => {
  const poolName = props.price.poolName;
  const isPoolDefault = props.price.isPoolDefault;

  const { locale } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [costs, setCosts] = useState("");
  const [error, setError] = useState("");

  const { formState, control, setValue } = useFormContext<FormValues>();

  const quantity = useWatch({ name: "quantity", control });
  const paymentMethod = useWatch({ name: "paymentMethod", control });

  useEffect(() => {
    const newCosts = async () => {
      setError("");

      if (Number(quantity) <= 0) {
        setCosts("0");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const totalPrice = await getRedeemCost({
          paymentMethod: paymentMethod,
          pool: poolName,
          quantity,
          isPoolDefault,
        });

        setCosts(totalPrice);
      } catch (e) {
        console.error("Get redeem costs error", e);
        setError(t`There was an error loading the total cost.`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!!quantity && !!paymentMethod) {
      newCosts();
    }
  }, [quantity]);

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
      <Text t="h4">{t`Total price`}</Text>

      <div className={styles.totalsText}>
        <Text color="lightest">{t`Amount to purchase`}</Text>
        <Text t="h5" className={styles.breakText}>
          {formatToTonnes(quantity || "0", locale)} {t`Tonnes`}
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
        <Text color="lightest">{t`Carbonmark fee`}</Text>
        <div className={cx(styles.iconAndText)}>
          <div className="icon">
            <Image
              src={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].icon}
              width={20}
              height={20}
              alt={carbonmarkPaymentMethodMap[paymentMethod || "usdc"].id}
            />
          </div>
          <Text t="h5">{formatToPrice(CARBONMARK_FEE, locale, false)}</Text>
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
    </>
  );
};
