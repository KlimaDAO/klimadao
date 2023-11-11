import { css } from "@emotion/css";

export const form = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const card = css`
  width: 22rem;
  height: 22rem;
  //Override to hide the card image and vintage by matching classNames
  .cardImage,
  .text-vintage {
    display: none;
  }
`;

export const selectedCard = css`
  border: 1px solid blue;
`;

export const projectOptions = css`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`;

export const modal = css`
  .modalContent {
    max-width: unset;
    width: auto;
  }
`;
export const spinner = css`
  color: white;
`;

export const fields = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
