import { css } from "@emotion/css";

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
      background-color: var(--font-02);
      width: 5rem;
      height: 5rem;
      font-size: 2rem;
      padding: 1.5rem;
      svg {
        color: white;
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;
