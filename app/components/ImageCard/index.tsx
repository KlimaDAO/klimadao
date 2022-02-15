import { Text } from "@klimadao/lib/components";
import * as styles from "./styles";
import { FC } from "react";
import KeyboardReturnOutlined from "@mui/icons-material/KeyboardReturnOutlined";
import { urls } from "@klimadao/lib/constants";

export const ImageCard: FC = () => {
  return (
    <a href={urls.buy} className={styles.card}>
      <div className="header">
        <Text t="caption" className="title">
          New to KLIMA?
        </Text>
        <Text t="h4">How to get started</Text>
      </div>
      <div className="footer">
        <KeyboardReturnOutlined />
      </div>
    </a>
  );
};
