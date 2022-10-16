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
