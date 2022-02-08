import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import React, { FC } from "react";
import * as styles from "./styles";
import { TextInfoTooltip } from "@klimadao/lib/components";

interface Props {
  content: string | React.ReactNode;
}

export const InfoButton: FC<Props> = (props) => {
  return (
    <TextInfoTooltip content={props.content} placement="top-start">
      <button className={styles.infoButton}>
        <HelpOutlineRounded />
      </button>
    </TextInfoTooltip>
  );
};
