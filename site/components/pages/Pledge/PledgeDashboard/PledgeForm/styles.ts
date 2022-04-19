import { css } from "@emotion/css";

export const container = css`
  display: grid;
  align-content: start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const input = css`
  display: grid;
  align-content: start;
  gap: 0.75rem;
`;

export const footprintContainer = css`
  width: 100%;
`

export const footprintRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.75rem;

  div {
    flex-grow: 1;
  }
`