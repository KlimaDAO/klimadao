import { css } from "@emotion/css";

export const container = css`
  display: grid;
  flex-direction: column;
  gap: 0.5rem;
  .label {
    text-transform: uppercase;
  }
  .label.alignEnd {
    justify-self: flex-end;
  }
  .value.warn {
    color: var(--warn);
  }
`;

export const card = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-01);
  color: var(--font-01);
  min-height: 4.8rem;
  border-radius: 1rem;
  padding: 0.4rem 1.6rem 0.4rem 0.4rem;
  .image {
    min-width: 4.8rem;
  }
`;
