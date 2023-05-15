import { css } from "@emotion/css";

export const shareCard = css`
  gap: 0.8rem;
  padding: 2rem;
  display: flex;
  margin: 2rem 0;
  flex-direction: column;
  background-color: var(--surface-02);
`;

export const content = css`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.4rem;
`;

export const socialLinks = css`
  display: grid;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  position: relative;
  grid-column: main;

  .title {
    text-align: center;
    position: relative;
    line-height: initial;
    color: white;
  }

  .buttons {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    button {
      background-color: var(--font-02) !important;
      width: 5rem;
      height: 5rem;
      font-size: 2rem;
      padding: 1.5rem;
      svg {
        color: white;
        width: 2rem !important;
        height: 2rem !important;
      }
    }
  }
`;

export const profileLink = css`
  display: flex;
  gap: 1.45rem;
  margin-top: 0.2rem;
  align-items: center;
  color: var(--bright-blue);
`;
