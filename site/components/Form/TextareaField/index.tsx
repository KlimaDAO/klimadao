import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows: number;
  errors?: { message?: string };
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ errors, id, label, ...props }, ref) => {
    const inputStyles = cx(styles.baseStyles, {
      [styles.errorStyles]: Boolean(errors),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={id}>
          <Text t="caption">{label}</Text>
        </label>

        <textarea
          id={id}
          ref={ref}
          type="textarea"
          className={inputStyles}
          aria-invalid={Boolean(errors)}
          {...props}
        />

        {errors && (
          <Text t="caption" className={styles.errorMessage}>
            {errors.message}
          </Text>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
