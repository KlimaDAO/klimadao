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

export const sectionWhite = css`
  ${section};
  background-color: var(--white);
`;

export const sectionInner = css`
  margin: 0 auto;
  max-width: var(--site-max-width);
`;

export const sectionInnerHero = css`
  ${sectionInner};
  margin-top: 6.4rem;
  margin-bottom: 2.4rem;
  position: relative;
`;

export const sectionInnerContained = css`
  ${sectionInner};
  max-width: calc(var(--site-max-width) - 2.4rem * 2);
  padding: 2.4rem;
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
  margin-bottom: 2rem;

  min-width: 28.5rem;

  & img {
    object-fit: cover;
    width: 100%;
    border-radius: 1.6rem;
  }
`;

export const contentBoxHero = css`
  background-color: var(--surface-02);
  border-radius: 1.6rem;
  padding: 3.4rem;
  z-index: 1;
  position: relative;

  ${breakpoints.medium} {
    padding: 7.4rem;
    z-index: 0;
    flex-basis: 100%;
  }
`;

export const contentBoxImage = css`
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
    margin: 1rem;
    min-height: auto;
    flex-basis: 100%;

    & img {
      object-fit: cover;
      width: 100%;
      border-radius: 1.6rem;
    }
  }
`;
