import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const modalContent = css`
  justify-content: center;
  align-items: center;
  display: grid;
  gap: 3.2rem;
  margin: 1.6rem;

  ${breakpoints.small} {
    margin: 2.4rem;
  }
`;

export const icon_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 3rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  text-align: center;
  line-height: 10rem;
  vertical-align: middle;

  & svg {
    font-size: 3.5rem;
    color: var(--font-01);
  }

  ${breakpoints.small} {
    width: 12rem;
    height: 12rem;
    & svg {
      font-size: 5rem;
    }
  }
`;

export const icon_success = css`
  ${icon_container}
  background: #32972d46;
  border: 1px solid var(--klima-green);
`;

export const icon_failure = css`
  ${icon_container}
  background: rgba(182, 56, 56, 0.164);
  border: 1px solid rgba(255, 0, 0, 0.39);
`;

export const icon_confirmation = css`
  ${icon_container}
  border: 1px solid var(--klima-green);
  border-top-color: var(--surface-01);
  border-left-color: var(--surface-01);
  transform: rotate(315deg);

  & svg {
    transform: rotate(45deg);
  }
`;

export const icon_network_confirmation = css`
  ${icon_container}
  border: 1px solid var(--klima-green);
  border-top-color: var(--surface-01);
  transform: rotate(315deg);

  & svg {
    transform: rotate(45deg);
  }
`;

export const card_message = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
  word-break: break-word;

  font-size: 1.8rem;
`;
