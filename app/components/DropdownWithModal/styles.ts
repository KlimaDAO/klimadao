import { css } from "@emotion/css";

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .label {
    text-transform: uppercase;
  }
  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--surface-01);
    border-radius: 1rem;
    padding: 0.5rem;
    &:hover {
      background-color: var(--surface-03);
    }
    .start_content,
    .end_content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export const modalBackground = css`
  z-index: 9999 !important;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  .modal_container {
    width: 50rem;
    height: fit-content;
    border-radius: 1.2rem;
    background-color: var(--surface-01);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2.5rem;
    animation: enter 200ms ease-in-out;
    animation-fill-mode: forwards;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
        padding: 1rem;
        border-radius: 0.4rem;
        background-color: var(--surface-02);
      }
    }
    .select_button[data-active="true"] {
      background-color: var(--surface-03);
    }
    .select_button {
      &:disabled {
        opacity: 50%;
      }
      &:disabled:hover {
        background-color: inherit;
      }
    }
  }
  @keyframes enter {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;
