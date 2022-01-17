import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

// temporarly put theme values to this class

export const theme = css`
  --gray: rgb(160, 160, 160);
  --white: #ffffff;
  --background: #f5f5f7;

  /* Material Design naming convention for theme colors */
  --surface-01: #0e0e0e;
  --surface-02: #313131;
  --surface-03: #6e6e6e;
  --surface-04: #767676;
  --surface-05: #a1a1a1;
  --surface-06: #cccccc;
  --surface-07: #e7e7e7;
  --surface-08: #f2f2f2;
  --surface-09: #fafafa;
  --surface-10: #cccccc;

  --surface: var(--surface-01);

  --primary: #00cc33;
  --primary-variant: #33732f;
  --secondary: #0ba1ff;
  --secondary-variant: #1ea39b;
  /* Material Design naming convention for theme colors */

  /* LAYOUT */
  --site-max-width: 120rem;
  --header-height: 6.4rem;

  /* FONTS */
  --font-family-decorative: Righteous;
  --font-family: "Inter", sans-serif;
  --font-size: 1.6rem;
  --font-color: var(--surface-04);

  --headings-color: var(--surface-02);

  /* ELEMENTS */
  --border-radius: 0.4rem;

  background-color: var(--background);

  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--surface-03);

  /* Push footer to bottom -- */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const section = css`
  padding: 2.4rem 0;

  ${breakpoints.medium} {
    padding: 4.4rem 0;
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
  background-color: var(--background);
  border-radius: var(--border-radius);
  position: relative;
  margin-bottom: 2rem;

  min-width: 28.5rem;

  & img {
    object-fit: cover;
    width: 100%;
    border-radius: var(--border-radius);
  }
`;

export const contentBoxHero = css`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 3.4rem;
  z-index: 1;
  position: relative;
  margin: 1rem;

  ${breakpoints.medium} {
    padding: 7.4rem;
    z-index: 0;
    flex-basis: 100%;
  }
`;

export const contentBoxImage = css`
  background-color: var(--background);
  border-radius: var(--border-radius);

  margin: 1rem 0;

  & img {
    object-fit: cover;
    width: 100%;
    border-radius: var(--border-radius);
  }
`;

export const contentBoxImageBelowText = css`
  ${contentBoxHero};
  min-height: 40rem;
  margin: -20rem 0px 0px;
  z-index: 0;
  position: relative;

  ${breakpoints.medium} {
    border-radius: var(--border-radius);
    margin: 1rem;
    min-height: auto;
    flex-basis: 100%;

    & img {
      object-fit: cover;
      width: 100%;
      border-radius: var(--border-radius);
    }
  }
`;
