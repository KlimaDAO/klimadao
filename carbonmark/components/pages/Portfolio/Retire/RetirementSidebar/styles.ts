import { css } from "@emotion/css";

export const group = css`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

export const assetWrapper = css`
  background-color: var(--surface-01);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const bold = css`
  font-weight: 700;
  font-size: 1.6rem;
  font-family: "Poppins";
`;

export const icon = css`
  width: 1.6rem;
  height: 1.6rem;
  vertical-align: middle;
  margin-right: 0.5rem;
`;

export const linkWithIcon = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: underline;

  svg {
    vertical-align: middle;
  }
`;
