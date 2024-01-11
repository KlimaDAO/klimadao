import { css } from "@emotion/css";

export const banner = css`
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  display: grid;
  position: absolute;
  grid-column: full;
  overflow: hidden;
  background: #ebedff;
  grid-template-columns: inherit;
  box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease-in-out;
  transform: translateY(-15rem);

  &.feature-banner {
    transform: translateY(0);
  }

  .close {
    top: 2rem;
    right: 2.4rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
  }

  .contents {
    gap: 1rem;
    display: grid;
    grid-column: full;
    padding: 2rem 5.2rem;
  }
`;

export const title = css`
  gap: 1rem;
  display: flex;
  align-items: center;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: row;
  }

  svg {
    margin-left: -2.4rem;
  }

  p,
  svg {
    font-weight: 700;
    color: var(--bright-blue);
  }

  .new-feature {
    color: var(--black);
    font-family: var(--font-family-secondary);
  }
`;

export const buttons = css`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;

  a,
  button {
    min-height: 3.6rem;
  }
`;
