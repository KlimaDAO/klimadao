import { css } from "@emotion/css";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const projectOptions = css`
  display: flex;
  gap: 12px;
`;

export const form = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const stats = css`
  display: block;
  gap: 12px;
  margin: 20px 0;
  text-align: center;
`;

export const selectedCard = css`
  border: 1px solid blue;
`;

export const fields = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const logo = css`
  svg {
    width: 200px;
    height: 200px;
  }
`;

export const card = css`
  width: 22rem;
  height: 22rem;
  //Override to hide the card image and vintage by matching classNames
  [class$="cardImage"],
  [class$="text-vintage"] {
    display: none;
  }
`;
export const button = css``;

export const mapbox = css`
  height: 300px;
  width: 100vw;
  margin: 24px 0;
  border-radius: 6px;

  .mapboxgl-ctrl-attrib {
    font-size: 10px;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
`;

export const text = css`
  margin-bottom: 24px;
  text-align: center;
`;
