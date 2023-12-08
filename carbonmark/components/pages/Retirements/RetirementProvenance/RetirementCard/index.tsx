import { Retirement } from ".generated/carbonmark-api-sdk/types";
import { Anchor as A, Text } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { ParkOutlined, Today } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import * as styles from "./styles";

interface ProvenanceProps {
  retirement: Retirement;
  retirementUrl: string;
}

const getFormattedDate = (timestamp: number, locale = "en") => {
  const dateObj = new Date(timestamp * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

const RetirementCardItem = (props: {
  title: string;
  icon: ReactNode;
  text: string;
}) => {
  return (
    <div className={styles.headerItem}>
      <Text t="body3" color="lightest" className={styles.uppercase}>
        {props.title}
      </Text>
      <div className={styles.iconAndText}>
        <div>{props.icon}</div>
        <Text t="body1" color="lightest">
          {props.text}
        </Text>
      </div>
    </div>
  );
};

export const RetirementCard = (props: ProvenanceProps) => {
  const { locale } = useRouter();
  const formattedAmount = formatTonnes({
    amount: props.retirement.amount.toString(),
    locale: locale || "en",
  });
  const date = getFormattedDate(props.retirement.timestamp);
  const by = concatAddress(props.retirement.retiringAddress);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <RetirementCardItem
          title={t`Amount`}
          icon={<ParkOutlined fontSize="large" />}
          text={t`${formattedAmount} Tonnes`}
        />
        <RetirementCardItem title={t`By`} icon={<></>} text={by} />
        <RetirementCardItem
          title={t`Date`}
          icon={<Today fontSize="large" />}
          text={date}
        />
      </div>
      <div className={styles.footer}>
        <A className={styles.profileLink} href={props.retirementUrl}>
          {t`View retirement`}
          <LaunchIcon />
        </A>
      </div>
    </div>
  );
};
