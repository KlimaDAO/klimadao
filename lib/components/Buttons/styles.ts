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
  padding: 10px 18px;
  cursor: pointer;
  box-shadow: transparent -8px 4px 20px;
  border-radius: 4px;
  transition: box-shadow 0.3s ease 0s, background-color 0.3s ease 0s;
  background-color: var(--primary);
  color: var(--white);
  border: 0px;
  font-size: var(--font-size);

  &:hover {
    background-color: var(--primary-variant);
  }
`;
