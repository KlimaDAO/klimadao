import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import React, { TextareaHTMLAttributes } from "react";

import * as styles from "./styles";

interface Props {
  id: string;
  textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  errorMessage?: string;
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
        <label htmlFor={props.id}>
          <Text t="caption">{props.label}</Text>
        </label>

        <textarea
          id={props.id}
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
