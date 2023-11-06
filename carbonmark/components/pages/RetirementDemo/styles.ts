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
  gap: 20px;
`;

export const stats = css`
  display: block;
  gap: 12px;
  margin: 12px 0;
  text-align: center;
`;

export const selectedCard = css`
  border: 1px solid blue;
`;

export const fields = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const logo = css`
  svg {
    width: 200px;
    height: 200px;
  }
`;

export const card = css`
  width: 22rem;
  height: 22rem;
  //Override to hide the card image and vintage by matching classNames
  [class$="cardImage"],
  [class$="text-vintage"] {
    display: none;
  }
`;
export const button = css`
  margin-top: 60px;
`;
