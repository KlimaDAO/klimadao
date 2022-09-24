import { css } from "@emotion/css";

export const container = css`
  grid-column: main;
  display: grid;
  gap: 2.4rem;
  justify-items: center;
  border: 2px solid red;

  p a {
    color: var(--klima-blue);
    text-decoration: underline;
  }

  b {
    color: var(--klima-green);
  }
`;

export const pendingModalContent = css`
  display: grid;
  gap: 2.4rem;
  justify-items: center;
  padding-bottom: 2.4rem;
`;
