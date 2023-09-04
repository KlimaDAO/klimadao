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
    max-width: 324px !important; //Unfortunately we need to override the element level style applied by mapbox
  }

  .mapboxgl-popup-content {
    line-height: normal;
    display: grid;
    gap: 1rem;
    border-radius: 8px;
    img {
      width: 100%;
      border-radius: 5px;
    }

    .title {
      margin-right: 6px;
      font-family: poppins;
    }

    .price {
      color: #3b3b3d;
    }

    .link {
      font-weight: 600;
      font-size: 1.4rem;
      text-transform: uppercase;
      font-family: poppins;
      line-height: 16px;
    }

    .header {
      font-size: 1.6rem;
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
    font-size: 2.4rem;
    top: 8px;
    right: 8px;
    color: #626266;
  }
`;
