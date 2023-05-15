import { css } from "@emotion/css";

export const group = css`
display: flex;
flex-direction: column;
gap: 0.2rem; 
`;

export const bold = css`
  font-weight: 700;
  font-size: 1.6rem;
  font-family: 'Poppins';
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
