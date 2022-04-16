import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: { message?: string };
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ errors, id, label, ...props }, ref) => {
    const inputStyles = cx(styles.baseStyles, {
      [styles.errorStyles]: Boolean(errors),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={id}>
          <Text t="caption">{label}</Text>
        </label>
        <input
          id={id}
          className={inputStyles}
          ref={ref}
          aria-invalid={Boolean(errors)}
          {...props}
        />

        {errors && (
          <div className={styles.errorMessage}>
            <Text t="caption">{errors.message}</Text>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
