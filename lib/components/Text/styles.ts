import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const heading1 = css`
  font-size: 4.4rem;
  font-weight: 700;
  font-family: var(--font-family);
  color: var(--headings-color);
  line-height: 5.5rem;
  padding-bottom: 2rem;
`;

export const headingCentered = css`
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
