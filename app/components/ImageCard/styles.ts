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
  }
  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;
