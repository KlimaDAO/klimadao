import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullheight = css`
  min-height: calc(
    100vh - (var(--footer-height) / 2 + var(--header-height) / 2)
  );

  ${breakpoints.large} {
    min-height: calc(100vh - (var(--footer-height) + var(--header-height)));
  }
`;

export const textGroup = css`
  grid-column: main;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
`;
