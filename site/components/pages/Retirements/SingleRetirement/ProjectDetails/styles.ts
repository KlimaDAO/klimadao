import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { THEME_LIGHT } from "@klimadao/lib/theme/constants";

export const section = css`
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
  gap: 2.8rem;
  padding: 2.8rem 1.5rem;

  ${breakpoints.medium} {
    gap: 5.2rem;
    padding: 5.2rem;
  }
`;

export const title = css`
  display: grid;
  gap: 1.6rem;
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
  }

  .gray_button {
    background-color: var(--dark-gray);
    &:hover {
      opacity: 0.8;
    }

    [data-theme=${THEME_LIGHT}] & {
      background-color: var(--gray);
      color: white;
    }
  }
`;
