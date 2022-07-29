import { css } from "@emotion/css";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .card {
    cursor: default;
    align-self: center;
    max-width: 64rem;
    background-color: var(--surface-02);
    padding: 2.4rem;
    display: grid;
    gap: 3.2rem;
  }
  .card_header {
    display: grid;
    gap: 0.8rem;
  }
  .backButton {
    ${textButton};
    border: 2px solid var(--klima-blue);
    justify-self: end;
  }
  .backButton:hover:not(:disabled) {
    background-color: var(--klima-blue);
  }
  .backButton:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .button_wrapper {
    display: "flex";
    justify-content: "flex-end";
    gap: "0.8rem";
  }
`;
