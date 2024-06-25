import CheckIcon from "@mui/icons-material/Check";
import React, { InputHTMLAttributes } from "react";

import * as styles from "./styles";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <div className={styles.checkboxWrapper}>
    <input
      type="checkbox"
      className={styles.checkboxInput}
      ref={ref}
      {...props}
    />
    <div className={styles.checkboxBorder} />
    <CheckIcon className={styles.icon} />
  </div>
));

Checkbox.displayName = "Checkbox";
