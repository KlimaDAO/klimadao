import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const heroSection = css`
  min-height: 100vh;
  padding: 0 !important;
  .tooltip_underline {
    text-decoration: dotted;
  }

  .hero_container {
    z-index: 2;
    display: flex;
    grid-column: main;
    justify-content: center;
    align-items: center;
  }
  .hero_title_container {
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .hero_title_container p {
    text-align: center;
  }
  .hero_title {
    padding: 2.4rem 0;
  }

  .hero_image_container {
    z-index: 1;
    position: absolute;
    width: 100%;
    max-width: 100rem;
    height: 100%;
  }
  .hero_buttons {
    display: grid;
    gap: 1.8rem;
    grid-auto-flow: column;
    padding-top: 2.4rem;
  }
  ${breakpoints.large} {
    min-height: calc(100vh - var(--header-height) * 2);
    .hero_container {
      align-content: center;
      margin-top: unset;
      grid-template-rows: unset;
    }
  }

  ${breakpoints.desktopLarge} {
  }
`;

export const sliderSection = css`
padding: 0 !important;
.slider_container {
  grid-column: main;
  display: grid;
  gap: 4.4rem;
  justify-content: center;
  align-items: center;
}
`
