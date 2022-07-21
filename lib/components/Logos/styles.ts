import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const logoWithClaim = css`
  max-width: 15rem;
  padding-inline-end: 1rem;

  ${breakpoints.large} {
    max-width: 20rem;
  }

  &:hover {
    opacity: 0.7;
  }
`;
