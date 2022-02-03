import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const contactContainer = css`
  grid-column: main;

  ${breakpoints.medium} {
    display: grid;
    grid-template-columns:
      [contact_full-start] minmax(20rem, 1fr)
      [contact_inner-start] minmax(0, 107.2rem)
      [contact_inner-end] minmax(20rem, 1fr)
      [contact_full-end];

    gap: 2.5rem;
  }
`;

export const contact_textGroup = css`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.5rem;

  a {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }

  ${breakpoints.medium} {
    grid-column: contact_inner;
  }
`;
