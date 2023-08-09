import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const mapBox = css`
  height: 100vh;
  grid-column: full;

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

  .marker {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: var(--surface-02);
    border-radius: 50%;
  }

  .marker::after {
    content: "";
    position: absolute;
    top: 60%;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 18px solid var(--surface-02);
    transform: translateX(-50%);
  }

  .mapboxgl-popup-content {
    line-height: normal;
    display: grid;
    gap: 1rem;
    img {
      width: 100%;
      border-radius: 5px;
    }

    h3 {
      margin-right: 6px;
    }

    .header {
      display: flex;
      align-items: center;
    }
  }

  .mapboxgl-popup-close-button {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    top: 5px;
    right: 5px;
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
