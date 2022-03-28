import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";
import * as typography from "@klimadao/lib/theme/typography";

export const card = css`
  ${common.cardSurface};
  align-content: start;
  grid-column: 1 / 3;
  grid-template-rows: min-content 1fr;
  gap: 0.8rem;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .header .title {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .cardContent {
    display: grid;
    align-content: space-around;
    gap: 1.6rem;
  }
  .stack {
    display: grid;
    gap: 0.4rem;
    overflow: hidden;
  }

  .value {
    ${typography.h2_alt}
  }
  .label {
    ${typography.h4};
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
    .value {
      ${typography.h4}
    }
    .label {
      ${typography.h5}
    }
  }

  ${breakpoints.desktopLarge} {
    .value {
      ${typography.h2_alt}
    }
    .label {
      ${typography.h4};
    }
  }
`;
