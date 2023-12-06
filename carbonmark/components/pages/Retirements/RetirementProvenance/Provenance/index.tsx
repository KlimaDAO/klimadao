import { Record } from ".generated/carbonmark-api-sdk/types";
import { Text } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import {
  ChangeCircleOutlined,
  DeviceHub,
  East,
  Park,
  Token,
} from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Quantity } from "components/Quantity";
import { useRouter } from "next/router";
import * as styles from "./styles";

interface ProvenanceProps {
  records: Record[];
  retirementId: string;
}

const getFormattedDate = (timestamp: number, locale = "en") => {
  const dateObj = new Date(timestamp * 1000); //expects milliseconds
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
  const date = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  return `${time} | ${date}`;
};

const RECORDS_INFO = {
  RETIREMENT: {
    label: <Trans>Retirement</Trans>,
    icon: (
      <Park
        sx={{
          color: "#00A329",
        }}
      />
    ),
    iconBackgroundColor: "#E0FFE8",
  },
  TRANSFER: {
    label: <Trans>Transfer</Trans>,
    icon: (
      <ChangeCircleOutlined
        sx={{
          color: "#0019FF",
        }}
      />
    ),
    iconBackgroundColor: "#EBEDFF",
  },
  ORIGINATION: {
    label: <Trans>Bridge</Trans>,
    icon: (
      <DeviceHub
        sx={{
          color: "#4E3D42",
        }}
      />
    ),
    iconBackgroundColor: "#FCEABE",
  },
};

export const Provenance = (props: ProvenanceProps) => {
  const { locale } = useRouter();
  const recordInfo = (transactionType: string) => {
    if (Object.keys(RECORDS_INFO).includes(transactionType))
      return RECORDS_INFO[transactionType as keyof typeof RECORDS_INFO];
  };

  const lastRecord = props.records[0];
  if (!lastRecord) return <></>;

  const formattedAmount = formatTonnes({
    amount: lastRecord.originalAmount.toString(),
    locale: locale || "en",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Text t="body2" color="lightest">
            <div className={styles.iconAndText}>
              <Token fontSize="large" />
              <Trans>Credit ID</Trans>
            </div>
          </Text>
          <Text t="h5">{props.retirementId}</Text>
        </div>
        <div className={styles.headerItem}>
          <Text t="body2" color="lightest">
            <div className={styles.iconAndText}>
              <Token fontSize="large" />
              <Trans>Amount</Trans>
            </div>
          </Text>
          <Text t="h5">
            <Trans>{formattedAmount} Tonnes</Trans>
          </Text>
        </div>
      </div>
      <Timeline className={styles.timeline}>
        {props.records.map((record) => (
          <TimelineItem key={record.id}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: recordInfo(record.transactionType)
                    ?.iconBackgroundColor,
                }}
              >
                {recordInfo(record.transactionType)?.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <Text t="h4">
                    {recordInfo(record.transactionType)?.label}
                  </Text>
                  <Text t="body3" color="lightest">
                    {getFormattedDate(record.createdAt, locale)}
                  </Text>
                </div>
                <div className={styles.contentFooter}>
                  <Quantity quantity={record.originalAmount} />
                  <Text t="body1">{concatAddress(record.sender)}</Text>
                  <East />
                  <Text t="body1">{concatAddress(record.receiver)}</Text>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
