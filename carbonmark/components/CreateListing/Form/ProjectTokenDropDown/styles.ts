import { css } from "@emotion/css";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-01);
  border-radius: 1rem;
  padding: 1rem;
  min-height: 4.8rem;
  justify-content: center;
  border: 1px solid var(--font-03);
  width: 100%;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--font-03);
  }
`;

export const tippyContainer = css`
  .tippy-box {
    margin-top: 0rem;
  }
`;

export const dropDownMenu = css`
  background-color: var(--surface-01);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--shadow-03);
`;

export const projectButton = css`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 1.2rem;
  min-height: auto;
  justify-content: center;
  background-color: var(--surface-01);
  padding: 1rem;
  min-height: 4.8rem;

  &:hover {
    cursor: pointer;
    color: var(--klima-green);
  }

  &[data-active="true"] {
    color: var(--klima-green);
  }
`;
