import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const retirementGroup = css`
  margin: 2rem 0 0;

  & .amount {
    font-size: 10rem;
    line-height: 10rem;
    text-align: center;
    color: var(--bright-blue);
    letter-spacing: -0.04em;
  }

  p {
    text-align: center;
  }

  ${breakpoints.desktop} {
    text-align: left;

    & .amount {
      font-size: 16rem;
      line-height: 16rem;
      text-align: left;
    }

    p {
      text-align: left;
    }
  }
`;
