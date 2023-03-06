import { css } from "@emotion/css";

export const container = css`
  border: 0.2rem solid var(--surface-03);
  border-radius: 0.8rem;
  padding: 1.6rem;
  display: grid;
  gap: 0.8rem;

  .country {
    color: var(--klima-green);
  }

  span.projectDetails {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--font-03);
  }
`;
