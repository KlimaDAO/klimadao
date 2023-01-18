import { css } from "@emotion/css";

export const marketplaceButtonGray = css`
  border-color: var(--font-01);
  color: var(--font-01) !important;
  cursor: pointer;

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;
