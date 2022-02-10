import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const title = css`
  text-transform: uppercase;
  text-align: center;
  ${breakpoints.medium} {
    text-align: start;
  }
`;

export const description = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ol = css`
  list-style-position: inside;
  li {
    ${typography.body1}
    color: var(--font-02);
  }
`;

export const link = css`
  color: var(--klima-green);
`;

export const card = css`
  display: grid;
  grid-template-rows: max-content 1fr;

  gap: 1rem;
  ${breakpoints.medium} {
    grid-template-columns: 1fr 3fr;
  }
  .index {
    justify-self: center;
  }
  ${breakpoints.medium} {
    .index::after {
      content: "";
      height: 100%;
      display: flex;
      background: var(--font-02);
      margin: auto;
      width: 0.3rem;
      margin-top: 2rem;
    }
  }
`;
