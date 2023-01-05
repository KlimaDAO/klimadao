import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import KeyboardReturnOutlined from "@mui/icons-material/KeyboardReturnOutlined";
import { FC } from "react";
import * as styles from "./styles";

export const ImageCard: FC = () => {
  return (
    <a href={urls.buy} className={styles.card}>
      <div className="header">
        <Text t="caption" className="title">
          <Trans id="imagecard.new_to_klima">New to KLIMA?</Trans>
        </Text>
        <Text t="h4">
          <Trans id="imagecard.how_to_get_started">How to get started</Trans>
        </Text>
      </div>
      <div className="footer">
        <KeyboardReturnOutlined />
      </div>
    </a>
  );
};
