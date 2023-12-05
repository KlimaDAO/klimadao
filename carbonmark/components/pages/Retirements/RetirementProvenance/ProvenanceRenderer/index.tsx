import { Record } from ".generated/carbonmark-api-sdk/types";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { ChangeCircleOutlined, DeviceHub, Park } from "@mui/icons-material";
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import * as styles from "./styles";

interface ProvenanceRendererProps {
    records: Record[];
  }

const RECORDS_INFO = {
    "RETIREMENT": {
        label: <Trans>Retirement</Trans>,
        icon: <Park sx={{ 
            color: "#00A329"
        }} />,
        iconBackgroundColor: '#E0FFE8'
    },
    "TRANSFER": {
        label: <Trans>Transfer</Trans>,
        icon: <ChangeCircleOutlined sx={{ 
            color: "#0019FF"
        }}/>,
        iconBackgroundColor: "#EBEDFF"
    },
    "ORIGINATION": {
        label: <Trans>Bridge</Trans>,
        icon: <DeviceHub  sx={{ 
            color: "#4E3D42"
        }} />,
        iconBackgroundColor: "#FCEABE"
    },
}

export const ProvenanceRenderer = (props: ProvenanceRendererProps) => {
    const recordInfo = (transactionType:string) => {
        if (Object.keys(RECORDS_INFO).includes(transactionType)) return  RECORDS_INFO[transactionType as keyof typeof RECORDS_INFO];
    }
    return (
        <Timeline>
        { props.records.map((record)=> (
            <TimelineItem key={record.id}>
                <TimelineSeparator>
                    <TimelineDot sx={{ 
                            backgroundColor: recordInfo(record.transactionType)?.iconBackgroundColor
                        }} >
                        {recordInfo(record.transactionType)?.icon}
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
            <TimelineContent>
                <div className={styles.content}>
                    <Text t="body3">{recordInfo(record.transactionType)?.label}</Text>
                    <div>{record.createdAt}</div>
                    <div className={styles.contentFooter}>
                        <div>{record.originalAmount}</div>
                        <div>{record.sender}</div>
                        <div>{record.receiver}</div>
                    </div>
                </div>
            </TimelineContent>
            </TimelineItem>

        ))}
      </Timeline>
    )

  }