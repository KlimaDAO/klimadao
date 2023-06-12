import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const changeLanguageButton = css`
  background-color: white;
  border: 1px solid var(--font-03);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  margin-right: 1.2rem;
  &:hover {
    opacity: 0.7;
  }
`;

export const tooltip = css`
  ${typography.body1};
  text-align: center;
  background: white;
  border-radius: 0.8rem;
  padding: 0 1.2rem;
  min-width: 15rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);

  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 24rem !important; // fix x-overflow bug on small mobile
    }
  }

  .tippy-content {
    padding: 0.5rem 0;
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
