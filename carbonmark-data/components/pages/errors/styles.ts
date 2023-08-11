import { css } from "@emotion/css";

export const errorPageWrapper = css`
  display: grid;
  grid-column: full;
  grid-template-columns: inherit;
  min-height: 50vh;
  grid-template-rows: 1fr auto;
  align-items: center;
`;

export const textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
`;
