import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const headingLarge = css`
  font-size: 4.4rem;
  font-weight: 700;
  font-family: var(--font-family);
  color: var(--headings-color);
  line-height: 5.5rem;
  padding-bottom: 2rem;
  text-transform: uppercase;
`;

export const headingMedium = css`
  font-size: 3.2rem;
  font-weight: 600;
  font-family: var(--font-family);
  color: var(--headings-color);
  line-height: 3.9rem;
  padding-bottom: 2rem;
`;

export const headingSmall = css`
  font-size: 2rem;
  font-weight: 400;
  font-family: var(--font-family);
  color: var(--headings-color);
  line-height: 2.4rem;
  padding-bottom: 1rem;
`;

export const alignCenter = css`
  ${breakpoints.medium} {
    text-align: center;
  }
`;

export const copy = css`
  font-family: var(--font-family);
  font-weight: normal;
  font-size: var(--font-size);
  color: var(--font-color);
  line-height: 2.25rem;
  padding-bottom: 1.5rem;
`;
