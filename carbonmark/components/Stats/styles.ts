import { css } from "@emotion/css";

export const list = css`
  display: grid;
  gap: 1.2rem;
`;

export const listItem = css`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  justify-content: space-between;
`;

export const itemWithIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  svg {
    fill: var(--font-02);
  }
`;

export const itemWithColor = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  span {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  span:before {
    content: "";
    width: 1.2rem;
    height: 1.2rem;

    background-color: var(--yellow);
  }

  span.first:before {
    background-color: var(--old-burgundy);
  }
`;

export const bar = css`
  height: 0.8rem;
  background-color: var(--bisque);
  border-radius: var(--border-radius);

  &::before {
    content: "";
    display: flex;
    justify-content: end;
    width: calc(var(--percent) * 1%);
    height: 100%;
    background: var(--old-burgundy);
    white-space: nowrap;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
`;

export const bold = css`
  font-weight: 600;
`;

export const titles = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;
