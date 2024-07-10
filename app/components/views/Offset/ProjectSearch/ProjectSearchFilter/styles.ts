import { css } from "@emotion/css";

export const dropdownContainer = css`
  padding: 1.4rem 1.2rem 0 1.2rem;
  border: 0.175rem solid var(--surface-03);
  border-bottom: 0;

  :first-of-type {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }

  :last-of-type {
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    border-bottom: 0.175rem solid var(--surface-03);
  }
`;

export const titleContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.4rem;
  cursor: pointer;

  svg {
    color: var(--font-02);
    width: 4rem;
    height: 4rem;
  }
`;

export const title = css`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const selectedCount = css`
  color: var(--klima-green);
  font-size: 1.35rem;
`;

export const selectOptions = css`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.4rem;
  gap: 1rem;
  max-height: 22rem;
  overflow-y: scroll;
`;

export const checkboxGroup = css`
  color: var(--white);
  transition: none;
  word-break: word-break;
  line-height: 2.4rem;

  label {
    display: flex;
  }
`;
