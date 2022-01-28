import { css, keyframes } from "@emotion/css";
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
  display: grid;
  gap: 4.8rem;
  grid-column: main;
  span {
    color: var(--font-01);
  }
  .blackHole_textGroup {
    display: grid;
    gap: 7.2rem;
    padding: 0 4.8rem;
  }
  .blackHole_columns {
    display: flex;
    gap: 12rem;
  }
`;

const floatUp = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(0%, -6%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;

const floatLeft = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(-2%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;

const floatRight = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(3%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;

export const mechanicsSection = css`
  grid-column: main;
  .mechanics_textGroup {
    position: absolute;
    max-width: 48rem;
    display: grid;
    gap: 1.6rem;
  }
  .mechanics_itemGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mechanics_item {
    position: relative;
    width: 42rem;
    display: grid;
    justify-content: center;
  }
  p.align-end {
    text-align: end;
    margin-inline-end: -3.2rem;
    animation: ${floatRight} 16s ease-in-out 2s infinite;
  }
  p.align-start {
    margin-inline-start: -3.2rem;
    animation: ${floatLeft} 16s ease-in-out 2s infinite;
  }
  .mechanics_item:nth-child(1) {
    margin-inline-end: -42rem;
    animation: ${floatUp} 14s ease-in-out 1s infinite;
  }
  .mechanics_item:nth-child(2) {
    top: -4.8rem;
    animation: ${floatUp} 14s ease-in-out 3s infinite;
  }
  .mechanics_item:nth-child(3) {
    margin-inline-end: -64rem;
    top: -3.2rem;
    animation: ${floatUp} 14s ease-in-out 5s infinite;
  }
  .mechanics_label {
    position: absolute;
    display: grid;
    gap: 1.6rem;
    align-content: center;
    height: 100%;
  }
  .mechanics_item > span {
    overflow: visible !important;
  }
  .shadow-03 {
    box-shadow: var(--shadow-03);
  }
  .shadow-04 {
    box-shadow: var(--shadow-04);
  }
  .shadow-05 {
    box-shadow: var(--shadow-05);
  }
  .mechanics_img {
    border-radius: 1.6rem;
    overflow: visible;
  }
`;

export const carbonSection = css`
  grid-column: main;
  text-align: center;
  display: grid;
  gap: 5.6rem;
  span {
    color: var(--font-01);
  }
  .carbon_counterGroup {
    display: grid;
    gap: 1.6rem;
  }
  .carbon_counter {
    font-size: 6rem;
    line-height: 6rem;
    font-weight: 700;
  }
  .carbon_cardGroup {
    display: grid;
    gap: 1.6rem;
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
  height: 72rem;
  position: relative;
  padding: 6.4rem;
  .forest_label {
    font-size: 7.2rem;
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
    gap: 7.4rem;
    max-width: 42rem;
  }
  .sprouts_col1 h2 {
    max-width: 28rem;
  }
  .sprouts_col1 img {
    border-radius: 1.6rem 1.6rem 0 0;
  }

  .sprouts_col2 {
    display: flex;
    flex-direction: column;
    gap: 4.8rem;
    padding-bottom: 15.2rem;
  }
  .sprouts_col2 > div {
    display: flex;
    gap: 2.4rem;
  }
  .sprouts_col2_textGroup {
    display: grid;
    gap: 0.8rem;
  }
`;

export const buySection = css`
  display: grid;
  grid-column: main;
  grid-template-columns: 1fr 1fr;
  column-gap: 6.4rem;
  padding: 6.4rem;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;
  overflow: hidden;

  .buy_col1 {
    display: grid;
    align-self: flex-start;
    gap: 1.6rem;
    justify-items: start;
  }

  .buy_col2 {
    display: grid;
    position: relative;
  }

  .buy_dummy {
    opacity: 0.7;
    position: absolute;
    top: -2.4rem;
    right: -70%;
    width: 74rem;
    height: 48rem;
  }
`;
export const newsletterSection = css`
  display: grid;
  gap: 3.8rem;
  grid-column: main;
  justify-items: center;
  p {
    text-align: center;
    max-width: 42rem;
  }
  .newsletter_titleGroup {
    display: grid;
    gap: 2.4rem;
    justify-items: center;
  }
  .newsletter_buttonGroup {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    flex-direction: column;
  }
`;
