import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const socialProof_container = css`
  display: grid;
  grid-column: main;
  row-gap: 4rem;

  h2 {
    font-size: 2rem;
    text-align: center;
  }

  .socialProof_logos {
    display: grid;
    column-gap: 1.6rem;
    row-gap: 3.2rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

    ${breakpoints.large} {
      grid-template-columns: repeat(4, 1fr);
    }

    color: var(--font-03);

    [data-theme="theme-light"] & {
      color: var(--font-02);
    }
  }

  .socialProof_logos_item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
