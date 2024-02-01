import { Trans } from "@lingui/macro";
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined";
import DeviceHub from "@mui/icons-material/DeviceHub";
import Park from "@mui/icons-material/Park";
import { ReactNode } from "react";
import { ProvenanceRecordType } from "./RetirementProvenance.types";

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
