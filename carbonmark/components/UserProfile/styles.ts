import { css } from "@emotion/css";

export const userProfile = css`
  width: 24rem;
  background: white;
  color: black;
  border-radius: 0.3rem;
  display: flex;
  padding: 0 1rem;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--font-03);

  & .content {
    text-transform: initial;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: black;
    font-weight: 400;
    font-size: 16px;
  }

  & .placeholder {
    width: 3rem;
    height: 3rem;
    background: #e8e8e8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
