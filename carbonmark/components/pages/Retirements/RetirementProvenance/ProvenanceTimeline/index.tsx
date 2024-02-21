import {
  ProvenanceRecord,
  Retirement,
} from ".generated/carbonmark-api-sdk/types";
import { Anchor as A } from "@klimadao/lib/components";
import { verra } from "@klimadao/lib/constants";
import { concatAddress, insertWhiteSpaces } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import East from "@mui/icons-material/East";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
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
import { useState } from "react";
import { PROVENANCE_RECORDS_INFO } from "../RetirementProvenance.constants";
import { getFormattedDate } from "../RetirementProvenance.utils";
import * as styles from "./styles";

interface ProvenanceComponentProps {
  records: ProvenanceRecord[];
  retirement: Retirement;
}

/**
 * Displays provenance records formatted as a timeline
 * @param props
 * @returns
 */
export const ProvenanceTimeline = (props: ProvenanceComponentProps) => {
  const { locale } = useRouter();
  const [showTransfers, setShowTransfers] = useState<boolean>(false);

  // Divider customization
  const numberOfTransfers = props.records.filter(
    (record) => record.transactionType == "TRANSFER"
  ).length;
  const dividerText = showTransfers ? (
    <Trans>Hide {numberOfTransfers} transactions</Trans>
  ) : (
    <Trans>View {numberOfTransfers} transactions</Trans>
  );
  const dividerIcon = showTransfers ? (
    <KeyboardArrowUp fontSize="large" />
  ) : (
    <KeyboardArrowDown fontSize="large" />
  );

  /** Returns the relevant record info for a given record */
  const recordInfo = (record: ProvenanceRecord) => {
    if (Object.keys(PROVENANCE_RECORDS_INFO).includes(record.transactionType))
      return PROVENANCE_RECORDS_INFO[
        record.transactionType as keyof typeof PROVENANCE_RECORDS_INFO
      ];
  };

  /** Return the correct style for a given record */
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
                  boxShadow: "unset",
                }}
              >
                <div className={styles.timelineIcon}>
                  {recordInfo(record)?.icon}
                </div>
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
                      <Quantity
                        quantity={record.originalAmount}
                        className={styles.quantity}
                      />
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
                    <Quantity
                      quantity={record.originalAmount}
                      className={styles.quantity}
                    />
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
                            className={styles.verraLink}
                          >
                            <Trans>View issuance on Verra</Trans>
                          </A>
                        </Text>
                        <TextInfoTooltip
                          align="start"
                          tooltip={t`On the Verra page, search for the specific serial number.`}
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
  );
};
