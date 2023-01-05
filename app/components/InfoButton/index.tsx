import { TextInfoTooltip } from "@klimadao/lib/components";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

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
