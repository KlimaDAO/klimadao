import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  hideLabel?: boolean;
  errorMessage?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: !!props.errorMessage,
      },
      props.inputProps.className
    );
    // for a11y if we don't want visually show labels
    const visuallyHidden = cx({
      [styles.visuallyHidden]: Boolean(props.hideLabel),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={props.id} className={visuallyHidden}>
          <Text t="caption">{props.label}</Text>
        </label>

        <input
          id={props.id}
          ref={ref}
          aria-invalid={Boolean(props.errorMessage)}
          {...props.inputProps}
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

InputField.displayName = "InputField";
