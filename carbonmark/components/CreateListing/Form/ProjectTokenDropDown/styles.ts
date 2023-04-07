import { css } from "@emotion/css";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1rem;
  min-height: 4.8rem;
  justify-content: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--blue-yellow);
  }
`;

export const tippyContainer = css`
  .tippy-box {
    margin-top: 0rem;
    background: none;
  }
`;

export const dropDownMenu = css`
  background-color: var(--surface-02);
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
  background-color: var(--surface-02);
  padding: 1rem;
  min-height: 4.8rem;

  &:hover {
    cursor: pointer;
    color: var(--blue-yellow);
  }

  &[data-active="true"] {
    color: var(--blue-yellow);
  }
`;
