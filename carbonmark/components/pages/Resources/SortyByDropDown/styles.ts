import { css } from "@emotion/css";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-01);
  border-radius: 1rem;
  padding: 1rem 0.8rem 1rem 1.4rem;
  min-height: 4.8rem;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--bright-blue);
  }
`;

export const tippyContainer = css`
  .tippy-content {
    background-color: var(--surface-01);
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.6rem;
  }

  .tippy-box {
    border-radius: 1rem;
    background-color: var(--surface-01);
    box-shadow: var(--shadow-03);
  }
`;
