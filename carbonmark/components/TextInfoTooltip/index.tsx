import Tippy from "@tippyjs/react";
import { Text } from "components/Text";
import { ReactElement } from "react";
import "tippy.js/dist/tippy.css";
import * as styles from "./styles";

interface TooltipProps {
  tooltip: string;
  children: ReactElement;
}

export const TextInfoTooltip = (props: TooltipProps) => (
  <Tippy
    content={
      <Text t="body1" className={styles.infoText} align="center">
        {props.tooltip}
      </Text>
    }
    className={styles.tippyBox}
  >
    {props.children}
  </Tippy>
);
