import React from "react";

import { Input, InputProps } from "../Input";

type TextareaProps = InputProps & {
  rows?: number;
};

export const Textarea = (props: TextareaProps) => (
  <Input rows={props.rows} {...props} />
);

Textarea.defaultProps = {
  as: "textarea",
  rows: 6,
};
