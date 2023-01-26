import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const offsetCard_ui = css`
  display: grid;
  gap: 2.4rem;

  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }

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
  }

  .disclaimer svg {
    color: yellow;
    width: 3.2rem;
    height: 3.2rem;
  }
`;
