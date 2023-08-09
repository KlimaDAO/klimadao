import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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

export const controller = css`
  width: 100%;
  position: absolute;
  z-index: 1;
  padding: 1.5rem;
  > * {
    margin-bottom: 1rem;
  }
  ${breakpoints.desktop} {
    grid-column: full;
    padding: 4rem;
  }
`;
