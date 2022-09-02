import React, { TextareaHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  errors?: { message?: string };
  errorMessageMap: (id: string) => string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const inputStyles = cx(styles.baseStyles, {
      [styles.errorStyles]: Boolean(props.errors),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={props.textareaProps.id}>
          <Text t="caption">{props.label}</Text>
        </label>

        <textarea
          id={props.textareaProps.id}
          ref={ref}
          className={inputStyles}
          aria-invalid={Boolean(props.errors)}
          {...props.textareaProps}
        />

        {props.errors && props.errors.message && (
          <Text t="caption" className={styles.errorMessage}>
            {props.errorMessageMap(props.errors.message)}
          </Text>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
