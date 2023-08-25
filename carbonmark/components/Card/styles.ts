import { css } from "@emotion/css";

export const card = css`
  overflow: hidden;
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;

  // position: relative creates a new stacking context for tooltips to attach to,
  // otherwise the next closest stacking context would be the sticky column which
  // can change sizes and cause the tooltip to shift.
  position: relative;
`;
