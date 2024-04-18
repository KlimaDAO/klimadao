import { cx } from "@emotion/css";
import React, { FC, HTMLAttributes } from "react";
import * as typography from "../../styles/typography";
import * as styles from "./styles";

export type TypographyStyle = keyof typeof typography;

type Props = HTMLAttributes<HTMLParagraphElement> & {
  /** Which typography styles to apply. Default: body1 */
  t?: TypographyStyle;
  /** Determine the tag type to be rendered. Default: <p> */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Default=font-01, lighter=font-02, lightest=font-03 */
  color?: "default" | "lighter" | "lightest";
  /** Text align */
  align?: "start" | "center" | "end";
  /** Apply text-transform: uppercase if true */
  uppercase?: boolean;
};

/** Render any element w/ typography styles. Element and styles are independent.
 * @example
 * <Text t="h1" as="span">Hello World</Text>
 */
export const Text: FC<Props> = ({
  as = "p",
  t = "body1",
  color = "default",
  align = "start",
  uppercase = false,
  children,
  ...props
}) => {
  return React.createElement(
    as,
    {
      ...props,
      "data-color": color,
      "data-align": align,
      className: cx(typography[t], styles.text, { uppercase }, props.className),
    },
    children
  );
};
