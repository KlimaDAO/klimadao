import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const gridContainer = css`
  display: grid;
  grid-template-columns:
    [full-start] minmax(1.6rem, 1fr)
    [main-start] minmax(0, 107.2rem)
    [main-end] minmax(1.6rem, 1fr)
    [full-end];
`;

export const section = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  background-color: var(--surface-01);
  &.gray {
    background-color: var(--surface-02);
  }
`;

export const columns = css`
  ${breakpoints.medium} {
    display: flex;
    gap: 2rem;
  }
`;

export const columnsWrapped = css`
  justify-content: center;
  flex-wrap: wrap;
`;

export const columnsSmall = css`
  ${breakpoints.small} {
    display: flex;
    gap: 4rem;
  }
`;

export const columnsHero = css`
  ${breakpoints.medium} {
    display: flex;
    gap: 2rem;
  }
`;

export const columnsContained = css`
  ${columns};

  ${breakpoints.medium} {
    display: flex;
    max-width: 90rem;
    margin: 2.4rem auto;
    justify-content: space-evenly;
    gap: 2rem;

    & * {
      flex-basis: 100%;
    }
  }
`;

export const contentBox = css`
  background-color: var(--surface-01);
  border-radius: 1.6rem;
  position: relative;
  min-width: 28.5rem;

  & img {
    object-fit: cover;
    width: 100%;
    border-radius: 1.6rem;
  }
`;

export const contentBoxHero = css`
  display: grid;
  box-shadow: var(--shadow-06);
  background-color: var(--surface-01);
  border-radius: 1.6rem;
  padding: 3.2rem;
  z-index: 1;
  position: relative;
  gap: 1.6rem;

  ${breakpoints.medium} {
    gap: 2.4rem;
    padding: 6.4rem;
    z-index: 0;
    flex-basis: 100%;
  }
`;

export const contentBoxImage = css`
  position: relative;
  background-color: var(--surface-01);
  border-radius: 1.6rem;
  overflow: hidden;

  margin: 1rem 0;

  & img {
    object-fit: cover;
    width: 100%;
  }
`;

export const contentBoxImageBelowText = css`
  ${contentBoxHero};
  min-height: 40rem;
  margin: -20rem 0px 0px;
  z-index: 0;
  position: relative;

  ${breakpoints.medium} {
    border-radius: 1.6rem;
    margin: 0;
    min-height: auto;
    flex-basis: 100%;

    & img {
      object-fit: cover;
      width: 100%;
      border-radius: 1.6rem;
    }
  }
`;
