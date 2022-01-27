import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const heroSection = css`
  display: grid;
  grid-column: main;
  row-gap: 6.4rem;

  .hero_learnMore {
    display: grid;
    justify-items: center;
    row-gap: 0.8rem;
  }

  .hero_learnMore svg {
    font-size: 2rem;
  }

  .hero_button {
    ${breakpoints.medium} {
      display: none;
    }
  }

  .hero_title {
    display: grid;
    gap: 0.4rem;
  }
`;

export const blackHoleSection = css`
  grid-column: main;
  span {
    color: var(--font-01);
  }
`;

export const mechanicsSection = css`
  grid-column: main;
  .mechanics_item {
    position: relative;
  }
  .mechanics_label {
    position: absolute;
    top: 0;
  }
  .mechanics_img {
    border-radius: 1.6rem;
  }
`;

export const carbonSection = css`
  grid-column: main;
  text-align: center;

  span {
    color: var(--font-01);
  }
  .carbon_counter {
    font-size: 6rem;
    line-height: 6rem;
    font-weight: 700;
  }
  .carbon_card {
    display: grid;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    overflow: hidden;
    box-shadow: var(--shadow-01);
  }
  .carbon_card_label {
    display: grid;
    gap: 0.4rem;
    padding: 2rem 2.8rem;
  }
  ${breakpoints.medium} {
    .carbon_counter {
      font-size: 8.8rem;
      line-height: 8.8rem;
    }
  }
`;

export const forestSection = css`
  grid-column: full;
  display: grid;
  height: 64rem;
  position: relative;
  padding: 3.2rem;
  .forest_label {
    grid-column: main;
    z-index: 1;
    text-align: end;
    justify-self: end;
    align-self: end;
  }
`;

export const sproutsSection = css`
  display: grid;
  grid-column: main;
  grid-template-columns: 1fr 1fr;
  .sprouts_col1 {
    display: grid;
  }

  .sprouts_col2 {
    display: grid;
  }
`;

export const buySection = css`
  display: grid;
  grid-column: main;
  grid-template-columns: 1fr 1fr;
  padding: 3.2rem;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;

  .buy_col1 {
    display: grid;
  }

  .buy_col2 {
    display: grid;
  }
`;
