import { css } from "@emotion/css";

export const loadingOverlay = css`
  position: absolute;
  cursor: default;
  height: 95%;
  width: 102%;
  top: 3rem;
  left: -0.4rem;
  border-radius: 0.8rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #20202095; // surface-02 @ 95% opacity
`;

export const leafIcon = css`
  height: 5rem;
  width: 5rem;
  fill: var(--font-02);
`;
