import { css } from "@emotion/css";
import * as common from "@klimadao/lib/theme/common";

export const card = css`
  ${common.cardSurface};
  display: grid;
  gap: 1.6rem;

  .loadingPlaceholder {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  .cardTitle {
    display: flex;
    gap: 0.8rem;
  }

  .cardContent {
    display: grid;
    gap: 0.8rem;
  }

  .assetEntry {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  .assetEntryLabel {
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }

  .emptyBalancesPlaceholder {
    display: grid;
    gap: 0.8rem;
  }

  .hyperlinkIcon {
    opacity: 0.5;
    color: var(--font-03);
    display: flex;
  }
`;
