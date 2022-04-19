import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";

export const changeLanguageButton = css`
  background-color: var(--surface-02);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  &:hover {
    opacity: 0.7;
  }
`;

export const tooltip = css`
  ${typography.caption};
  text-align: center;
  background: var(--surface-03);
  border-radius: 0.4rem;
  padding: 1.6rem;
  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 24rem !important; // fix x-overflow bug on small mobile
    }
  }
`;

export const menuItem = css`
  ${typography.button};
  padding: 0.5rem 0;
  &:hover {
    color: var(--klima-green);
  }
  &[data-active="true"] {
    color: var(--klima-green);
  }
`;
