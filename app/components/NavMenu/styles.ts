import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const container = css`
  position: relative;
  padding: 2.4rem;
  background-color: var(--surface-01);
  display: flex;
  flex-direction: column;
  height: 100%;

  .closeButton {
    min-height: 4.8rem;
    min-width: 4.8rem;
    color: var(--font-01);
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const sidebarButton = css`
  ${typography.button};
  display: flex;
  gap: 1.6rem;
  min-height: 4.8rem;
  border: 2px solid red;

  span {
    display: none;
  }

  ${breakpoints.medium} {
    span {
      display: initial;
    }
  }
`;
