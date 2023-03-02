import { css } from "@emotion/css";

export const list = css`
  grid-column: 1 / 3;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  a {
    width: 100%;
    max-width: 32rem;
  }
`;

export const loadingPlaceholder = css`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  max-width: 32rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

export const cardDescription = css`
  background: linear-gradient(
    180deg,
    var(--font-01) 43.44%,
    rgba(49, 49, 49, 0) 92.91%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
`;

export const cardContent = css`
  flex: 1 0 auto;
  padding: 2rem;
  display: grid;
  gap: 0.8rem;
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;
