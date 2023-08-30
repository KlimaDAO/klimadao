import { cx } from "@emotion/css";
import Tippy, { TippyProps } from "@tippyjs/react";
import { Text } from "components/Text";
import { ReactElement } from "react";
import "tippy.js/dist/tippy.css";
import * as styles from "./styles";

interface TooltipProps {
  tooltip?: ReactElement | string;
  children: ReactElement;
  className?: string;
  align?: "start" | "end";
  tippyProps?: Partial<TippyProps>;
}

export const TextInfoTooltip = (props: TooltipProps) =>
  props.tooltip ? (
    <Tippy
      content={
        <Text
          t="body1"
          className={styles.infoText}
          align={props.align ? props.align : "center"}
        >
          {props.tooltip}
        </Text>
      }
      className={cx(styles.tippyBox, props.className)}
      {...props.tippyProps}
    >
      {props.children}
    </Tippy>
  ) : (
    <>{props.children}</>
  );
