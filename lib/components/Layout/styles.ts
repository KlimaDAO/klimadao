import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

// temporarly put theme values to this class

export const theme = css`
  --gray: rgb(160, 160, 160);
  --white: #ffffff;

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
  --background: var(--surface-08);
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

export const content = css`
  margin-top: calc(var(--header-height) + 2.4rem);
  margin-bottom: 2.4rem;
  position: relative;
`;

export const section = css`
  display: grid;
  grid-template-columns: 2.4rem 1fr 1fr 2.4rem;
  grid-auto-rows: minmax(100px, auto);
  max-width: 120rem;
  margin: 0 auto;

  ${breakpoints.small} {
    grid-gap: 2rem;
  }
`;

export const contentBox = css`
  grid-column: 2/4;
  grid-row: 1;
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 3.4rem;

  display: flex;
  z-index: 1;

  ${breakpoints.small} {
    padding: 7.4rem;
  }

  ${breakpoints.medium} {
    grid-column: 2;
    padding: 7.4rem;

    z-index: 0;
  }
`;

export const contentBoxImage = css`
  border-radius: var(--border-radius);

  grid-column: 2/4;
  grid-row: 2;

  position: relative;
  min-height: 40rem;

  & img {
    object-fit: cover;
    width: 100%;
    border-radius: var(--border-radius);
  }

  ${breakpoints.medium} {
    grid-column: 3;
    grid-row: 1;
    min-height: auto;
  }
`;

export const contentBoxImageBelowText = css`
  ${contentBoxImage};
  margin-top: -20rem;
  grid-column: 1/5;

  ${breakpoints.medium} {
    margin-top: 0;
  }
`;
