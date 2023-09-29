import { t, Trans } from "@lingui/macro";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { FC } from "react";
import * as styles from "./styles";

export const InvalidTag: FC = () => (
  <TextInfoTooltip
    tooltip={t`This listing has become invalid and is currently hidden from the marketplace. Click "Edit" to delete the listing or change quantity.`}
  >
    <div className={styles.tag}>
      <ErrorOutlineOutlined />
      <Trans>Invalid</Trans>
    </div>
  </TextInfoTooltip>
);
