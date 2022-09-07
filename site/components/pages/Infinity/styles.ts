import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const gradientBackgroundTop = css`
  margin-top: calc(var(--header-height) * -1);
  padding: 0 !important;
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  background-color: #000;
  background: radial-gradient(
    circle at center center,
    rgba(11, 161, 255, 0.6),
    transparent 600px
  );
  ${breakpoints.large} {
    background: radial-gradient(
      circle at center center,
      rgba(11, 161, 255, 0.6),
      transparent 900px
    );
  }
`;

export const heroKlimaLogo = css`
  max-width: 25rem;
  ${breakpoints.large} {
    max-width: 35rem;
  }
`;

export const heroSection = css`
  /* Because we use negative margin on the parent (for the gradient), we need to compensate */
  margin-top: var(--header-height);
  padding: 0.4rem;
  min-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  grid-column: full;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${breakpoints.desktop} {
    min-height: calc(100vh - var(--header-height));
  }
  .hero_container {
    z-index: 4;
    grid-column: main;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero_title_container {
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    padding: 0.8rem;
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
    .hero_container {
      align-content: center;
      margin-top: unset;
      grid-template-rows: unset;
    }
  }
`;

export const infoSection = css`
  position: relative;
  background: radial-gradient(
    at bottom left,
    rgba(11, 161, 255, 0.6),
    transparent 600px
  );

  ${breakpoints.desktop} {
    padding: 16rem 0rem;
    background: radial-gradient(
      at bottom left,
      rgba(11, 161, 255, 0.5),
      transparent 1600px
    );
  }

  ${breakpoints.desktopLarge} {
    padding: 16rem 0rem;
    background: radial-gradient(
      at bottom left,
      rgba(11, 161, 255, 0.4),
      transparent 2400px
    );
  }

  .info_container {
    z-index: 2;
    grid-column: main;
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    gap: 6.4rem;
    ${breakpoints.large} {
      flex-direction: row;
    }
  }
  .info_left_container {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-end;
    display: flex;
    gap: 6.4rem;
    order: 2;
    ${breakpoints.large} {
      width: calc(50% - 3.2rem);
      max-width: 50%;
      order: 1;
    }
  }
  .info_subtitle {
    display: flex;
    align-items: flex-end;
  }
  .info_right_container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 0;
    order: 1;
    gap: 4rem;
    ${breakpoints.large} {
      gap: 2rem;
      width: calc(50% - 3.2rem);
      max-width: 50%;
      order: 2;
    }
  }
  .info_title_container {
    display: grid;
    padding-bottom: 2.4rem;
    ${breakpoints.medium} {
      padding-bottom: 0;
    }
  }
  .info_image_box {
    height: 26.4rem;
    position: relative;
    width: 100%;
    border-radius: 1.6rem;
    overflow: hidden;
  }
  .info_image_box_alt {
    height: 28.8rem;
    position: relative;
    width: 100%;
    border-radius: 1.6rem;
    overflow: hidden;
    ${breakpoints.large} {
      width: 80%;
    }
  }
  .info_br {
    display: none;
    ${breakpoints.medium} {
      display: block;
    }
    ${breakpoints.large} {
      display: none;
    }
  }
  .info_image_description {
    z-index: 999;
    bottom: -2.2rem;
    left: 2.2rem;
    ${breakpoints.medium} {
      bottom: -3.2rem;
      left: 3.2rem;
      width: calc(100% - 3.2rem);
      padding-right: 1.6rem;
    }
    ${breakpoints.large} {
      left: 3.8rem;
      bottom: -3.8rem;
      width: calc(100% - 3.8rem);
      padding-right: 1.6rem;
    }
    ${breakpoints.desktopLarge} {
      left: 4.8rem;
      bottom: -4.8rem;
      width: calc(100% - 4.8rem);
      padding-right: 1.6rem;
    }
    position: relative;
  }
  .carousel_image {
    z-index: 1;
  }
  .info_image_title {
    font-weight: 300;
  }
`;

export const whySection = css`
  padding: 12rem 0rem;
  position: relative;
  background-color: #000;
  background: radial-gradient(
    at top left,
    rgba(11, 161, 255, 0.6),
    transparent 600px
  );

  ${breakpoints.desktop} {
    padding: 16rem 0rem;
    background: radial-gradient(
      at top left,
      rgba(11, 161, 255, 0.5),
      transparent 1600px
    );
  }

  ${breakpoints.desktopLarge} {
    padding: 16rem 0rem;
    background: radial-gradient(
      at top left,
      rgba(11, 161, 255, 0.4),
      transparent 2400px
    );
  }

  .why_container {
    display: flex;
    grid-column: main;
    z-index: 1;
    flex-direction: column;
    width: 100%;
    ${breakpoints.large} {
      flex-direction: row;
    }
  }
  .why_title {
    padding: 0.8rem 0 2.4rem 0;
    font-weight: 600;
  }
  .why_left_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-bottom: 2.4rem;
    ${breakpoints.large} {
      width: 35%;
      padding-bottom: 0;
    }
  }
  .why_right_container {
    width: 100%;
    height: auto;
    padding-left: 0;
    ${breakpoints.large} {
      padding-left: 6.4rem;
      width: 65%;
      height: 100%;
    }
  }
  .why_right_img {
    border-radius: 1.6rem;
  }
`;

export const getStartedSection = css`
  position: relative;
  .getStarted_container {
    display: flex;
    grid-column: main;
    height: 100%;
    max-height: 100%;
    z-index: 9;
    flex-direction: column;
    ${breakpoints.large} {
      max-height: 44rem;
      flex-direction: row;
    }
  }
  .getStarted_image {
    z-index: 2;
    opacity: 0.6;
  }
  .getStarted_left_container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    order: 2;
    ${breakpoints.large} {
      width: 65%;
      flex-direction: row;
      order: 1;
      gap: 1.6rem;
    }
  }
  .getStarted_right_container {
    width: 100%;
    padding-left: 0;
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    order: 1;
    ${breakpoints.large} {
      padding-left: 3.4rem;
      padding-top: 16rem;
      width: 35%;
      justify-content: flex-end;
      order: 1;
    }
  }
  .getStarted_button {
    align-self: flex-start;
  }
  .getStarted_number {
    color: var(--klima-blue);
  }
  .getStarted_section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 0;
    padding-top: 2.4rem;
    ${breakpoints.large} {
      padding-right: 1.6rem;
      padding-top: 0;
      width: 33%;
    }
  }
  .getStarted_title {
    padding: 0.8rem 0;
    ${breakpoints.large} {
      padding: 1.6rem 0;
    }
  }
  .getStarted1 {
    justify-content: flex-end;
  }
  .getStarted2 {
    justify-content: center;
  }
  .getStarted3 {
    justify-content: flex-start;
  }
`;
export const carouselSection = css`
  position: relative;
  overflow: visible;

  background: radial-gradient(
    at bottom right,
    rgba(11, 161, 255, 0.4),
    transparent 800px
  );

  ${breakpoints.desktop} {
    background: radial-gradient(
      at bottom right,
      rgba(11, 161, 255, 0.4),
      transparent 1500px
    );
  }

  ${breakpoints.desktopLarge} {
    background: radial-gradient(
      at bottom right,
      rgba(11, 161, 255, 0.4),
      transparent 2000px
    );
  }

  .carousel_container {
    grid-column: main;
    display: flex;
    z-index: 2;
    flex-direction: column;
    gap: 4rem;
    ${breakpoints.large} {
      flex-direction: row;
      gap: 0;
    }
  }
  .carousel_left_container {
    width: 100%;
    padding-right: 0;
    order: 2;
    ${breakpoints.large} {
      width: 60%;
      padding-right: 2.8rem;
      order: 1;
    }
  }
  .carousel_right_container {
    width: 100%;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    order: 1;
    ${breakpoints.large} {
      width: 40%;
      padding-left: 0.8rem;
      order: 2;
    }
  }
  .carousel_image_description {
    margin-top: -5.4rem;
    z-index: 999;
    padding-left: 1.6rem;
    ${breakpoints.large} {
      padding-left: 3.6rem;
    }
    position: relative;
  }
  .carousel_image {
    z-index: 2;
  }
`;
export const polygonSection = css`
  overflow: visible;
  position: relative;
  background: radial-gradient(
    at top right,
    rgba(11, 161, 255, 0.4),
    transparent 800px
  );

  ${breakpoints.desktop} {
    background: radial-gradient(
      at top right,
      rgba(11, 161, 255, 0.4),
      transparent 1500px
    );
  }

  ${breakpoints.desktopLarge} {
    background: radial-gradient(
      at top right,
      rgba(11, 161, 255, 0.4),
      transparent 2000px
    );
  }

  .polygon_container {
    grid-column: main;
    background: var(--surface-04);
    border-radius: 1.6rem;
    display: flex;
    gap: 4.8rem;
    flex-direction: column;
    padding: 3.2rem;
    ${breakpoints.desktopLarge} {
      padding: 5.5rem;
      flex-direction: row;
    }
  }
  .polygon_left_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
    gap: 2.4rem;
    ${breakpoints.desktopLarge} {
      width: 40%;
    }
  }
  .polygon_button {
    color: #000 !important;
    width: min-content;
    white-space: nowrap;
  }
  .polygon_right_container {
    width: 100%;
    gap: 2.4rem;
    display: flex;
    flex-wrap: wrap;
    ${breakpoints.desktopLarge} {
      width: 60%;
    }
  }
  .polygon_full_blox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3.2rem 2.4rem 4.8rem;
    gap: 24px;
    background: #000;
    border-radius: 16px;
    height: min-content;
  }
  .polygon_half_blox {
    height: min-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3.2rem 2.4rem 4.8rem;
    gap: 1.4rem;
    background: #000;
    border-radius: 16px;
    ${breakpoints.large} {
      width: calc(50% - 1.2rem);
    }
  }
  .polygon_number {
    font-weight: 600;
    font-size: 64px;
    line-height: 72px;
  }
  .polygon_subtitle {
    color: #9c9c9c;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.6rem;
  }
`;
export const missionSection = css`
  position: relative;
  overflow: visible;
  background: radial-gradient(
    at center center,
    rgba(11, 161, 255, 0.3),
    transparent 300px
  );

  ${breakpoints.desktop} {
    background: radial-gradient(
      at center,
      rgba(11, 161, 255, 0.3),
      transparent 1200px
    );
  }
  .mission_image_container {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;
    top: -5rem;
  }
  .mission_container {
    grid-column: main;
    z-index: 3;
    overflow: visible;
    display: flex;
    flex-direction: column;
    gap: 5.6rem;
    align-items: center;
    padding: 1.6rem;
    ${breakpoints.large} {
      padding: 0 !important;
    }
  }
  .mission_header {
    width: 100%;
    ${breakpoints.large} {
      width: 90%;
    }
  }
  .mission_cards_container {
    display: flex;
    gap: 3.2rem;
    flex-direction: column;
    ${breakpoints.desktop} {
      flex-direction: row;
    }
  }
  .mission_card {
    flex-grow: 1;
    background: rgba(27, 70, 89, 0.7);
    border-radius: 1.6rem;
    height: 48.8rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .mission_card_text {
    height: 50%;
    padding: 4.8rem 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }
  .mission_card_image_box {
    height: 50%;
    position: relative;
    width: 100%;
  }
`;

export const faqSection = css`
  background: radial-gradient(
      at top right,
      rgba(11, 161, 255, 0.6),
      transparent 400px
    ),
    radial-gradient(at bottom left, rgba(11, 161, 255, 0.5), transparent 600px);

  ${breakpoints.large} {
    background: radial-gradient(
        at top right,
        rgba(11, 161, 255, 0.6),
        transparent 900px
      ),
      radial-gradient(
        at bottom left,
        rgba(11, 161, 255, 0.5),
        transparent 900px
      );
    background-color: #1b4659;
  }
  background-color: #1b4659;
  padding-top: 0 !important;
  position: relative;
  .faq_answer2 {
    gap: 1.2rem;
    display: flex;
    flex-direction: column;
  }

  .faq_container {
    grid-column: main;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rem 0;
    ${breakpoints.large} {
      padding: 16rem 0;
    }
  }
  .faq_title_container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.6rem;
    cursor: pointer;
    ${breakpoints.large} {
      padding-bottom: 1.6rem;
    }
  }
  .faq_title_container p {
    font-weight: 300;
  }
  .faq_answer_text {
    -webkit-transition: all 0.15s ease;
    -moz-transition: all 0.15s ease;
    -o-transition: all 0.15s ease;
    transition: all 0.15s ease;
    padding: 0;
    height: 0rem;
    max-height: 0rem;
    overflow: hidden;
  }
  .faq_answer_text[data-display="true"] {
    padding: 1.2rem 0 3.2rem 0;
    height: auto;
    max-height: 100%;
  }

  .faq_question_container {
    padding-top: 1.6rem;
    -webkit-transition: all 0.15s ease;
    -moz-transition: all 0.15s ease;
    -o-transition: all 0.15s ease;
    transition: all 0.15s ease;
    height: 100%;
    ${breakpoints.large} {
      padding-top: 1.6rem;
    }
    p {
      max-width: 100%;
      ${breakpoints.large} {
        max-width: 90%;
      }
    }
  }
  .faq_divider {
    width: 100%;
    height: 0rem;
    border-bottom: 1px solid var(--font-03);
  }
  .faq_expand {
    cursor: pointer;
  }
  .faq_title {
    padding-bottom: 4.8rem;
    text-align: left;
  }
  .faq_button {
    width: 100%;

    ${breakpoints.large} {
      width: max-content;
    }
  }
  .faq_button_container {
    padding-top: 2.4rem;
  }
`;
export const ctaSection = css`
  position: relative;
  overflow: hidden;

  ${breakpoints.large} {
    background: radial-gradient(
      circle at right,
      rgb(4 65 104 / 60%),
      transparent 90%
    );
  }

  .cta_container {
    grid-column: main;
    display: flex;
    flex-wrap: wrap;
  }
  .cta_left_container {
    width: 100%;
    display: flex;
    gap: 1.6rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-right: 0;
    position: relative;
    padding-bottom: 2.4rem;
    ${breakpoints.large} {
      padding-bottom: 0;
    }
    ${breakpoints.large} {
      width: 50%;
      padding-right: 10%;
    }
    p {
      font-size: 24px;
      font-weight: 300;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: center;
      ${breakpoints.large} {
        text-align: left;
      }
    }
  }
  .cta_right_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    ${breakpoints.large} {
      width: 50%;
      justify-content: flex-end;
    }
    button {
      height: 4rem;
      min-height: 4rem;
    }
  }
  .cta_logo {
    width: 100%;
    max-width: 30rem;
    ${breakpoints.large} {
      max-width: 45rem;
    }
  }
`;

export const divider = css`
  grid-column: main;
  margin-top: auto;
  height: 0.15rem;
  width: 100%;
  opacity: 0.3;
  background-color: var(--font-03);
`;

export const footerContainer = css`
  padding-bottom: 2.4rem;
  padding-top: 4.8rem;
  grid-template-rows: 1fr 4.8rem 1fr;
  row-gap: 1rem;
  background-image: radial-gradient(
    circle at top right,
    rgb(11 103 160 / 60%),
    transparent 135%
  );

  ${breakpoints.large} {
    padding-bottom: 3.2rem;
  }
`;
