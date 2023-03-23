import { css } from "@emotion/css";

export const main = css`
  button.action {
    width: 100%;
    &:first-of-type {
      margin-top: 1.8rem;
    }
    margin: 0.3rem 0;
  }

  form {
    display: grid;
  }

  .modalContent {
    max-width: 90vw;
    width: 36rem;
    min-width: 30rem;
    display: grid;
    grid-gap: 0.5rem;
  }

  .title {
    margin-bottom: 2rem;
  }

  .dropdown {
    text-align: left;
    width: 100%;
    margin-bottom: 1.4rem;
    button {
      width: 100%;
    }
  }

  .accordion:last-of-type {
    border-bottom: none;
  }
`;

export const option = css`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.8rem;
    opacity: 0.6;
    margin-right: 5px;
  }
`;
