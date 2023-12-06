import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 3.6rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  ${breakpoints.desktop} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 64rem;
  align-items: center;
`;

export const title = css`
  font-family: Poppins;
  font-size: 6rem;
`;

export const header = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const social = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 2rem;
  align-items: center;
`;

