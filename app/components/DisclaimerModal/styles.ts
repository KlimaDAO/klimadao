import { css } from "@emotion/css";

export const modal = css`
  .modalContent {
    width: 48rem !important;
    .title {
      & p {
        font-weight: 600;
        font-size: 2.4rem;
        font-family: var(--font-family-secondary);
      }
    }
  }
`;

export const content = css`
  margin-top: 2rem;
  p {
    color: white !important;
    display: flex;
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

export const dislaimerButton = css`
  width: 100%;
  margin-top: 2.4rem;
  color: #fff !important;
`;
