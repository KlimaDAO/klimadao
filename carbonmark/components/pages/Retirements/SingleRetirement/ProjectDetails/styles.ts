import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectDetails = css`
  width: 100%;
  padding: 2rem 1.5rem;
  border: 1px solid var(--manatee);

  ${breakpoints.desktop} {
    padding: 3rem 4rem;
  }
`;

export const textGroup = css`
  gap: 0.8rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;

export const imageWrapper = css`
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  grid-column: main;
  padding: 7.2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

export const placeholder = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
`;

export const officialText = css`
  gap: 1rem;
  display: flex;
  align-items: center;
  margin: 1rem 0 2.1rem;
`;

export const profileLink = css`
  display: flex;
  gap: 1.45rem;
  margin-top: 0.2rem;
  align-items: center;
  color: var(--bright-blue);
`;
