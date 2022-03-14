import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";
import * as typography from "@klimadao/lib/theme/typography";

export const card = css`
  ${common.cardSurface};
  align-content: start;
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

export const row = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  border-bottom: 0.1rem solid var(--surface-03);
  padding-bottom: 1.6rem;
  margin-bottom: 1.6rem;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .image {
    max-height: 6.4rem;
    max-width: 6.4rem;
  }
`;
