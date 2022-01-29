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
  padding: 0rem
  cursor: pointer;
  border-radius: 0.4rem;
  transition: opacity 0.3s ease 0s;
  background-color: var(--klima-green);

  &:hover, &:focus {
    opacity: 0.7;
  }
  &:focus {
    transform: scale(0.9);
  }
  &, &:hover, &:visited {
    color: white; /* same in darkmode */
  }
`;

export const button_gray = css`
  background-color: var(--surface-01);
  color: var(--font-02);

  &,
  &:hover,
  &:visited {
    color: var(--font-02); /* same in darkmode */
  }
`;

export const button_gray = css`
  background-color: var(--surface-01);
  color: var(--surface-02);
`;
