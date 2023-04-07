import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.75rem;
`;

export const inputLabel = css`
  display: flex;
  gap: 0.4rem;
`;

export const tooltipHelpIcon = css`
  width: 2rem;
  height: 2rem;
  color: var(--bright-blue);
`;

export const baseStyles = css`
  font-size: 1.6rem; /** Prevent safari-zoom issue */
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
  }

  &:focus,
  &:hover {
    border-color: var(--bright-blue);
  }

  &:disabled {
    border: none;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const visuallyHidden = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`;

export const errorStyles = css`
  border-color: var(--warn);
  &:focus,
  &:hover {
    border-color: var(--warn);
  }
`;

export const errorMessage = css`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;

  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;

export const icon = css`
  position: absolute;
  top: 1.3rem;
  left: 1rem;

  svg {
    fill: var(--font-03);
  }
`;

export const withIcon = css`
  padding-left: 3.4rem;
`;
