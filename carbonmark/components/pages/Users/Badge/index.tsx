import { t } from "@lingui/macro";
import { ErrorOutlineOutlined, TimerOffOutlined } from "@mui/icons-material";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { FC } from "react";
import * as styles from "./styles";

const BadgeType = {
  Invalid: {
    title: t`Invalid`,
    icon: <ErrorOutlineOutlined />,
    tooltipText: t`This listing has become invalid and is currently hidden from the marketplace. Click "Edit" to delete the listing or change quantity.`,
  },
  Expired: {
    title: t`Expired`,
    icon: <TimerOffOutlined />,
    tooltipText: t`This listing has expired and is currently hidden from the marketplace. Click "Edit" and resubmit the listing.`,
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
