import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const retirementDate = css`
  gap: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    fill: var(--font-03);
  }

  ${breakpoints.desktop} {
    justify-content: unset;
  }
`;
