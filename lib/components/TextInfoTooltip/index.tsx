import React, { FC } from "react";
import Tippy from "@tippyjs/react";
import styles from "./styles";

interface Props {
  /** String to be displayed in the tooltip. */
  content: string;
  /** Must be a focusable plain JSX element. Wrap with <span tabindex="0"> if needed. */
  children: JSX.Element;
}

export const TextInfoTooltip: FC<Props> = (props) => {
  /** Tippy needs to inject a ref, so the child must be a jsx element */
  const isJSXElement =
    !!props.children &&
    React.Children.count(props.children) === 1 &&
    typeof props.children.type === "string";

  return (
    <Tippy content={props.content} className={styles.tooltip}>
      {isJSXElement ? (
        props.children
      ) : (
        <div tabIndex={0} className={styles.targetWrapper}>
          {props.children}
        </div>
      )}
    </Tippy>
  );
};
