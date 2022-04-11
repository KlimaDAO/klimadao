import React from "react";
import styled from "@emotion/styled";

import { Input, InputProps } from "../Input";

type TextareaProps = InputProps & {
  rows?: number;
};

const StyledTextarea = styled(Input)`
  resize: vertical;
`;

export const Textarea = (props: TextareaProps) => (
  <StyledTextarea rows={props.rows} {...props} />
);

Textarea.defaultProps = {
  as: "textarea",
  rows: 6,
};
