import { css } from "@emotion/css";

export const buyButton = css`
  align-self: flex-start;
  background-color: var(--bright-blue);
  color: var(--white) !important;
`;

export const sellerInfo = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  align-items: center;

  svg {
    fill: var(--klima-blue);
  }

  a,
  a:visited {
    color: var(--klima-blue);
  }
  a:hover {
    color: var(--klima-green);
  }
`;

export const sellerBadge = css`
  padding: 0.4rem 0.8rem;
  background-color: var(--surface-02);
  align-items: center;
  align-self: flex-start;
  border-radius: var(--border-radius);
  color: var(--font-01);
`;

export const dates = css`
  display: flex;
  gap: 2.4rem;
  flex-direction: row;

  span {
    font-weight: 900;
  }
`;
