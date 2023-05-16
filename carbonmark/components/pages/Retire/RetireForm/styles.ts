import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";
import * as typography from "@klimadao/lib/theme/typography";

export const offsetCard = css`
  display: grid;
  background-color: white;
  align-content: start;
  border-radius: 1.2rem;
  gap: 2.4rem;
  grid-column: 1 / 3;

  ${breakpoints.desktop} {
    gap: 2.8rem;
    align-items: start;
  }
`;
export const offsetCard_ui = css`
  display: grid;
  gap: 2.4rem;
  padding-top: 0.5rem;
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  border-radius: 1.2rem;

  ${breakpoints.desktop} {
    justify-self: center;
    max-width: 48rem;
    width: 100%;
  }

  .mini_token_label {
    color: var(--font-01);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .disclaimer {
    color: var(--font-01);
    display: flex;
    gap: 1.2rem;
    padding: 1.6rem;
    border-radius: 0.8rem;
    border: 0.2rem solid rgb(255, 184, 0);
  }

  .disclaimer svg {
    color: yellow;
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export const beneficiary = css`
  display: grid;
  gap: 0.8rem;
  align-content: start;
`;

export const stackText = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const required = css`
  font-size: 16px !important;
`;

export const detailsText = css`
  gap: 1.6rem;
  font-size: 12px !important;
`;

export const newReleasesIcon = css`
  color: var(--klima-green);
  margin-inline-end: 0.4rem;
  margin-bottom: -0.4rem;
`;

export const offsetCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const buttonRow = css`
  display: flex;
  justify-content: center;
`;

export const buttonRow_spinner = css`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  min-height: 4.8rem;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
`;

export const submitButton = css`
  color: white !important;
  background-color: var(--bright-blue);
  width: 100%;
  border: none;
  padding: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0012cc;
  }
`;

export const backButton = css`
  background-color: white;
  border: 2px solid #626266;
  width: 100%;
`;
export const input = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  textarea {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 0.8rem;
    min-height: 2.4rem;
    color: var(--font-01);
    resize: none;
    padding-top: 0.8rem;
    overflow-y: hidden;
    min-height: 16rem;
  }

  input {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 0.8rem;
    min-height: 4.8rem;
    color: var(--font-01);
  }

  label {
    display: flex;
    gap: 0.8rem;
    color: white;
    align-items: center;
  }

  .number_input_container {
    min-height: 4.8rem;
    display: grid;
    grid-template-columns: 1fr min-content;
    z-index: 1; /* cover advanced-settings border */

    input[data-error="true"] {
      border: 0.175rem solid var(--warn);
    }
  }

  .button_max {
    ${common.iconButton};
    ${typography.button};
    padding: 0 1.6rem;
    border-radius: 0 0.8rem 0.8rem 0;
    &:hover:not(:disabled) {
      background-color: var(--surface-03);
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  input[data-error="true"] {
    border: 0.175rem solid var(--warn);
  }

  .invalid_project_tonnage {
    font-size: 1.4rem;
    color: var(--warn);
  }
`;

export const warningText = css`
  gap: 1.6rem;
  font-size: 12px !important;
  color: red;
`;

export const error = css`
  color: var(--warn);
`;

export const connect_button = css`
  width: 100%;
`;

export const offsetCard_header = css`
  display: grid;
  max-width: 100%;
`;

export const bannerImageContainer = css`
  position: relative;
  width: 100%;
  height: 200px;
  max-width: 100%;
  padding: 2.4rem;
`;
export const info = css`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2.4rem;
  flex-wrap: wrap;

  p {
    font-family: "Poppins";
  }
`;

export const projectImageWrapper = css`
  overflow: hidden;
  img {
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
  }
`;

export const projectName = css`
  color: white;
  font-weight: 700;
  font-size: 2em;
  font-family: "Poppins", sans-serif;
  align-self: stretch;

  @media (max-width: 376px) {
    font-size: 16px;
  }

  ${breakpoints.small} {
    font-size: 20px;
  }

  ${breakpoints.medium} {
    font-size: 1.5em;
  }
`;

export const projectKeyStyle = css`
  color: white !important;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;
export const details = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1.6rem;

  p {
    @media (max-width: 376px) {
      font-size: 12px;
    }

    ${breakpoints.small} {
      font-size: 14px;
    }
  }
`;
