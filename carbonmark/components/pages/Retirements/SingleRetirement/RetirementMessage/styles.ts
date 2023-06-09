import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const retirementMessage = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: column;

  p {
    text-align: center;
  }

  .message {
    text-align: left;
    font-weight: 400;
    word-break: break-word;
  }

  .fallback {
    font-style: italic;
    color: var(--font-02);
  }

  ${breakpoints.desktop} {
    p {
      text-align: left;
    }
  }
`;
