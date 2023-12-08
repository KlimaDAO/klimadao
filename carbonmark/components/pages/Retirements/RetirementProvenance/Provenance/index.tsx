import {
  Record as KRecord,
  Retirement,
} from ".generated/carbonmark-api-sdk/types";
import { Anchor as A, Text } from "@klimadao/lib/components";
import {
  concatAddress,
  formatTonnes,
  insertWhiteSpaces,
} from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import {
  ChangeCircleOutlined,
  DeviceHub,
  East,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Park,
  Token,
} from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Divider } from "@mui/material";
import { Quantity } from "components/Quantity";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import * as styles from "./styles";

interface ProvenanceProps {
  records: KRecord[];
  retirement: Retirement;
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

type RecordType = "RETIREMENT" | "TRANSFER" | "ORIGINATION";

const RECORDS_INFO: Record<
  RecordType,
  { label: ReactNode; icon: ReactNode; iconBackgroundColor: string }
> = {
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
  const [showTransfers, setShowTransfers] = useState<boolean>(false);
  // Divider customization
  const numberOfTransfers = props.records.filter(
    (record) => record.transactionType == "TRANSFER"
  ).length;
  const dividerText = showTransfers ? (
    <Trans>Hide {numberOfTransfers} transfers</Trans>
  ) : (
    <Trans>View {numberOfTransfers} transfers</Trans>
  );
  const dividerIcon = showTransfers ? (
    <KeyboardArrowUp fontSize="large" />
  ) : (
    <KeyboardArrowDown fontSize="large" />
  );

  const lastRecord = props.records[0];
  if (!lastRecord) return <></>;

  const formattedAmount = formatTonnes({
    amount: lastRecord.originalAmount.toString(),
    locale: locale || "en",
  });

  /** Return the relevant record info for a given record */
  const recordInfo = (record: KRecord) => {
    if (Object.keys(RECORDS_INFO).includes(record.transactionType))
      return RECORDS_INFO[record.transactionType as keyof typeof RECORDS_INFO];
  };

  /** Return the correct stylefor a given record */
  const recordVisible = (record: KRecord) => {
    return record.transactionType != "TRANSFER" || showTransfers;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Text t="body2" color="lightest" className={styles.iconAndText}>
            <Token fontSize="large" />
            <Trans>Credit ID</Trans>
          </Text>
          <Text t="h5">
            {props.retirement.credit?.id &&
              concatAddress(props.retirement.credit?.id)}
          </Text>
        </div>
        <div className={styles.headerItem}>
          <Text t="body2" color="lightest" className={styles.iconAndText}>
            <Token fontSize="large" />
            <Trans>Amount</Trans>
          </Text>
          <Text t="h5">
            <Trans>{formattedAmount} Tonnes</Trans>
          </Text>
        </div>
      </div>
      <Timeline className={styles.timeline}>
        {props.records.filter(recordVisible).map((record) => (
          <TimelineItem key={record.id}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: recordInfo(record)?.iconBackgroundColor,
                }}
              >
                {recordInfo(record)?.icon}
              </TimelineDot>
              {record.transactionType == "TRANSFER" && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <Text t="h4">{recordInfo(record)?.label}</Text>
                  <Text t="body3" color="lightest">
                    {getFormattedDate(record.createdAt, locale)}
                  </Text>
                </div>
                {record.transactionType == "RETIREMENT" && (
                  <>
                    <div className={styles.contentFooter}>
                      <Quantity quantity={record.originalAmount} />
                      <Text t="body1">{concatAddress(record.sender)}</Text>
                      <Text t="body1" color="lightest">
                        via Carbonmark
                      </Text>
                    </div>
                    <Divider onClick={() => setShowTransfers(!showTransfers)}>
                      <a className={styles.divider}>
                        <span>{dividerText}</span>
                        {dividerIcon}
                      </a>
                    </Divider>
                  </>
                )}
                {record.transactionType == "TRANSFER" && (
                  <div className={styles.contentFooter}>
                    <Quantity quantity={record.originalAmount} />
                    <Text t="body1">{concatAddress(record.sender)}</Text>
                    <East />
                    <Text t="body1">{concatAddress(record.receiver)}</Text>
                  </div>
                )}
                {record.transactionType == "ORIGINATION" && (
                  <div>
                    <div>
                      <Text t="body2" className={styles.inline}>
                        <Trans>Serial Number</Trans>
                      </Text>
                      :{" "}
                      <Text
                        t="body2"
                        color="lightest"
                        className={styles.inline}
                      >
                        {insertWhiteSpaces({
                          text: record.registrySerialNumbers[0],
                          after: "-",
                        })}
                      </Text>
                    </div>
                    <A href={"#"} className={styles.verraLink}>
                      <Trans>View on Verra</Trans>
                    </A>
                  </div>
                )}
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
