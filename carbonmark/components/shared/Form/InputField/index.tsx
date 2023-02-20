import { cx } from "@emotion/css";
import React, { InputHTMLAttributes } from "react";

import { Text } from "components/Text";

import * as styles from "./styles";

export interface InputFieldProps {
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  hideLabel?: boolean;
  errorMessage?: string;
  icon?: JSX.Element;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: !!props.errorMessage,
        [styles.withIcon]: !!props.icon,
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

        {!!props.icon && <div className={styles.icon}>{props.icon}</div>}

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
