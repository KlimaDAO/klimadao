import { t, Trans } from "@lingui/macro";
import { TimerOffOutlined } from "@mui/icons-material";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { FC } from "react";
import * as styles from "./styles";

export const ExpiredTag: FC = () => (
  <TextInfoTooltip
    tooltip={t`This listing has expired and is currently hidden from the marketplace. Click "Edit" and resubmit the listing.`}
  >
    <div className={styles.tag}>
      <TimerOffOutlined />
      <Trans>Expired</Trans>
    </div>
  </TextInfoTooltip>
);
