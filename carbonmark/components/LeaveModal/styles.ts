import { css } from "@emotion/css";

export const modal = css`
  .modalContent {
    width: 37rem !important;
    .title {
      & p {
        font-size: 2.4rem;
      }
    }
  }
`;

export const content = css`
  margin-top: 2rem;
  div {
    display: flex;
    font-size: 1.6rem;
    line-height: 2rem;
    margin-bottom: 1.2rem;

    & svg {
      width: 2rem;
      height: 2rem;
      fill: #ffb800;
      margin-top: 0.2rem;
      margin-right: 1rem;
    }
  }
`;

export const cancelButton = css`
  width: 100%;
  margin-top: 1.2rem;
  border-color: var(--warn);
  color: var(--warn) !important;
`;

export const continueButton = css`
  width: 100%;
  margin-top: 2.4rem;
  color: white !important;
  background: var(--bright-blue);
  border-color: var(--bright-blue);
`;
