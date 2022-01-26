import { css } from "@emotion/css";

export const button_primary = css`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  appearance: none;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  padding: 1rem 1.8rem;
  cursor: pointer;
  border-radius: 1.6rem;
  transition: background-color 0.3s ease 0s;
  background-color: var(--primary);
  color: var(--white) !important;
  border: 0;
  font-size: 1.4rem;

  &:hover {
    background-color: var(--primary-variant);
  }
`;

export const button_gray = css`
  background-color: var(--white);
  color: var(--surface-02) !important;
`;
