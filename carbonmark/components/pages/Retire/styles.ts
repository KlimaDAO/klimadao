import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: main;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;

  margin: 1.6rem;

  ${breakpoints.desktop} {
    margin: 4rem;
  }
`;

export const retireControls = css`
  grid-column: main;
  flex-direction: row-reverse;
  display: none;

  ${breakpoints.desktop} {
    display: flex;
  }
`;

export const spinnerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const beneficiary = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  .highlight {
    color: var(--bright-blue);
  }

  .copyButton {
    background: none;
    background-color: transparent !important;
    svg path {
      fill: var(--bright-blue);
    }
  }
`;
