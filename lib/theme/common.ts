import { css } from "@emotion/css";
import breakpoints from "./breakpoints";

export const cardSurface = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

/** Container for a button with a centered icon */
export const iconButton = css`
  background-color: var(--surface-01);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  svg {
    font-size: 2.4rem;
  }
  &:hover {
    opacity: 0.7rem;
  }
`;
