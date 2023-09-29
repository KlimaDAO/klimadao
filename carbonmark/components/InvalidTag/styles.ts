import { css } from "@emotion/css";

export const tag = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;
  background-color: #ffd6cc;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  height: 2.6rem;
  font-size: 1.4rem;
  color: #e03d14;
  font-weight: 500;
  border: 1px solid #e03d14;
  white-space: nowrap;
  & svg {
    color: #e03d14;
  }
`;
