import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { FIVE_CARD_WIDTH } from "../styles";

export const absolute = css`
  position: absolute;
  z-index: 1;
  padding: 1.6rem;
  grid-column: unset;
  ${breakpoints.desktop} {
    grid-column: full;
    padding: 4rem;
  }
  // We ned to make the controls visible over variable contrast of the map
  // Using a filter so that it works with children's rounded corners
  // Filters don't allow complex shadows so unable to use var(--shadow-01)
  filter: drop-shadow(0 0.2rem 0.2rem rgba(0, 0, 0, 0.24));
`;

export const controller = css`
  width: 100%;
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const projectsControls = css`
  grid-column: full;
  max-width: calc(${FIVE_CARD_WIDTH});
  display: grid;
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

export const displayOptions = css`
  gap: 2rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  grid-column: full;
  justify-content: flex-end;
  align-items: center;
  justify-self: center;
  margin-bottom: 0.8rem;
`;

export const toggle = css`
  // margin-left: auto;
`;
