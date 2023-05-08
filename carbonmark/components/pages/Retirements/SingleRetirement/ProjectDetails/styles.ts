import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-top: 5rem;
  padding-bottom: 4rem;
  ${breakpoints.medium} {
    padding-top: 9rem;
    padding-bottom: 4rem;
  }
`;

export const projectDetails = css`
  background-color: var(--surface-01);
  border-radius: 1.2rem;
  grid-column: main;
  display: grid;
  gap: 2.4rem;
  padding: 2.4rem;

  ${breakpoints.medium} {
    padding: 5.2rem;
  }
`;

export const title = css`
  display: grid;
  gap: 0.8rem;
`;

export const list = css`
  display: grid;
  gap: 1.2rem;

  .link {
    color: var(--font-01);
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }

    .svg {
      display: inline-flex;
      align-self: center;
      top: 0.125em; // em to perfectly align with inline breaks
      position: relative;
      left: 0.4rem;
    }
  }

  .button_link {
    align-items: flex-start;
    display: flex;
    a {
      color: var(--klima-green);
    }
  }
`;
