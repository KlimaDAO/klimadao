import { css } from "@emotion/css";
import breakpoints from "./breakpoints";

export const h1 = css`
  font-size: 4.8rem;
  line-height: 4.8rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 6rem;
    line-height: 6rem;
  }
`;
export const h2 = css`
  font-size: 3.6rem;
  line-height: 3.6rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 4.8rem;
    line-height: 4.8rem;
  }
`;
export const h2_alt = css`
  font-size: 3.6rem;
  line-height: 4rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 4.8rem;
    line-height: 5.2rem;
  }
`;
export const h3 = css`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
`;
export const h4 = css`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 2.4rem;
    line-height: 3rem;
  }
`;
export const h5 = css`
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`;
export const body1 = css`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 500;
  ${breakpoints.large} {
    font-size: 2.2rem;
    line-height: 3.2rem;
  }
`;
export const body2 = css`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 400;
  ${breakpoints.large} {
    font-size: 2.2rem;
    line-height: 3.2rem;
  }
`;
export const body3 = css`
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`;
export const caption = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  ${breakpoints.large} {
    font-size: 1.6rem;
    line-height: 2rem;
  }
`;
export const button = css`
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.06rem;
  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
`;
export const badge = css`
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.06rem;
`;
