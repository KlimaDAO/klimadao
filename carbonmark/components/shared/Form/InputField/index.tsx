import { cx } from "@emotion/css";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import React, { InputHTMLAttributes } from "react";
import * as styles from "./styles";

export interface InputFieldProps {
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  infoTooltip?: string;
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
    const visuallyHidden = cx(styles.inputLabel, {
      [styles.visuallyHidden]: Boolean(props.hideLabel),
    });

    return (
      <div className={styles.container}>
        <label htmlFor={props.id} className={visuallyHidden}>
          <Text t="body1">{props.label}</Text>
          {props.infoTooltip && (
            <TextInfoTooltip tooltip={props.infoTooltip}>
              <HelpOutline className={styles.tooltipHelpIcon} />
            </TextInfoTooltip>
          )}
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
          <Text t="body1" className={styles.errorMessage}>
            {props.errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
