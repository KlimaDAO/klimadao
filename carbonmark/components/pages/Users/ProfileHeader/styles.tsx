import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const profileHeader = css`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-direction: column;
  ${breakpoints.medium} {
    flex-direction: row;
  }
`;

export const profileLogo = css`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .notRegisteredSvg {
    width: 3rem;
    height: 3rem;
    color: var(--font-03);
  }
`;

export const profileText = css`
  display: grid;
  gap: 1.2rem;
  align-content: center;

  p {
    text-align: center;

    ${breakpoints.medium} {
      text-align: start;
    }
  }
`;
