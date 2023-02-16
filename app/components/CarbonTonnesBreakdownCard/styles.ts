import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";

export const card = css`
  ${common.cardSurface};
  align-content: start;
  grid-template-rows: min-content 1fr;
  gap: 0.8rem;
  display: none;
  ${breakpoints.large} {
    display: grid;
  }
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
    gap: 1.6rem;
    overflow: hidden;
  }
  .label {
    gap: 0.8rem;
    display: flex;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const row = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .image {
    min-height: 4.8rem;
    min-width: 4.8rem;
  }
`;
