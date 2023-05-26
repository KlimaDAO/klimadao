import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";
import * as typography from "@klimadao/lib/theme/typography";

export const offsetCard = css`
  background-color: white;
  align-content: start;
  border-radius: 1.2rem;
  gap: 2.4rem;
  ${breakpoints.desktop} {
    gap: 2.8rem;
    align-items: start;
  }
`;

export const projectHeader = css`
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: start;

  ${breakpoints.medium} {
    padding: 4rem 2rem;
    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;
    min-height: 10rem;
  }

  ${breakpoints.desktop} {
    padding: 4rem 3rem;
    grid-column: main;
  }
`;

export const projectHeaderText = css`
  color: white;
  z-index: 1;
  font-size: 1em;

  ${breakpoints.small} {
    font-size: 1em;
  }

  ${breakpoints.medium} {
    font-size: 1.5em;
  }

  ${breakpoints.desktop} {
    font-size: 2em;
  }
`;

export const tags = css`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  z-index: 1;
  align-items: center;
  justify-items: center;
  line-height: 26px;
`;

export const projectIDText = css`
  color: white;
  z-index: 1;
`;
export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const offsetCard_ui = css`
  display: grid;
  gap: 1.6rem;
  padding-top: 3.4rem;
  width: 90%;
  margin: 0 auto;

  ${breakpoints.medium} {
    gap: 2rem;
    width: 85%;
  }

  ${breakpoints.large} {
    gap: 2.4rem;
    width: 80%;
  }

  ${breakpoints.desktop} {
    gap: 2.8rem;
    justify-self: center;
    max-width: 48rem;
    width: 75%;
  }

  .mini_token_label {
    color: var(--font-01);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: 90%;
  }

  .disclaimer {
    color: var(--font-01);
    display: flex;
    gap: 1.2rem;
    padding: 1.6rem;
    border-radius: 0.8rem;
    border: 0.2rem solid rgb(255, 184, 0);
    .mini_token_label {
      color: var(--font-01);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      width: 90%;
    }
  }

  .disclaimer svg {
    color: yellow;
    width: 3.2rem;
    height: 3.2rem;
  }
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

export const beneficiary = css`
  display: grid;
  gap: 0.8rem;
  align-content: start;
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

export const offsetCard_header = css`
  display: grid;
  max-width: 100%;
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
  gap: 0.5rem;
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
