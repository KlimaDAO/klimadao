import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  color: white;
  padding: 2.4rem;
  background: url("/islands.jpg");
  background-position: center;
  background-size: cover;
  border-radius: 1.2rem;
  display: grid;
  align-content: space-between;
  grid-column: 1 / 3;
  .header {
    display: grid;
    gap: 0.8rem;
  }

  .footer {
    margin-top: auto;
    display: flex;
    margin-bottom: -0.8rem;
    justify-content: flex-end;
  }

  .footer svg {
    width: 4rem;
    height: 4rem;
    transform: scaleX(-1);
    color: var(--font-01);
  }

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
    min-height: 20rem;
  }
`;
