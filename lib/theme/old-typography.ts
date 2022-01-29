import { css } from "@emotion/css";
import breakpoints from "./breakpoints";

const h1 = css`
  --font-size: 9.6rem;
  font-size: var(--font-size);
  font-weight: 300;
  line-height: 117%;
  letter-spacing: -0.15rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h2 = css`
  --font-size: 6rem;
  font-size: var(--font-size);
  font-weight: 300;
  font-size: 6rem;
  line-height: 120%;
  letter-spacing: -0.05rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h3 = css`
  --font-size: 4.8rem;
  font-size: var(--font-size);
  font-weight: normal;
  font-size: 4.8rem;
  line-height: 117%;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h4 = css`
  --font-size: 3.4rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 106%;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h4_decorative = css`
  composes: h4;
  font-family: var(--font-family-decorative);
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h5 = css`
  --font-size: 2.4rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 100%;
  letter-spacing: 0.018rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h5_decorative = css`
  composes: h5;
  font-family: var(--font-family-decorative);
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const h6 = css`
  --font-size: 2rem;
  font-size: var(--font-size);
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.015rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const body1 = css`
  --font-size: 1.6rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0.05rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const body2 = css`
  --font-size: 1.4rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 143%;
  letter-spacing: 0.025rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const subtitle1 = css`
  --font-size: 1.6rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0.015rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const subtitle2 = css`
  --font-size: 1.4rem;
  font-size: var(--font-size);
  font-weight: 500;
  line-height: 171%;
  letter-spacing: 0.01rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const button = css`
  --font-size: 1.4rem;
  font-size: var(--font-size);
  font-weight: 500;
  line-height: 114%;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const overline = css`
  --font-size: 1rem;
  font-size: var(--font-size);
  font-weight: 500;
  line-height: 160%;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;
const caption = css`
  --font-size: 1.2rem;
  font-size: var(--font-size);
  font-weight: normal;
  line-height: 133%;
  letter-spacing: 0.04rem;
  ${breakpoints.medium} {
    font-size: calc(var(--font-size) * 1.25);
  }
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h4_decorative,
  h5,
  h5_decorative,
  h6,
  body1,
  body2,
  subtitle1,
  subtitle2,
  button,
  overline,
  caption,
};
