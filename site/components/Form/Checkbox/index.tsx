import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  errorMessage?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: !!props.errorMessage,
      },
      props.inputProps.className
    );

    return (
      <div className={styles.checkboxContainer}>
        <input
          id={props.inputProps.id}
          ref={ref}
          aria-invalid={!!props.errorMessage}
          {...props.inputProps}
          type="checkbox"
          className={inputStyles}
        />
        <label htmlFor={props.inputProps.id} className={styles.label}>
          <Text t="caption">{props.label}</Text>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
