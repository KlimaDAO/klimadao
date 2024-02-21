import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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
  transform: translateY(-18rem);

  &.feature-banner {
    transform: translateY(6.4rem);
  }

  .close {
    top: 1.6rem;
    right: 1.6rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;

    ${breakpoints.desktop} {
      top: 2rem;
      right: 2.4rem;
    }
  }

  .contents {
    gap: 1rem;
    display: grid;
    grid-column: auto;
    padding: 1.6rem 2.4rem;

    ${breakpoints.desktop} {
      padding: 2rem 5.2rem;
    }
  }

  .title {
    gap: 1rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    ${breakpoints.desktop} {
      align-items: center;
      flex-direction: row;
    }

    div {
      display: flex;
      flex-direction: column;

      ${breakpoints.desktop} {
        flex-direction: row;
      }
    }

    svg {
      width: 2rem;
      height: 2rem;

      ${breakpoints.desktop} {
        margin-left: -3.2rem;
      }
    }

    p,
    svg {
      font-weight: 700;
      color: var(--bright-blue);
    }

    .new-feature {
      gap: 1.2rem;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;

      p {
        color: var(--black);
        font-family: var(--font-family-secondary);
      }
    }
  }
`;

export const buttons = css`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;

  a,
  button {
    width: 50%;
    min-height: 3.6rem;
    padding: 0 1rem;

    ${breakpoints.desktop} {
      padding: 0 2.4rem;
      width: fit-content;
    }
  }
`;
