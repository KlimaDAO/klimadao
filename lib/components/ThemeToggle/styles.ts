import { css } from "@emotion/css";
import { button } from "../../theme/typography";

export const buttonToggle = css`
  ${button};
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  /* min-height to conform with Lighthouse min tap-target */
  min-height: 4.8rem;
  min-width: 4.8rem;
  padding: 0rem
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: opacity 0.3s ease 0s;
  background-color: var(--surface-01);

  &:hover, &:focus {
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.9);
  }
  &, &:hover, &:visited {
    color: white; /* same in darkmode */
  }
`;
