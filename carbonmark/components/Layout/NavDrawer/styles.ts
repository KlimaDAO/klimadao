import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  padding: 2.4rem;
  background-color: var(--surface-01);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 3;
  gap: 1.6rem;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  ${breakpoints.large} {
    gap: 2.4rem;
    padding: 3.2rem;
  }

  #klima-logo {
    height: 2.8rem;
    width: auto;
  }

  .hr {
    height: 0.2rem;
    width: 100%;
    background-color: var(--surface-02);
  }

  .labelStack {
    display: grid;
    gap: 0.8rem;
  }

  .navFooter {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .navFooter .hr {
    grid-row: 1 / 1;
    grid-column: 1 / 4;
  }

  .domain-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    padding-top: 0.5rem;
    gap: 1rem;
  }

  .connectButton {
    width: 100%;
  }

  .avatar {
    height: 4rem;
    width: 4rem;
    min-width: 4rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 4rem;
      width: 4rem;
    }
    overflow: hidden;
  }

  .domain-name {
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
  }
`;

export const footer_icons = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  flex-wrap: wrap;

  svg {
    width: 1.6rem;
  }

  & svg path {
    fill: var(--font-02);
  }

  & svg:hover path {
    fill: var(--font-01);
  }
`;

export const addressContainer = css`
  display: grid;
  gap: 1.6rem;
  ${breakpoints.large} {
    gap: 2.4rem;
  }
`;

export const mobile = {
  header: css`
    display: flex;
    flex-direction: row-reverse;
    .close {
      width: 4.8rem;
      color: var(--font-01) !important;
      background-color: var(--surface-02) !important;
    }
  `,
};

export const betaWrapperDesktop = css`
  display: none;
  ${breakpoints.desktop} {
    display: flex;
    justify-content: center;
  }
`;

export const loginWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const logo = css`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    max-height: 10.2rem;
    max-width: 18rem;
  }
`;
