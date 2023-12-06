import { Record } from ".generated/carbonmark-api-sdk/types";
import { Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import {
  ChangeCircleOutlined,
  DeviceHub,
  East,
  Park,
} from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Quantity } from "components/Quantity";
import { useRouter } from "next/router";
import * as styles from "./styles";

interface ProvenanceProps {
  records: Record[];
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
    month:"long",
    year: "numeric" 
  }).format(dateObj);

  return `${time} | ${date}`
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
  return (
    <Timeline className={styles.timeline}>
      {props.records.map((record) => (
        <TimelineItem key={record.id}>
            <TimelineOppositeContent className={styles.oppositeContent}>
            </TimelineOppositeContent>
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
                <h4>{recordInfo(record.transactionType)?.label}</h4>
                <Text t="body1">
                  {getFormattedDate(record.createdAt, locale)}
                </Text>
              </div>
              <div className={styles.contentFooter}>
                <Quantity quantity={record.originalAmount} />
                <div className={styles.address}>
                  {concatAddress(record.sender)}
                </div>
                <East />
                <div className={styles.address}>
                  {concatAddress(record.receiver)}
                </div>
              </div>
            </div>
          </TimelineContent>

        </TimelineItem>
      ))}
    </Timeline>
  );
};
