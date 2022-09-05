import React, { InputHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { FieldError } from "react-hook-form";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

import { PledgeErrorId } from "components/pages/Pledge/lib/formSchema";

interface Props {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  hideLabel?: boolean;
  errors?: { message?: FieldError["message"] };
  errorMessageMap: (id: PledgeErrorId) => string;
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: Boolean(props.errors),
      },
      props.inputProps.className
    );
    // for a11y if we don't want visually show labels
    const visuallyHidden = cx({
      [styles.visuallyHidden]: Boolean(props.hideLabel),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={props.inputProps.id} className={visuallyHidden}>
          <Text t="caption">{props.label}</Text>
        </label>

        <input
          id={props.inputProps.id}
          ref={ref}
          aria-invalid={Boolean(props.errors)}
          {...props.inputProps}
          className={inputStyles}
        />

        {props.errors && props.errors.message && (
          <Text t="caption" className={styles.errorMessage}>
            {props.errorMessageMap(props.errors.message as PledgeErrorId)}
          </Text>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
