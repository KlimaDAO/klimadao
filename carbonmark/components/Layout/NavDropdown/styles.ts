import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "theme/typography";

export const navMenuButton = css`
  background-color: white;
  border: 1px solid var(--font-03);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  border-radius: 0.4rem;
  &:hover {
    opacity: 0.7;
  }

  > svg {
    width: 2rem;
    height: 2rem;
  }

  ${breakpoints.medium} {
    margin-right: 1.2rem;
  }
`;

export const userProfile = css`
  height: 5rem;
  background: white;
  border-bottom: 0.1rem solid black;
`;

export const navItem = css`
  white-space: nowrap;
  padding: 1.6rem 1.2rem;
  color: #000 !important;
`;

export const tooltip = css`
  ${typography.body1};
  text-align: center;
  background: white;
  border-radius: 0.4rem;
  padding: 0 1.2rem;
  min-width: 30rem;
  box-shadow:
    0px 4px 4px rgba(0, 0, 0, 0.24),
    0px 0px 4px rgba(0, 0, 0, 0.12);

  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 3rem !important; // fix x-overflow bug on small mobile
    }
  }

  .tippy-content {
    padding: 0.5rem 0;
    button {
      box-shadow: none;
    }
  }

  .tippy-arrow {
    display: none;
  }
`;

export const menuItem = css`
  ${typography.body1};
  padding: 0;
  height: 4.4rem;
  align-items: center;
  &:hover {
    color: var(--bright-blue);
  }
  &[data-active="true"] {
    color: var(--bright-blue);
  }
`;
