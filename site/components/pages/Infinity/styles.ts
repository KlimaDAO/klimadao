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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .slider_card {
    min-width: 29rem;
    max-width: 32.8rem;
    min-height: 38.4rem;
    height: 38.4rem;
    width: 100%;
    border-radius: 1.6rem;
    padding: 2.4rem;
    background: var(--surface-04);
    display: flex;
    flex-direction: column;
  }
  .MuiSvgIcon-root {
    fill: var(--white);
    height: 1.8rem;
    width: 1.8rem;
  }
  .slider_title_container {
    display: flex;
    justify-content: space-between;
  }
  .slider_quote {
    padding-top: 1.6rem;
  }
  .slider_footer {
    height: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
  }
  .slider_content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
  }
  .slider_date {
    color: var(--klima-green);
    padding-bottom: 0.4rem;
  }
  .slider_cards_container {
    overflow-x: scroll;
    width: 100%;
    max-width: 100vw;
    display: flex;
    gap: 2rem;
    grid-column-start: main;
    padding-top: 3.4rem;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .slider_cards_container::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .slider_cards_container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .slider_image_container {
    height: 40px;
  }
  .slider_arrow {
    width: 3rem;
    height: 3rem;
    background: white;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .slider_arrow svg {
    fill: var(--klima-blue);
  }
  .slider_button_container {
    display: none;
    gap: 1rem;
    ${breakpoints.medium} {
      display: flex;
    }
  }
  .slider_title {
    width: 100%;
    ${breakpoints.medium} {
      width: 88%;
    }
  }
`;

export const infoSection = css`
  .info_container {
    display: flex;
    grid-column: main;
    // gap: 2.4rem;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    ${breakpoints.large} {
      flex-direction: row;
    }
  }
  .info_left_container_desktop {
    width: 100%;
    display: none;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6.4rem;
    padding-right: 0;
    ${breakpoints.large} {
      display: flex;
      width: 50%;
      max-width: 50%;
      padding-right: 1.2rem;
    }
  }
  .info_left_container_mobile {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6.4rem;
    ${breakpoints.large} {
      display: none;
    }
  }
  .info_right_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    ${breakpoints.large} {
      width: 50%;
      max-width: 50%;
      padding-left: 1.2rem
    }
  }
  .info_image_mobile {
    display: flex;
    ${breakpoints.large} {
      display: none
    }
  }
  .info_image_desktop {
    display: none;
    ${breakpoints.large} {
      display: flex;
    }
  }
`;
