import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;
  grid-column: 1 / 3;
  grid-template-rows: unset !important;
  height: fit-content;

  & a {
    text-decoration: underline;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 2;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const cardMessage = css`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid var(--surface-03);

  & .title {
    gap: 1rem;
    display: flex;
    font-weight: 600;
    flex-direction: row;
    align-items: center;

    & svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  & .description {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  a {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-decoration: underline;
  }

  ${breakpoints.desktopLarge} {
    margin-top: 2.4rem;
  }
`;

export const buttons = css`
  gap: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .secondary-button {
    background-color: var(--white);
  }

  a {
    flex: 1;
    width: 100%;
    padding: 0;
    font-size: 1.4rem;
    text-decoration: none;
    letter-spacing: unset;

    &.learn-more {
      letter-spacing: unset;
      text-transform: none;
      text-decoration: underline;
    }
  }

  ${breakpoints.desktopLarge} {
    gap: 2rem;
    flex-direction: row;
  }
`;

export const cardCol = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const cardRow = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: row;
`;

export const divider = css`
  width: 100%;
  height: 0.1rem;
  margin: 2.4rem 0 0.6rem;
  background: #393939;
`;

export const cardTitle = css`
  gap: 1.2rem;
  display: flex;
  font-weight: 600;
  align-items: center;
  font-weight: 500;
  line-height: 2.8rem;
  font-size: 2.4rem !important;
`;

export const cardDescription = css`
  font-weight: 500;
  font-size: 1.4rem !important;
  line-height: 1.8rem !important;
`;

export const responsiveButtonWidth = css`
  ${breakpoints.desktopLarge} {
    max-width: 30rem;
  }
`;
