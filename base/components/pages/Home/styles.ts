import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  z-index: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;
  grid-template-rows: 1fr;
  max-width: 120rem;
  margin: 0 auto;
  background: 

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

  /** KlimaDAO Logo */
  .logo {
    align-self: center;
  }

  ${breakpoints.medium} {
    padding: 1.6rem;
    gap: 3.2rem;
  }

  ${breakpoints.large} {
    padding: 2.4rem;
    gap: 6.4rem;
  }
`;

export const textHeading = css`
  max-width: 72rem;
  padding: 0rem 1.6rem;
  display: grid;
  gap: 1.6rem;
  .newBadge {
    margin-bottom: -1.6rem;
  }
  span.base {
    color: #0052ff;
  }
  h1 {
    color: white;
    padding: unset;
    margin: unset;
  }
  .baseIcon {
    height: 3.2rem;
    position: relative;
    bottom: -0.4rem;
    width: auto;
  }
  .emphasized {
    color: var(--klima-green);
    font-weight: 600;
  }
`;

export const header = css`
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
  padding: 0.8rem;
  padding-bottom: 0;
`;

export const cardBg = css`
  align-self: center;
  justify-content: center;
  display: flex;
  background-color: #202020;
  border-radius: 1.2rem;
  ${breakpoints.medium} {
    padding: 3.2rem;
  }
`;

export const card = css`
  display: grid;
  gap: 2.4rem;
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

export const headerTitle = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const hidden = css`
  display: none;
`;
