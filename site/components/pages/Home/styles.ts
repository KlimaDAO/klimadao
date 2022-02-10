import { css, keyframes } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const heroSection = css`
  min-height: 100vh;
  padding: 0;
  .tooltip_underline {
    text-decoration: dotted;
  }
  .hero_container {
    display: grid;
    grid-template-columns: inherit;
    grid-column: full;
    row-gap: 2.4rem;
    grid-template-rows: auto 1fr;
    margin-top: 6.4rem;
  }

  .hero_newsBanner {
    ${typography.button};
    background-color: var(--surface-01);
    padding: 1.2rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 0.8rem;
    justify-content: center;
    grid-column: main;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-06);
    align-self: end;
    max-width: 48rem;
    width: 100%;
    justify-self: center;
    align-items: center;
  }

  .hero_newsBanner a {
    text-decoration: underline;
  }

  .hero_cardsGroup {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: inherit;
    grid-column: full;
    z-index: 1;
  }

  .hero_whiteCard {
    display: grid;
    align-self: end;
    gap: 1.6rem;
    grid-column: main;
    padding: 3.2rem;
    background-color: var(--surface-01);
    border-radius: 1.6rem;
    box-shadow: var(--shadow-06);
    margin-bottom: -6.4rem;
    max-width: 48rem;
    justify-self: center;
  }

  .hero_imageCard {
    grid-column: full;
    position: relative;
    z-index: -1;
  }

  .hero_learnMore {
    display: none;
    grid-column: main;
    justify-items: center;
    margin-top: 4.8rem;

    ${breakpoints.large} {
      display: grid;
    }
  }

  .hero_scrollToButton {
    display: grid;
    flex-direction: column;
    justify-items: center;
    row-gap: 0.8rem;
    align-content: center;

    &:hover {
      opacity: 0.7;
    }
  }

  .hero_scrollToButton p {
    font-size: 1.5rem;
  }

  .hero_scrollToButton svg {
    font-size: 2rem;
    fill: var(--font-01);
  }

  .hero_button {
    display: flex;
    ${breakpoints.large} {
      display: none;
    }
  }

  .hero_title {
    display: grid;
    gap: 0.4rem;
  }

  ${breakpoints.large} {
    min-height: calc(100vh - var(--header-height) * 2);
    .hero_container {
      align-content: center;
      margin-top: unset;
    }
    .hero_newsBanner {
      max-width: unset;
    }
    .hero_cardsGroup {
      display: grid;
      grid-template-rows: unset;
      grid-template-columns: 1fr 1fr;
      grid-column: main;
      z-index: 1;
      gap: 2.4rem;
    }
    .hero_whiteCard,
    .hero_imageCard {
      margin: 0;
      grid-column: unset;
      align-self: unset;
      align-content: center;
    }
    .hero_whiteCard {
      padding: 3.2rem;
      max-width: unset;
      justify-self: unset;
    }
    .hero_imageCard {
      border-radius: 1.6rem;
      overflow: hidden;
    }
  }

  ${breakpoints.desktopLarge} {
    .hero_whiteCard {
      padding: 6.4rem;
    }
  }

  @media (min-height: 900px) {
    .hero_cardsGroup {
      min-height: 40rem;
    }
  }
`;

export const blackHoleSection = css`
  display: grid;
  row-gap: 4.8rem;
  grid-column: full;
  grid-template-columns: inherit;
  span {
    color: var(--font-01);
  }
  .blackHole_textGroup {
    display: flex;
    flex-wrap: wrap;
    grid-column: main;
    gap: 3.2rem;
    padding: 0 2.4rem;
  }

  .blackHole_columns {
    display: flex;
    flex-wrap: wrap;
    gap: 3.2rem;
  }

  ${breakpoints.large} {
    grid-column: main;
    .blackHole_textGroup {
      display: grid;
      gap: 7.2rem;
      padding: 0 4.8rem;
    }
    .blackHole_textGroup h2 {
      text-align: center;
    }
    .blackHole_columns {
      display: flex;
      flex-wrap: nowrap;
      gap: 12rem;
    }
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
  display: grid;
  grid-column: main;
  row-gap: 6.4rem;
  .mechanics_textGroup {
    display: grid;
    gap: 1.6rem;
    padding: 0rem 2.4rem;
    max-width: 48rem;
  }

  .mechanics_itemGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.2rem;
    max-width: 56rem;
    align-self: center;
    justify-self: center;
    width: 100%;
  }

  .mechanics_item {
    position: relative;
    display: grid;
    justify-content: center;
  }
  p.align-end {
    text-align: end;
    margin-inline-end: -4.8rem;
    animation: ${floatRight} 14s ease-in-out 1s infinite;
  }
  p.align-start {
    margin-inline-start: -4.8rem;
    animation: ${floatLeft} 14s ease-in-out 2s infinite;
  }
  .mechanics_item:nth-child(1) {
    margin-inline-end: 2.4rem;
    animation: ${floatUp} 14s ease-in-out 1s infinite;
  }
  .mechanics_item:nth-child(2) {
    align-self: flex-end;
    animation: ${floatUp} 14s ease-in-out 3s infinite;
  }
  .mechanics_item:nth-child(3) {
    margin-inline-end: 2.4rem;
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
  .mechanics_img {
    border-radius: 1.6rem;
    overflow: visible;
    box-shadow: var(--shadow-07);
  }
  ${breakpoints.small} {
    p.align-end {
      text-align: end;
      margin-inline-end: -8.4rem;
    }
    p.align-start {
      margin-inline-start: -8.4rem;
    }
  }
  ${breakpoints.large} {
    row-gap: unset;
    .mechanics_itemGroup {
      max-width: 100%;
      margin-top: 12rem;
      padding: 0rem 9.6rem;
    }
    .mechanics_textGroup {
      position: absolute;
      max-width: 40rem;
      padding: 0;
    }
    p.align-end {
      margin-inline-end: -9.6rem;
    }
    p.align-start {
      margin-inline-start: -9.6rem;
    }
    .mechanics_item:nth-child(1) {
      align-self: center;
      margin-inline-end: -16rem;
    }
    .mechanics_item:nth-child(2) {
      margin-top: -4.8rem;
      margin-inline-end: 28rem;

      align-self: center;
    }
    .mechanics_item:nth-child(3) {
      margin-top: -8.6rem;
      align-self: flex-end;
    }
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
    word-break: break-all;
  }
  .carbon_cardGroup {
    justify-items: center;
    display: grid;
    gap: 1.6rem;
  }
  .carbon_cardGroup_stack {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;
    justify-content: center;
  }
  .carbon_card {
    display: grid;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    overflow: hidden;
  }
  .carbon_card_label {
    display: grid;
    gap: 0.4rem;
    padding: 2rem 2.8rem;
  }
  ${breakpoints.large} {
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
  padding: 3.2rem 0rem;
  .forest_label {
    font-size: 7.2rem;
    line-height: 7.2rem;
    grid-column: main;
    z-index: 1;
    text-align: end;
    justify-self: end;
    align-self: end;
    max-width: 32rem;
  }
  ${breakpoints.large} {
    padding: 6.4rem 0rem;
  }
`;

export const sproutsSection = css`
  display: grid;
  grid-column: main;
  gap: 4.8rem;
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
    flex-direction: column;
    gap: 1.6rem;
  }
  .sprouts_col2_textGroup {
    display: grid;
    gap: 0.8rem;
  }

  ${breakpoints.large} {
    grid-template-columns: 1fr 1fr;
    .sprouts_col2 > div {
      display: flex;
      flex-direction: row;
      gap: 2.4rem;
    }
  }
`;

export const buySection = css`
  display: grid;
  grid-column: main;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;
  overflow: hidden;

  .buy_col1 {
    display: grid;
    align-self: flex-start;
    gap: 1.6rem;
    justify-items: start;
    padding: 3.2rem;

    ${breakpoints.large} {
      padding: 6.4rem;
    }
  }

  .buy_col2 {
    display: flex;
    align-items: end;
  }

  .buy_dummy {
    border-radius: 2.4rem;
    margin-bottom: -0.5rem;
    margin-left: 5%;
  }

  ${breakpoints.large} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
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
