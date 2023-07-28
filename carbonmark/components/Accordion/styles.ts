import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const main = css`
  width: 100%;
  border-bottom: 1px solid var(--surface-02);
  padding: 0.6rem 0;

  .content {
    padding: 1rem 0.4rem;
    overflow: hidden;
    display: none;
    max-height: 0;
    transition: 2s;
  }

  button > svg {
    transform: rotate(270deg);
  }

  &[data-open="true"] {
    button > svg {
      transform: rotate(180deg);
    }

    .content {
      display: block;
      max-height: fit-content;
    }
  }
`;

export const label = css`
  ${typography.h5};
  font-size: 1.6rem !important;
`;

export const subtitle = css`
  ${typography.body1};
  margin-left: 0.6rem;
  color: var(--font-02);
`;

export const toggle = css`
  width: 100%;
  padding: 1rem 0.4rem;
  display: flex;
  align-items: center;
  svg {
    margin-left: auto;
  }
`;
