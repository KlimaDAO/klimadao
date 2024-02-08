import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const h1 = css`
  font-family: var(--font-family-secondary);
  font-size: 4.8rem;
  line-height: 4.8rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 6rem;
    line-height: 6rem;
  }
`;

export const h2 = css`
  font-family: var(--font-family-secondary);
  font-size: 3.6rem;
  line-height: 3.6rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 4.8rem;
    line-height: 4.8rem;
  }
`;

export const h3 = css`
  font-family: var(--font-family-secondary);
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
`;

export const h4 = css`
  font-family: var(--font-family-secondary);
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 600;
`;

export const h5 = css`
  font-family: var(--font-family-secondary);
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const body1 = css`
  font-family: var(--font-family);
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 0.016rem;
`;

export const body2 = css`
  font-family: var(--font-family);
  font-size: 1.4rem;
  line-height: 1.8rem;
  letter-spacing: 0.014rem;
`;

export const body3 = css`
  font-family: var(--font-family);
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.012rem;
`;

// nav text
export const body4 = css`
  font-family: var(--font-family-secondary);
  font-size: 1.4rem;
  line-height: 2.4rem;
  font-weight: 500;
`;

export const body5 = css`
  font-family: var(--font-family);
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.012rem;
`;

export const button = css`
  font-family: var(--font-family-secondary);
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.042rem;
`;

export const responsiveBody1 = css`
  font-family: var(--font-family);
  font-size: 1.4rem;
  line-height: 1.8rem;
  letter-spacing: 0.016rem;
  ${breakpoints.large} {
    font-size: 1.6rem;
    line-height: 2rem;
  }
`;

export const responsiveBody2 = css`
  font-family: var(--font-family);
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: 0.014rem;
  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export const responsiveBody3 = css`
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.4rem;
  letter-spacing: 0.012rem;
  ${breakpoints.large} {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`;
