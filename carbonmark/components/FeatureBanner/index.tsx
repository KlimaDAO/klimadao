import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import { Celebration, Close } from "@mui/icons-material";
import { Text } from "components/Text";
import React, { FC } from "react";
import * as styles from "./styles";

type Props = {
  title: string;
  isVisible: boolean;
  showClose?: boolean;
  description: string;
  onClose: () => void;
  isInitialBanner: boolean;
  children: React.ReactNode;
  showNewFeatureLabel?: boolean;
};

const FeatureBanner: FC<Props> = (props) => {
  return (
    <div
      className={cx(styles.banner, {
        "feature-banner": !!props.isVisible,
        "initial-banner": !!props.isVisible && !!props.isInitialBanner,
      })}
    >
      {props.showClose && <Close className="close" onClick={props.onClose} />}
      <div className="contents">
        <div className={styles.title}>
          {props.showNewFeatureLabel && (
            <div className="new-feature">
              <Celebration />
              <Text>{t`NEW FEATURE:`}</Text>
            </div>
          )}
          <Text>{props.title}</Text>
        </div>
        <Text>{props.description}</Text>
        <div className={styles.buttons}>{props.children}</div>
      </div>
    </div>
  );
};

export default FeatureBanner;
