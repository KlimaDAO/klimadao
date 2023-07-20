import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { CARBONMARK_FEE, settings } from "lib/constants";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  paymentMethod: CarbonmarkPaymentMethod;
};

export const FeesBreakdownListing: FC<Props> = (props) => {
  const showFees = settings.SHOW_FEES;
  const { locale } = useRouter();

  return (
    <>
      {showFees && (
        <div className={styles.totalsText}>
          <Text className={styles.feeColor}>{t`Carbonmark fee`}</Text>
          <div className={cx(styles.iconAndText)}>
            <div className="icon">
              <Image
                src={
                  carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"].icon
                }
                width={20}
                height={20}
                alt={
                  carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"].id
                }
              />
            </div>
            <Text t="h5" className={styles.feeColor}>
              {formatToPrice(CARBONMARK_FEE, locale, false)}
            </Text>
          </div>
        </div>
      )}

      <div className={styles.divider}></div>
    </>
  );
};
