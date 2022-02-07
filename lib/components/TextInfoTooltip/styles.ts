import { css } from "@emotion/css";
import * as typography from "../../theme/typography";

const tooltip = css`
  ${typography.caption};
  text-align: center;
  color: var(--font-01);
  border: 2px solid var(--surface-01);
  background-color: var(--surface-03);
  border-radius: 0.4rem;
  padding: 0.8rem 1rem;
  .tippy-arrow {
    width: 0.8rem;
    height: 0.8rem;
  }
  /** create two arrows, offset 1, to create outline border effect */
  .tippy-arrow::before,
  .tippy-arrow::after {
    content: "";
    position: absolute;
    border-color: transparent;
    border-style: solid;
  }
  &[data-placement^="top"] > .tippy-arrow {
    bottom: 0;

    &::before,
    &::after {
      bottom: -0.8rem;
      left: -0.4rem;
      border-width: 0.8rem 0.8rem 0;
      border-top-color: var(--surface-01);
      transform-origin: center top;
    }
    &::after {
      bottom: -0.6rem;
      border-top-color: var(--surface-03);
    }
  }
  &[data-placement^="bottom"] > .tippy-arrow {
    top: -0.4rem;
  }
  &[data-placement^="left"] > .tippy-arrow {
    right: -0.4rem;
  }
  &[data-placement^="right"] > .tippy-arrow {
    left: -0.4rem;
  }
  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 24rem !important; // fix x-overflow bug on small mobile
    }
  }
`;

const targetWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default {
  tooltip,
  targetWrapper,
};
