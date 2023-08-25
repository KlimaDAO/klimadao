import { css } from "@emotion/css";

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

  .mapboxgl-marker {
    cursor: pointer;
  }

  .mapboxgl-popup {
    //Make sure we can close popups always
    z-index: 1;
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
