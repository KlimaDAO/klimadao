import Tippy from "@tippyjs/react";
import { Text } from "components/Text";
import "tippy.js/dist/tippy.css";
import * as styles from "./styles";

interface TooltipProps {
  tooltipText: string;
  contentText: string;
}

export const TextInfoTooltip = (props: TooltipProps) => (
  <Tippy
    content={
      <Text t="body1" className={styles.infoText}>
        {props.contentText}
      </Text>
    }
    className={styles.tippyBox}
  >
    <span className={styles.tooltipButton}>
      <Text t="button">{props.tooltipText}</Text>
    </span>
  </Tippy>
);
