import { css } from "@emotion/css";
// import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-top: 8rem !important;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const buyContainer = css`
  grid-column: main;
  display: flex;
  gap: 8rem;
  flex-direction: column;
  max-width: 72rem;
  width: 100%;
  padding: 0 2.4rem;
`;

export const textGroup1 = css`
  display: flex;
  gap: 4rem;
  flex-direction: column;
  width: 100%;
`;

export const textGroup2 = css`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  width: 100%;
`;

export const textGroup3 = css``;

export const numberedItem = css`
  display: flex;
  gap: 2rem;
`;

export const bold = css`
  font-weight: 700;
`;

export const advanced_text = css`
  background: var(--surface-02);
  padding: 0.8rem 1.6rem;
  font-style: italic;
`;

export const image = css`
  object-fit: contain;
`;
