import { css } from "@emotion/css";

export const totalsText = css`
  display: grid;
  gap: 0.8rem;
`;

export const divider = css`
  height: 0.1rem;
  background-color: var(--font-03);
`;

export const iconAndText = css`
  display: flex;
  gap: 0.8rem;

  .icon {
    flex-shrink: 0;
  }

  .error {
    color: var(--warn);
  }
`;

export const feeColor = css`
  color: var(--bright-blue);
`;

export const withToggle = css`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const toggleFees = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const fees = css`
  background-color: var(--surface-02);
  padding: 0.4rem;
  display: grid;
  gap: 0.8rem;
  border-top: 2px solid var(--manatee);
  border-bottom: 2px solid var(--manatee);
`;

export const feeBreakdown = css`
  background-color: var(--surface-02);
  display: grid;
  padding: 0.4rem;
`;

export const feeText = css`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
`;
