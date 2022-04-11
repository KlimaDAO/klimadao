import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const changeLanguageButton = css`
  display: flex;

  ${breakpoints.small} {
    top: 3.2rem;
    right: -0.2rem;
    display: flex;
    min-height: 4.8rem;
    align-items: center;
    background-color: var(--surface-01);
    padding: 0rem 1.5rem;
    border-radius: var(--border-radius);
    align-items: center;
    align-content: center;
    justify-content: center;
    transition: opacity 0.3s ease 0s;
  }

  ${breakpoints.medium} {
    top: 9.8rem;
  }

  ${breakpoints.medium} {
    top: 10.8rem;
  }
  &:hover,
  &:focus {
    opacity: 0.7;
  }
  &:focus {
    transform: scale(0.9);
  }
  &,
  &:hover,
  &:visited {
    color: var(--font-01); /* same in darkmode */
  }
`;

export const tooltip = css`
  ${typography.caption};
  text-align: center;
  border: 1px solid var(--klima-green);
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
  color: var(--font-02) !important;
  &:hover {
    color: var(--klima-green) !important;
  }
`;

export const menuItemContainer = css`
  display: grid;
  gap: 1.6rem;
`;
