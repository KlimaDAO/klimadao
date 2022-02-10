import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { button } from "@klimadao/lib/theme/typography";

export const section = css`
  ${breakpoints.medium} {
    padding-top: 9.6rem;
    padding-bottom: 10rem;
  }
`;

export const buyContainer = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  ${breakpoints.medium} {
    gap: 5.2rem;
  }
`;

export const buy_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
  p {
    max-width: 57rem;
  }
`;

export const cardGroup = css`
  display: grid;
  justify-items: center;
  gap: 1.6rem;
  .cardGroup_stack {
    display: flex;
    flex-wrap: wrap;
    gap: 3.2rem;
    justify-content: center;
  }
  .card {
    display: grid;
    background-color: var(--surface-01);
    border-radius: 0.8rem;
    overflow: hidden;
  }
  .card .bondCarbon {
    background-color: #000;
  }
  .card_label {
    display: grid;
    gap: 0.4rem;
    padding: 2rem 2.8rem;
  }
`;

export const comingSoonButton = css`
  ${button};
  background-color: var(--surface-02);
  border-radius: 0.8rem;
  min-height: 5.2rem;
  padding: 0 2.4rem;
  color: var(--font-01);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const decentralizedExchangeText = css`
  display: grid;
  gap: 3rem;
  ${breakpoints.medium} {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
`;

export const br = css`
  border-top: 0.1rem solid var(--font-03);
  width: 100%;
  height: 6rem;
`;

export const cryptoSafteyTips = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const hero = css`
  position: relative;
  width: 100%;
  height: 32rem;
  .image {
    border-radius: 1.2rem;
    background-color: #000;
  }
`;
