import {
  ProvenanceRecord,
  Retirement,
} from ".generated/carbonmark-api-sdk/types";
import { Anchor as A } from "@klimadao/lib/components";
import { verra } from "@klimadao/lib/constants";
import {
  concatAddress,
  formatTonnes,
  insertWhiteSpaces,
} from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import BalanceOutlined from "@mui/icons-material/BalanceOutlined";
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined";
import DeviceHub from "@mui/icons-material/DeviceHub";
import East from "@mui/icons-material/East";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Park from "@mui/icons-material/Park";
import Token from "@mui/icons-material/Token";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Divider } from "@mui/material";
import { Quantity } from "components/Quantity";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import * as styles from "./styles";

interface ProvenanceComponentProps {
  records: ProvenanceRecord[];
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

  return `UTC ${time} | ${date}`;
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

/**
 * Displays provenance records formatted as a timeline
 * @param props
 * @returns
 */
export const ProvenanceComponent = (props: ProvenanceComponentProps) => {
  const { locale } = useRouter();
  const [showTransfers, setShowTransfers] = useState<boolean>(false);

  // Do not display anything if we do not have at least a record
  const lastRecord = props.records[0];
  if (!lastRecord) return <></>;

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

  /** Formats tons */
  const formattedAmount = formatTonnes({
    amount: lastRecord.originalAmount.toString(),
    locale: locale || "en",
  });

  /** Returns the relevant record info for a given record */
  const recordInfo = (record: ProvenanceRecord) => {
    if (Object.keys(RECORDS_INFO).includes(record.transactionType))
      return RECORDS_INFO[record.transactionType as keyof typeof RECORDS_INFO];
  };

  /** Return the correct stylefor a given record */
  const recordVisible = (record: ProvenanceRecord) => {
    return record.transactionType != "TRANSFER" || showTransfers;
  };

  /** Styles record items to trigger the transition effect */
  const recordStyle = (record: ProvenanceRecord) => {
    return `${styles.timelineItem} ${
      recordVisible(record)
        ? styles.timelineItemVisible
        : styles.timelineItemHidden
    }`;
  };
  const projectId = props.retirement.credit?.projectId.split("-")[1];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Text
            t="responsiveBody2"
            color="lightest"
            className={styles.iconAndText}
          >
            <Token fontSize="large" />
            <Trans>Credit ID</Trans>
          </Text>
          <Text t="h5">
            {props.retirement.credit?.id &&
              concatAddress(props.retirement.credit?.id)}
          </Text>
        </div>
        <div className={styles.headerItem}>
          <Text
            t="body2"
            color="lightest"
            className={`${styles.iconAndText} ${styles.right}`}
          >
            <BalanceOutlined fontSize="large" />
            <Trans>Amount</Trans>
          </Text>
          <Text t="h5">
            <Trans>{formattedAmount} Tonnes</Trans>
          </Text>
        </div>
      </div>
      <Timeline className={styles.timeline}>
        {props.records
          .filter((_x) => true)
          .map((record) => (
            <TimelineItem
              key={record.id}
              className={recordStyle(record)}
              sx={{
                minHeight: 0,
              }}
            >
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
                    <Text t="responsiveBody3" color="lightest">
                      {getFormattedDate(record.createdAt, locale)}
                    </Text>
                  </div>
                  {record.transactionType == "RETIREMENT" && (
                    <>
                      <div className={styles.contentFooter}>
                        <Quantity quantity={record.originalAmount} />
                        <Text t="responsiveBody1">
                          {concatAddress(record.sender)}
                        </Text>
                        <Text t="responsiveBody1" color="lightest">
                          via Carbonmark
                        </Text>
                      </div>
                      <Divider
                        onClick={() => setShowTransfers(!showTransfers)}
                        className={styles.timelineItemDivider}
                      >
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
                      <Text t="responsiveBody1">
                        {concatAddress(record.sender)}
                      </Text>
                      <East />
                      <Text t="responsiveBody1">
                        {concatAddress(record.receiver)}
                      </Text>
                    </div>
                  )}
                  {record.transactionType == "ORIGINATION" && (
                    <div
                      className={`${styles.contentFooter} ${styles.bridgeContentFooter}`}
                    >
                      {record.registrySerialNumbers[0] && (
                        <div>
                          <Text t="responsiveBody2" className={styles.inline}>
                            <Trans>Serial Number</Trans>
                          </Text>
                          :{" "}
                          <Text
                            t="responsiveBody2"
                            color="lightest"
                            className={styles.inline}
                          >
                            {insertWhiteSpaces({
                              text: record.registrySerialNumbers[0],
                              after: "-",
                            })}
                          </Text>
                        </div>
                      )}
                      {projectId && (
                        <div className={styles.verraLinkAndTooltip}>
                          <Text t="responsiveBody2">
                            <A
                              href={`${verra.appSearch}?programType=ISSUANCE&exactResId=${projectId}`}
                            >
                              <Trans>View issuance on Verra</Trans>
                            </A>
                          </Text>
                          <TextInfoTooltip
                            align="start"
                            tooltip={t`On the Verra page, search (CTRL+F) for the specific serial number.`}
                          >
                            <InfoOutlinedIcon />
                          </TextInfoTooltip>
                        </div>
                      )}
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
