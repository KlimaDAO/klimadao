import { Text } from "@klimadao/lib/components";
import * as styles from "./styles";
import { FC } from "react";
import { RetirementToken } from "@klimadao/lib/constants";
import Image, { StaticImageData } from "next/legacy/image";
import { Trans } from "@lingui/macro";

type Props = {
  value: string;
  label: Uppercase<RetirementToken>;
  icon: StaticImageData;
};

export const RetirementValue: FC<Props> = ({ value, label, icon }) => {
  return (
    <div className={styles.retirementValue_textGroup}>
      <Text t="caption" align="center" color="lightest" uppercase>
        <Trans id="retirement.single.quantity">QUANTITY RETIRED</Trans>
      </Text>
      <div className={styles.tokenInfo}>
        <Image
          alt={label}
          src={icon}
          width={48}
          height={48}
          objectFit="contain"
        />
        <Text t="h3" as="h2" align="center" className="amount">
          {value} {label}
        </Text>
      </div>
    </div>
  );
};
