import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const title = css`
  text-transform: uppercase;
  text-align: center;
  ${breakpoints.medium} {
    text-align: start;
  }
`;

export const description = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ol = css`
  list-style-position: inside;
  li {
    ${typography.body1}
    color: var(--font-02);
  }
`;

export const link = css`
  color: var(--klima-green);
`;

export const card = css`
  display: grid;
  grid-template-rows: max-content 1fr;

  gap: 1rem;
  ${breakpoints.medium} {
    grid-template-columns: 1fr 3fr;
  }
  .index {
    justify-self: center;
  }
  .content {
    display: grid;
    gap: 1.6rem;
  }
  ${breakpoints.medium} {
    .index::after {
      content: "";
      height: 100%;
      display: flex;
      background: var(--font-02);
      margin: auto;
      width: 0.3rem;
      margin-top: 2rem;
    }
  }
`;

export const iframeContainer = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
