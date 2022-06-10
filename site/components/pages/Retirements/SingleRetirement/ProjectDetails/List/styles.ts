import { css } from "@emotion/css";
import { THEME_LIGHT } from "@klimadao/lib/theme/constants";

export const listItem = css`
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
