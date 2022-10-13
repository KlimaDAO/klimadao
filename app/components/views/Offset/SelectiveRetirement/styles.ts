import { css } from "@emotion/css";

export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const label = css`
  display: flex;
  gap: 0.8rem;
  color: white;
  align-items: center;
`;

export const secondaryContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const options = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  cursor: pointer;
`;

// dropdown

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
  min-height: 15rem;
  max-height: 22rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
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

// select project button

export const projectList = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 38rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const projectActionButtons = css`
  display: flex;
  gap: 0.8rem;
  justify-content: space-around;
  width: inherit;

  button {
    width: 100%;

    :first-of-type {
      background-color: var(--surface-01);
    }
  }
`;

export const selectProjectButton = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 2.2rem;
  background-color: var(--surface-02);
  border: 0.175rem solid var(--surface-03);
  border-radius: 0.8rem;

  &:focus,
  &:hover,
  &[data-active="true"] {
    border-color: var(--klima-green);
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
`;
