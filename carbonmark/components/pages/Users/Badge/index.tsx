import { t } from "@lingui/macro";
import { ErrorOutlineOutlined, TimerOffOutlined } from "@mui/icons-material";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { FC } from "react";
import * as styles from "./styles";

const BadgeType = {
  Invalid: {
    title: t`Invalid`,
    icon: <ErrorOutlineOutlined />,
    tooltipText: t`This listing is no longer valid and is hidden from the marketplace. Please resubmit or delete the listing.`,
  },
  Expired: {
    title: t`Expired`,
    icon: <TimerOffOutlined />,
    tooltipText: t`This listing has expired and is hidden from the marketplace. Please resubmit or delete the listing.`,
  },
};

export const Badge: FC<{ type: "Expired" | "Invalid" }> = (props) => (
  <TextInfoTooltip tooltip={BadgeType[props.type].tooltipText}>
    <div className={styles.badge}>
      {BadgeType[props.type].icon}
      {BadgeType[props.type].title}
    </div>
  </TextInfoTooltip>
);
