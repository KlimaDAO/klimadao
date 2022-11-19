import { FC, ReactNode } from "react";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import * as styles from "./styles";
import { TextInfoTooltip } from "@klimadao/lib/components";

interface Props {
  content: ReactNode;
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
