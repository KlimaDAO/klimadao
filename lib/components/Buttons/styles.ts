import { css } from "@emotion/css";
import { button } from "../../theme/typography";

export const button_primary = css`
  ${button};
  display: flex;
  padding: 0rem 2.4rem;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  /* min-height to conform with Lighthouse min tap-target */
  min-height: 4.8rem;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: opacity 0.3s ease 0s;
  background-color: var(--klima-green);

  &:active:not(:disabled) {
    transform: scale(0.95);
    opacity: 0.6;
  }
  &,
  &:hover:not(:disabled),
  &:visited {
    color: white; /* same in darkmode */
  }

  &:disabled {
    background-color: var(--surface-03);
    cursor: not-allowed;
  }

  &.icon {
    gap: 0.8rem;
  }
`;
export const button_secondary = css`
  ${button};
  display: flex;
  padding: 0rem 2.4rem;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  /* min-height to conform with Lighthouse min tap-target */
  min-height: 4.8rem;
  cursor: pointer;
  border: 1px solid var(--klima-green);
  border-radius: 0.4rem;
  transition: opacity 0.3s ease 0s;
  background-color: transparent;

  &:active:not(:disabled) {
    transform: scale(0.95);
    opacity: 0.6;
  }
  &,
  &:hover:not(:disabled),
  &:visited {
    color: var(--klima-green); /* same in darkmode */
  }

  &:disabled {
    border-color: var(--surface-03);
    cursor: not-allowed;
  }

  &.icon {
    gap: 0.8rem;
  }
`;

export const button_primary_gray = css`
  background-color: var(--surface-01);
  color: var(--font-02);

  &,
  &:hover,
  &:hover:not(:disabled),
  &:visited {
    color: var(--font-02); /* same in darkmode */
  }
`;

export const button_primary_blue = css`
  background-color: var(--klima-blue);
  color: var(--surface-01);

  &,
  &:hover,
  &:hover:not(:disabled),
  &:visited {
    color: var(--surface-01); /* same in darkmode */
  }
`;
export const button_secondary_gray = css`
  border-color: var(--surface-01);
  color: var(--surface-01);

  &,
  &:hover,
  &:hover:not(:disabled),
  &:visited {
    color: var(--surface-01); /* same in darkmode */
  }
`;

export const button_secondary_blue = css`
  border-color: var(--klima-blue);
  color: var(--klima-blue);

  &,
  &:hover,
  &:hover:not(:disabled),
  &:visited {
    color: var(--klima-blue); /* same in darkmode */
  }
`;
