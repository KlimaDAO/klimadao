import { ClassNamesArg, cx } from "@emotion/css";
import { Celebration, Close } from "@mui/icons-material";
import { Text } from "components/Text";
import { isEmpty } from "lodash";
import React, { FC } from "react";
import * as styles from "./styles";

type Props = {
  title?: string;
  isVisible: boolean;
  showClose?: boolean;
  description: string | React.ReactNode;
  onClose?: () => void;
  isInitialBanner: boolean;
  customCss?: ClassNamesArg;
  children?: React.ReactNode;
  featureLabel?: React.ReactNode;
};

const FeatureBanner: FC<Props> = (props) => {
  return (
    <div
      className={cx(styles.banner, props.customCss, {
        "feature-banner": !!props.isVisible,
        "initial-banner": !!props.isVisible && !!props.isInitialBanner,
      })}
    >
      {props.showClose && <Close className="close" onClick={props.onClose} />}
      <div className="contents">
        <div className="title">
          {!isEmpty(props.featureLabel) && (
            <div className="new-feature">
              <Celebration />
              <Text>{props.featureLabel}</Text>
            </div>
          )}
          {props.title && <Text>{props.title}</Text>}
        </div>
        <Text>{props.description}</Text>
        {props.children && (
          <div className={styles.buttons}>{props.children}</div>
        )}
      </div>
    </div>
  );
};

export default FeatureBanner;
