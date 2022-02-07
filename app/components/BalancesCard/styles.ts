import { css } from "@emotion/css";
import * as common from "@klimadao/lib/theme/common";

export const card = css`
  ${common.cardSurface};

  .header {
    display: flex;
    justify-content: space-between;
  }

  .header .title {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .stack {
    display: grid;
    gap: 0.4rem;
    overflow: hidden;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
