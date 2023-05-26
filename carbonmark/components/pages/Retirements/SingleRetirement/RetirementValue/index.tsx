import { Text } from "@klimadao/lib/components";
import { CarbonToken } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import Image, { StaticImageData } from "next/legacy/image";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  value: string;
  label: Uppercase<CarbonToken>;
  icon: StaticImageData;
};

export const RetirementValue: FC<Props> = ({ value, label, icon }) => (
  <div className={styles.retirementValue}>
    <Text t="caption" align="center" color="lightest" uppercase>
      <Trans id="retirement.single.quantity.title">QUANTITY RETIRED</Trans>
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
