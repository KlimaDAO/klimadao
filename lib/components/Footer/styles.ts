import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const footer = css`
  background-color: var(--surface-07);
  padding: 2rem 2.4rem;
  position: relative;

  ${breakpoints.medium} {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 4.8rem 2.4rem;
  }

  margin-top: auto;
`;

export const footer_content = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  ${breakpoints.medium} {
    text-align: center;
  }
`;

export const footer_nav = css`
  font-size: 1.4rem;
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;

  & a {
    color: var(--font-02) !important;
    padding: 0.5rem 0rem;
  }

  & a:hover {
    color: var(--font-01) !important;
  }

  ${breakpoints.medium} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & a {
      padding: 0rem 1rem;
    }
  }
`;

export const footer_icons = css`
  display: flex;
  align-items: center;

  & a {
    margin: 0 1rem;
  }

  & svg path {
    fill: var(--surface-04);
  }

  & svg path:hover {
    fill: var(--surface-02);
  }
`;
