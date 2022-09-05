import React, { TextareaHTMLAttributes } from "react";
import { cx } from "@emotion/css";
import { FieldError } from "react-hook-form";
import { Text } from "@klimadao/lib/components";

import { PledgeErrorId } from "components/pages/Pledge/lib/formSchema";
import * as styles from "./styles";

interface Props {
  textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  errors?: { message?: FieldError["message"] };
  errorMessageMap: (id: PledgeErrorId) => string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: Boolean(props.errors),
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
          aria-invalid={Boolean(props.errors)}
          {...props.textareaProps}
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

TextareaField.displayName = "TextareaField";
