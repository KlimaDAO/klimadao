import { css } from "@emotion/css";

export const spinnerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1.2rem;
`;

export const listHeader = css`
  display: grid;
  grid-template-columns: 6fr 0.5fr 1.5fr;
  grid-column-gap: 0.8rem;
  grid-row-gap: 0.8rem;

  padding: 0.8rem;

  background: var(--manatee);

  p {
    color: white;
    text-transform: uppercase;
  }
`;

export const list = css`
  padding: 0.8rem;
`;

export const listItem = css`
  display: grid;
  grid-template-columns: 6fr 0.5fr 1.5fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 0.8rem;
  padding: 0.8rem;

  border-bottom: 0.5px solid var(--manatee);

  transition: all 0.2s ease 0s;

  &:hover {
    transform: scale(1.01);
    background: var(--surface-02);
  }
`;

export const emptyList = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0.4rem;
  grid-row-gap: 0.8rem;
  padding: 0.8rem;

  .error {
    color: var(--warn);
  }
`;

export const totalsText = css`
  display: grid;
  gap: 0.8rem;

  .error {
    color: var(--warn);
  }
`;

export const externalLink = css`
  text-decoration: underline;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--bright-blue);

  margin-top: 2rem;

  &:hover,
  &:visited {
    text-decoration: none;
  }
`;
