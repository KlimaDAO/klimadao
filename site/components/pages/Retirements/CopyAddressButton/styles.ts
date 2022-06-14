import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";

export const copyButton = css`
  ${typography.body1}
  justify-self: start;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

export const medium = css`
  ${typography.body1}
`;

export const small = css`
  ${copyButton}
  ${typography.caption}
  color: var(--font-02);
`;
