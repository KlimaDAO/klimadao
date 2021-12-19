import React, { FC } from "react";
import Tippy, { TippyProps, useSingleton } from "@tippyjs/react";
import styles from "./styles";

interface Props {
  /** String to be displayed in the tooltip. */
  content: string;
  /** Must be a focusable plain JSX element. Wrap with <span tabindex="0"> if needed. */
  children: JSX.Element;
}

export const TextInfoTooltip: FC<Props & TippyProps> = (props) => {
  const { children, content, ...tippyProps } = props;
  /** Tippy needs to inject a ref, so the child must be a jsx element */
  const isJSXElement =
    !!props.children &&
    React.Children.count(props.children) === 1 &&
    typeof props.children.type === "string";

  return (
    <Tippy content={content} className={styles.tooltip} {...tippyProps}>
      {isJSXElement ? (
        children
      ) : (
        <div tabIndex={0} className={styles.targetWrapper}>
          {children}
        </div>
      )}
    </Tippy>
  );
};

export const useTooltipSingleton = (): [
  JSX.Element,
  NonNullable<TippyProps["singleton"]>
] => {
  const [source, target] = useSingleton();
  return [
    <TextInfoTooltip
      key=""
      singleton={source}
      content=""
      moveTransition="transform 0.1s ease-out"
    >
      <div hidden />
    </TextInfoTooltip>,
    target,
  ];
};
