import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import { textButton } from "@klimadao/lib/theme/common";

export const container = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: not-allowed;
  z-index: 99;
  color: var(--font-01);
  .banner {
    cursor: default;
    align-self: center;
    padding: 2rem;
    display: grid;
    gap: 1.5rem;
    background-color: var(--surface-01);
    justify-items: center;
    align-items: center;
  }

  .banner_text {
    text-align: center;
    display: grid;
    gap: 0.8rem;
  }

  .okButtonWrap {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }
  .okButton {
    ${textButton};
    border: 2px solid var(--klima-green);
    justify-self: flex-end;
  }

  .dontButton {
    ${typography.button};
    opacity: 0.5;
    color: var(--font-03);
  }

  .dontButton:hover,
  .dontButton:focus {
    opacity: 1;
  }
`;
