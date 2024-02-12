import { css } from "@emotion/css";

export const masonry = css`
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  & .item {
    position: relative;
    background: black;

    & .backdrop {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      position: absolute;
    }

    & img {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }

    & .content {
      bottom: 0;
      z-index: 11;
      color: white;
      padding: 20px 20px 15px;
      gap: 10px;
      display: flex;
      flex-direction: column;
      position: absolute;

      & h3 {
        font-size: 16px;
        line-height: 20px;
        font-weight: 700;
        font-family: "Poppins";
      }

      & h5 {
        color: #b0b1b8;
        font-size: 13px;
        font-weight: 700;
        font-family: "Poppins";
      }

      & p {
        font-size: 14px; // fix - use existing
        line-height: 20px;
      }

      & .info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        a {
          margin: 6px 0 0;
          font-family: "Poppins";
          font-size: 12px;
          color: #ffb800;
          font-weight: 600;
          line-height: 16px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
      }
    }
  }

  & .item:nth-child(1) {
    grid-column: span 2;
    grid-row: span 2;
    height: 54.6rem;

    & .backdrop {
      background: linear-gradient(
        to bottom,
        rgba(24, 25, 31, 0) 0%,
        rgba(24, 25, 31, 0) 50%,
        #18191f 70%
      );
    }

    & img {
      object-position: 0 -15rem;
    }
  }

  & .item:nth-child(2) {
    grid-column: span 1;
    grid-row: span 1;
    height: 28rem;

    & .backdrop {
      background: linear-gradient(
        to bottom,
        rgba(24, 25, 31, 0) 0%,
        rgba(24, 25, 31, 0) 35%,
        #18191f 40%
      );
    }

    & img {
      object-position: 0 -12rem;
    }
  }

  & .item:nth-child(3) {
    grid-column: span 1;
    grid-row: span 1;
    height: 28rem;

    & .backdrop {
      background: linear-gradient(
        to bottom,
        rgba(24, 25, 31, 0) 0%,
        rgba(24, 25, 31, 0) 35%,
        #18191f 40%
      );
    }

    & img {
      object-position: -8rem -12rem;
    }
  }

  & .item:nth-child(4) {
    grid-column: span 2;
    grid-row: span 2;
    height: 26rem;

    & .backdrop {
      background: linear-gradient(
        to bottom,
        rgba(24, 25, 31, 0) 0%,
        rgba(24, 25, 31, 0) 40%,
        #18191f 45%
      );
    }

    & img {
      object-position: 0 -12rem;
    }
  }
`;
