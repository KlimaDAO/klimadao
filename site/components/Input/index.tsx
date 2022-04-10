import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import * as typography from "@klimadao/lib/theme/typography";
import breakpoints from "@klimadao/lib/theme/breakpoints";

const StyledInput = styled.input<InputProps>`
  ${typography.caption}; // TODO: not working, syntax not compatible with styled?
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  ${breakpoints.large} {
    font-size: 1.6rem;
    line-height: 2rem;
  }

  display: block;
  width: 100%;
  min-height: 4.8rem;
  color: var(--font-01);
  background-color: var(--surface-02);
  border-radius: 1rem;
  border: 0.175rem solid var(--surface-03);
  padding-left: 1rem;
  transition: border-color 0.2s ease-in;
  outline: none;
  padding: 1rem;

  ::placeholder {
    color: var(--font-03);

    // typography.caption
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 500;

    ${breakpoints.large} {
      font-size: 1.6rem;
      line-height: 2rem;
    }
  }

  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }

  &:disabled {
    border: none;
    opacity: 0.6;
    cursor: not-allowed;
  }

  border-color: ${(props: InputProps) => props.error && "var(--warn)"};
  &:focus,
  &:hover {
    border-color: ${(props: InputProps) => props.error && "var(--warn)"};
  }
`;

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = (props: InputProps) => <StyledInput {...props} />;
