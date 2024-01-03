import { cx } from "@emotion/css";
import { Text } from "components/Text";
import React, { TextareaHTMLAttributes } from "react";
import * as styles from "./styles";

interface Props {
  id: string;
  textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  required?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
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

    // for a11y if we don't want visually show labels
    const visuallyHidden = cx(styles.inputLabel, {
      [styles.visuallyHidden]: Boolean(props.hideLabel),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={props.id} className={visuallyHidden}>
          <Text t="body1">{props.label}</Text>
          {props.required && <span className={styles.required}>*</span>}
        </label>

        <textarea
          id={props.id}
          ref={ref}
          aria-invalid={!!props.errorMessage}
          {...props.textareaProps}
          className={inputStyles}
        />

        {!!props.errorMessage && (
          <Text t="body1" className={styles.errorMessage}>
            {props.errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
