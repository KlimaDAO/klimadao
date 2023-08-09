import { css } from "@emotion/css";

export const mapBox = css`
  height: 100vh;
  grid-column: full;

  .marker {
    cursor: pointer;
  }

  .cluster {
    cursor: pointer;
    background: #2c40f7;
    border: 1px solid var(--bright-blue);
    color: white;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    box-shadow: var(--shadow-02);
    &:hover {
      background: white;
      color: var(--font-01);
    }
  }
`;
export const placeholder = css`
  height: 100%;
  width: 100%;
  background-color: var(--bright-blue);
  border-radius: 0.8rem;
`;
