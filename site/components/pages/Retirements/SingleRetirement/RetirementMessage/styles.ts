import { css } from "@emotion/css";

export const retirementMessage_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.8rem;

  .message {
    font-weight: 400;
    word-break: break-word;
  }

  .fallback {
    font-style: italic;
    color: var(--font-02);
  }
`;
