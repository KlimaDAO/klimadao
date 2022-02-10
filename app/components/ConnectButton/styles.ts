import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";

export const connect = css`
  ${typography.button};
  background-color: var(--surface-02);
  min-height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 1.6rem;
  border-radius: 0.8rem;
  &:hover,
  &:focus {
    opacity: 0.7;
  }
`;

export const disconnect = css`
  ${connect};
`;
