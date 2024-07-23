import { css } from "@emotion/css";

export const selectProjectButton = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  padding: 2rem;
  background-color: var(--surface-02);
  border: 0.175rem solid var(--surface-03);
  border-radius: 0.8rem;

  &:focus,
  &:hover,
  &[data-active="true"] {
    border-color: var(--klima-green);
  }

  &[data-active="true"] {
    cursor: default;
  }
`;

export const header = css`
  display: flex;
  width: inherit;
  justify-content: space-between;
  align-items: flex-start;
`;

export const checkedIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  width: 2.4rem;
  border: 0.175rem solid var(--surface-03);
  padding: 0.4rem;
  border-radius: 0.2rem;
  transition: none;

  svg {
    display: none;
  }

  &[data-active="true"] {
    background-color: var(--klima-green);
    border-color: var(--klima-green);

    svg {
      display: block;
    }
  }
`;

export const regionLabel = css`
  color: var(--klima-green);
  font-size: 1.3rem;
`;

export const tonnageLabel = css`
  font-size: 1.3rem;
`;

export const projectDetailsLink = css`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  &:hover {
    color: var(--klima-green);
    cursor: pointer;
  }

  svg {
    padding: 0.4rem; // hacky way to make svg smaller
    color: inherit;
  }
`;
