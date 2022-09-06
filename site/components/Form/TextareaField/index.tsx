import React, { TextareaHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  errorMessage: false | string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: !!props.errorMessage,
      },
      props.textareaProps.className
    );

    return (
      <div className={styles.container}>
        <label htmlFor={props.textareaProps.id}>
          <Text t="caption">{props.label}</Text>
        </label>

        <textarea
          id={props.textareaProps.id}
          ref={ref}
          aria-invalid={!!props.errorMessage}
          {...props.textareaProps}
          className={inputStyles}
        />

        {!!props.errorMessage && (
          <Text t="caption" className={styles.errorMessage}>
            {props.errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
