import { css } from "@emotion/css";

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

  --font-family-decorative: Righteous;
  --font-family: "Inter", sans-serif;
  --font-size: 1.4rem;

  --background: var(--surface-08);

  background-color: var(--background);
  min-height: 100vh;
  font-family: var(--font-family);
  font-size: var(--font-size);
`;
