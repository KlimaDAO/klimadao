import { css } from "@emotion/css";

export const retirementTypeButton = css`
  width: 100%;
  align-items: center;
  font-size: 1.4rem;
  border: 0.175rem solid var(--surface-03);
  background-color: var(--surface-02);
  padding: 0rem 2.4rem;
  border-radius: 0.8rem;
  padding: 0rem 2.4rem;
  min-height: 4.8rem;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &[data-active="true"] {
    border-color: var(--klima-green);
  }
`;
