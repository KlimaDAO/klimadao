import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const errorPageWrapper = css`
  display: block;
  grid-column: full;
  grid-template-columns: inherit;
  min-height: 100vh;
  grid-template-rows: 1fr auto;
  height: calc(100vh - 17.6rem);

  section {
    height: calc(100vh - 34rem);
  }

  ${breakpoints.large} {
    grid-template-rows: auto 1fr auto;

    section {
      height: calc(100vh - 17.6rem);
    }
  }
`;

export const textGroup = css`
  grid-column: main;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
`;
