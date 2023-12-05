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
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Quantity } from "components/Quantity";
import { useRouter } from "next/router";
import * as styles from "./styles";

interface ProvenanceRendererProps {
  records: Record[];
}

const getFormattedDate = (timestamp: number, locale = "en") => {
  const date = new Date(timestamp * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
  }).format(date);
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

export const ProvenanceRenderer = (props: ProvenanceRendererProps) => {
  const { locale } = useRouter();
  const recordInfo = (transactionType: string) => {
    if (Object.keys(RECORDS_INFO).includes(transactionType))
      return RECORDS_INFO[transactionType as keyof typeof RECORDS_INFO];
  };
  return (
    <Timeline>
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
                <h5>{recordInfo(record.transactionType)?.label}</h5>
                <Text t="body3">
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
