import { css } from "@emotion/css";

export const retirementValue_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

export const tokenInfo = css`
  display: flex;
  align-items: center;
  gap: 1rem;

  .amount {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
