import { css } from "@emotion/css";

export const infoText = css`
  color: var(--white);
`;

export const tippyBox = css`
  background-color: var(--manatee);
  padding: 1.2rem;
  .tippy-arrow {
    color: var(--manatee);
  }
  .tippy-content {
    /* Undo default tippy styles */
    padding: unset;
  }

  a {
    text-decoration: underline;
    color: var(--white);
  }
`;
