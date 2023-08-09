import { css } from "@emotion/css";

export const mapBox = css`
  height: 100vh;
  width: 100vw;

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
      // &::before {
      //   background: rgba(0, 25, 255, 1);
      // }
    }
    // &::before {
    //   // Add radial gradient border
    //   content: "";
    //   position: absolute;
    //   top: -2px;
    //   left: -2px;
    //   right: -2px;
    //   bottom: -2px;
    //   background: radial-gradient(
    //     circle at center,
    //     rgba(0, 25, 255, 1),
    //     rgba(0, 25, 255, 0.3)
    //   );
    //   border-radius: inherit;
    //   z-index: -1;
    // }
  }
`;
export const placeholder = css`
  height: 100%;
  width: 100%;
  background-color: var(--bright-blue);
  border-radius: 0.8rem;
`;
