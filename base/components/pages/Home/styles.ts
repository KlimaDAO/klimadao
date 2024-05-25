import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  z-index: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;
  margin: 2.4rem 0;
  grid-template-rows: 1fr;

  .MuiSvgIcon-root {
    font-size: 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
  }

  // safari and chrome
  *::-webkit-scrollbar {
    width: 0.6rem;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--dark-gray);
    outline: 1px solid var(--dark-gray);
    border-radius: 0.2rem;
    width: 0.6rem;
  }

  // firefox scrollbar
  scrollbar-color: var(--dark-gray);
  scrollbar-width: 0.6rem;
`;

export const header = css`
  display: flex;
  justify-content: flex-end;
  margin: 0 2.4rem 2.4rem 2.4rem;
`;

export const ctaCard = css`
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #202020;
  border-radius: 1.2rem;
  grid-column: 1 / 3;
  padding-top: 2.4rem;
  margin: 1rem auto;
  .hr {
    height: 0.2rem;
    background-color: #202020;
  }

  ${breakpoints.desktop} {
    max-width: 50%;
  }
`;

export const ctaCard_header = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 2.4rem;
  max-width: 50rem;
  width: 100%;
  gap: 3.2rem;
`;

export const ctaCard_header_title = css`
  display: flex;
  width: 100%;
  gap: 0.8rem;

  font-family: "Poppins", sans-serif;
  font-size: 2.4rem;
  line-height: 3.2rem;
  font-weight: 600;
  color: #fff;
  transition: color 0.25s ease-in-out 0s;
  display: flex;
  width: 100%;
  text-align: left;
  -webkit-box-align: center;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

export const ctaCard_header_subtitle = css`
  width: 100%;
  text-align: left;
  padding-top: 0.8rem;
`;

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;
`;

export const offsetCard = css`
  grid-row: 2;
`;

export const stakeCard_ui = css`
  display: grid;
  gap: 4.8rem;
  padding: 3.2rem;
  width: 100%;
  justify-self: center;
  align-items: center;
  border: 2px solid #303030;
  padding: 2.4rem;
  border-radius: 1.2rem;

  ${breakpoints.medium} {
    width: 48rem;
    max-width: 48rem;
  }
`;

export const inputsContainer = css`
  display: grid;
  gap: 2rem;
`;

export const formGroup = css`
  display: flex;
  gap: 10px;
  flex-direction: column;

  label {
    color: #ddd;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;
    font-family: "Inter", sans-serif;
  }

  input {
    height: 4.8rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 400;
    width: 100%;
    background-color: #202020;
    padding: 1.6rem 0.8rem;
    color: #fff;
    border: 2px solid #2a2a2a;
    font-family: Inter, sans-serif;
    border-radius: 0.8rem;
    outline: none;
  }

  textarea {
    resize: none;
    height: 16rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 400;
    padding: 0.8rem;
    background-color: #202020;
    border: 0.2rem solid #2a2a2a;
    font-family: "Inter", sans-serif;
    border-radius: 0.8rem;
    color: #fff;
    outline: none;
  }

  .field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2a2a2a;
    color: #fff;
    height: 5.6rem;
    border-radius: 1rem;
    padding: 0.4rem 0.8rem;

    img {
      min-width: 4.8rem;
      align-self: center;
      object-fit: contain;
    }

    p {
      font-weight: 500;
      font-size: 2.2rem;
      line-height: 3.2rem;
      padding: 0 0.6rem;
    }
  }
`;

export const disclaimer = css`
  gap: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  svg {
    color: yellow;
    width: 3.2rem !important; // todo - remove !important..
    height: 3.2rem !important; // todo - remove !important..
  }
`;

export const submitButton = css`
  width: 100%;
`;
