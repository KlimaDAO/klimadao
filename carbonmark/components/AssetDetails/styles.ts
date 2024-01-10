import { css } from "@emotion/css";

export const accordion = css`
  border: none;

  button {
    padding: 0;

    > p {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: 2.8rem;
      color: var(--font-02);
    }
  }

  &[data-open="true"] {
    .content {
      padding: 0;

      > div {
        margin-top: 1.6rem;
      }
    }
  }
`;

export const totalsText = css`
  display: grid;
  gap: 0.8rem;
`;

export const iconAndText = css`
  display: flex;
  gap: 0.8rem;

  .error {
    color: var(--warn);
  }
`;

export const externalLink = css`
  color: var(--font-01);
  text-decoration: underline;
  display: flex;
  gap: 0.4rem;
  align-items: center;

  &:hover,
  &:visited {
    color: var(--font-02);
    text-decoration: none;
  }
`;
