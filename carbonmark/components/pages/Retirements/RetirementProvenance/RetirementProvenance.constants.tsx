import { Trans, t } from "@lingui/macro";
import DeviceHub from "@mui/icons-material/DeviceHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Park from "@mui/icons-material/Park";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { ReactNode } from "react";
import { ProvenanceRecordType } from "./RetirementProvenance.types";
import * as styles from "./styles";

export const PROVENANCE_RECORDS_INFO: Record<
  ProvenanceRecordType,
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
    label: (
      <div className={styles.labelWithInfo}>
        <Trans>Send</Trans>
        <TextInfoTooltip
          align="start"
          tooltip={t`Asset moved from one account to another, either via sale or inter-account transfer.`}
        >
          <InfoOutlinedIcon />
        </TextInfoTooltip>
      </div>
    ),
    icon: (
      <NorthEastIcon
        sx={{
          color: "#0019FF",
        }}
      />
    ),
    iconBackgroundColor: "#EBEDFF",
  },
  ORIGINATION: {
    label: <Trans>Transfer</Trans>,
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
