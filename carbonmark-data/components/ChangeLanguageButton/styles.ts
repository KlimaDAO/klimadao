import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const changeLanguageButton = css`
  min-width: 48px;
  min-height: 48px;
  width: 48px;
  height: 48px;
  color: var(--text-color-01);
  background-color: var(--surface-01);
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const tooltip = css`
  ${typography.body1};
  text-align: center;
  background: white;
  border-radius: 0.8rem;
  padding: 0 1.2rem;
  min-width: 15rem;
  box-shadow:
    0px 4px 4px rgba(0, 0, 0, 0.24),
    0px 0px 4px rgba(0, 0, 0, 0.12);

  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 24rem !important; // fix x-overflow bug on small mobile
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
