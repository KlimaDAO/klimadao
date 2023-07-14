import { css } from "@emotion/css";

export const address = css`
  display: grid;
  justify-content: start;
  .copyButton {
    justify-content: start;
  }
  .domain {
    margin-top: -1.2rem;
  }
`;

export const iconAndText = css`
  display: flex;
  gap: 0.8rem;

  .icon {
    flex-shrink: 0;
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
