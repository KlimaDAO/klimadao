import { css } from "@emotion/css";

export const activity = css`
  border-left: 2px solid var(--manatee);
  padding: 0.6rem 1.4rem;
  display: grid;
  gap: 0.8rem;

  :nth-child(odd) {
    background-color: #fafaff;
  }

  .account {
    color: var(--bright-blue);
    margin-right: 0.4rem;
  }
`;

export const link = css`
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
  }
`;

export const action = css`
  color: var(--font-03);
  display: flex;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const activitySummary = css`
  display: flex;
  gap: 0.8rem;
`;

export const amount = css`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid var(--font-03);
  border-radius: 0.4rem;
  background-color: var(--surface-03);
`;
