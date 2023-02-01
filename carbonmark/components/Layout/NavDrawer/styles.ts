import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";

export const container = css`
  position: relative;
  padding: 3.2rem;
  background-color: var(--surface-01);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 3;
  gap: 2.4rem;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

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
    gap: 3.2rem;
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

  .navFooter_buttons {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 4.2rem);
    justify-content: center;
    gap: 1rem;

    ${breakpoints.desktop} {
      gap: 1rem;
      grid-template-columns: repeat(4, 4.6rem);
    }
  }

  .navFooter_button {
    ${common.iconButton};
    min-height: 4.2rem;
    min-width: 4.2rem;

    ${breakpoints.desktop} {
      min-height: 4.6rem;
      min-width: 4.6rem;
    }
  }
`;

export const addressContainer = css`
  display: grid;
  gap: 1.2rem;
`;

export const mobile = {
  header: css`
    display: flex;
    justify-content: space-between;
    button {
      width: 4.8rem;
      box-shadow: var(--shadow-06);
    }
    .close {
      margin-inline-start: auto;
      background: var(--surface-02);
    }
  `,
};
