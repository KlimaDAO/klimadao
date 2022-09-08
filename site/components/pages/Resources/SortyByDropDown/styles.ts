import { css } from "@emotion/css";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-01);
  border-radius: 1rem;
  border: 0.175rem solid var(--surface-01);
  padding: 1rem;
  min-height: 4.8rem;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--klima-green);
  }
`;

export const tippyContainer = css`
  .tippy-box {
    margin-top: -2rem;
  }
`;

export const dropDownMenu = css`
  background-color: var(--surface-01);
  padding: 1rem 2rem 1rem 0rem;
  border-radius: 0 0rem 1rem 1rem;
  box-shadow: var(--shadow-03);
`;

export const dropDownOption = css`
  ${dropdownHeader}

  &:hover {
    cursor: pointer;
    color: var(--klima-green);
  }

  &[data-active="true"] {
    color: var(--klima-green);
  }
`;
