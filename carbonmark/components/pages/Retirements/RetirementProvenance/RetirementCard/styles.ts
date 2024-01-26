import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const wrapper = css`
  background-color: var(--surface-01);
  border-radius: 0.8rem;
  padding: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const header = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  ${breakpoints.large} {
    flex-direction: row;
    gap: 4rem;
  }
`;
export const headerItem = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  white-space: nowrap;
  p {
    text-align: center;
  }
  align-items: center;
`;
export const iconAndText = css`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  p {
    line-height: 2.7rem;
  }
`;

export const footer = css`
  display-flex;
  justify-content:center;
`;

// FIXME: Create a common style file for single retirement pages
export const profileLink = css`
  display: flex;
  gap: 1.45rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.042rem;
  margin-top: 0.2rem;
  align-items: center;
  text-transform: uppercase;
  color: var(--bright-blue);
  font-family: var(--font-family-secondary);
  justify-content: center;
`;

export const profileImage = css`
  width: 2.4rem;
  height: 2.4rem;
  .imgUrl {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
