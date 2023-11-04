import { css } from "@emotion/css";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const projectOptions = css`
  display: flex;
  gap: 12px;
`;

export const form = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const stats = css`
  display: block;
  margin: 24px 0;
`;

export const selectedCard = css`
  border: 1px solid blue;
`;

export const fields = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const logo = css`
  svg {
    width: 200px;
    height: 200px;
  }
`;
