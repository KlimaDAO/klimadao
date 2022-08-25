import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  errors?: { message?: string };
  errorMessageMap?: (id: string) => string;
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ errors, id, label, hideLabel, ...props }, ref) => {
    const inputStyles = cx(styles.baseStyles, {
      [styles.errorStyles]: Boolean(errors),
    });
    // for a11y if we don't want visually show labels
    const visuallyHidden = cx({
      [styles.visuallyHidden]: Boolean(hideLabel),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={id} className={visuallyHidden}>
          <Text t="caption">{label}</Text>
        </label>

        <input
          id={id}
          className={inputStyles}
          ref={ref}
          aria-invalid={Boolean(errors)}
          {...props}
        />

        {errors && errors.message && (
          <Text t="caption" className={styles.errorMessage}>
            {props.errorMessageMap
              ? props.errorMessageMap(errors.message)
              : errors.message}
          </Text>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
