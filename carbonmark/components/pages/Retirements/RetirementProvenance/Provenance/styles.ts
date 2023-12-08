import { css } from "@emotion/css";

export const wrapper = css`
  background-color: var(--surface-01);
  width: 100%;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: var(--shadow-01);
`;
export const header = css`
  display: flex;
  justify-content: space-between;
`;
export const headerItem = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  white-space: nowrap;
`;
export const iconAndText = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const timeline = css`
  max-width: 36rem;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  white-space: nowrap;
  min-width: 48rem;
`;

export const contentHeader = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const contentFooter = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const inline = css`
  display: inline;
  white-space: normal;
`;

export const verraLink = css`
  font-size: 1.6rem;
`;

export const divider = css`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
`;
