import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

const FIVE_CARD_WIDTH = "168rem";

export const projectsControls = css`
  grid-column: full;
  max-width: calc(${FIVE_CARD_WIDTH});
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 0.8rem;
  justify-self: center;
  .desktopLogin {
    display: none;
  }
  /** Logout button is only on Desktop */
  ${breakpoints.desktop} {
    grid-template-columns: 1fr auto;
    .desktopLogin {
      display: initial;
    }
  }
`;

export const projectsList = css`
  grid-column: full;
  justify-self: center;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${FIVE_CARD_WIDTH};
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  ${breakpoints.medium} {
    max-width: 32rem;
  }
  ${breakpoints.large} {
    transition: all 0.2s ease 0s;
    &:hover {
      transform: scale(1.02);
      box-shadow: var(--shadow-02);
    }
  }
`;

export const cardDescription = css`
  background: linear-gradient(
    180deg,
    var(--font-01) 43.44%,
    rgba(49, 49, 49, 0) 92.91%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  max-height: 9rem;
  overflow: hidden;
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
`;

export const cardContent = css`
  padding: 2rem;
  display: grid;
  gap: 0.8rem;
  grid-template-rows: auto auto 1fr;
`;

export const tags = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;
