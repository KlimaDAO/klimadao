import { css } from "@emotion/css";

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .address {
    word-break: break-all;
  }

  a,
  a:visited {
    color: var(--font-01);
    text-decoration: underline;
  }
  a:hover {
    color: var(--font-01);
    text-decoration: none;
  }
`;
