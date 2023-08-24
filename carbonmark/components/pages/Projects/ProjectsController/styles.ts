import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { FIVE_CARD_WIDTH } from "../styles";

export const absolute = css`
  position: absolute;
  z-index: 1;
  padding: 4rem;
`;

export const controller = css`
  width: 100%;
  grid-template-columns: inherit;
  display: grid;
  grid-column: full;
  gap: 0.8rem;
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
  grid-column: full;
  max-width: 168rem;
  align-items: center;
  justify-self: center;
  margin-bottom: 0.8rem;
`;

export const displayToggle = css`
  margin-left: auto;
`;

/** List view is only available on Desktop */
export const viewToggle = css`
  display: none;

  ${breakpoints.desktop} {
    display: flex;

    & button {
      width: 4.8rem;
      border-radius: 0.4rem;
      color: black !important;
      background: white !important;

      &.selected {
        background: var(--yellow) !important;
      }
    }

    & div {
      :first-of-type {
        button {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      :last-of-type {
        button {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
`;
