import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const heroSection = css`
  min-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  grid-column: full;
  position: relative;
  .tooltip_underline {
    text-decoration: dotted;
  }
  .hero_blur {
    z-index: 11;
    position: absolute;
    width: 521px;
    height: 521px;
    right: 0px;
    top: 411.5px;
    background-color: #0ba1ff;
    filter: blur(800px);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
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
`;

export const sliderSection = css`
  position: relative;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  .slider_container {
    z-index: 12;
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
    position: relative;
    z-index: 12;
    width: calc(100% - 4.8rem);
    display: flex;
    gap: 2rem;
    grid-column-start: main;
    padding-top: 3.4rem;
    grid-column: full;
    padding: 3.4rem 2.4rem 0 2.4rem;
    left: 2.4rem;
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
    width: 6rem;
    height: 6rem;
    background: white;
    border-radius: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .slider_arrow svg {
    fill: var(--klima-blue);
    height: 3rem;
    width: 3rem;
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
  position: relative;
  .info_blur {
    z-index: 1;
    position: absolute;
    width: 497.33px;
    height: 492px;
    left: 0px;
    bottom: -280px;
    background-color: #0ba1ff;
    filter: blur(800px);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
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
    ${breakpoints.large} {
      width: calc(50% - 3.2rem);
      max-width: 50%;
      order: 2;
    }
  }
  .info_title_container {
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
  padding-top: 0 !important;
  position: relative;
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
    height: 100%;
    padding-left: 0;
    ${breakpoints.large} {
      padding-left: 6.4rem;
      width: 65%;
    }
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
    width: 14rem;
    padding: 0 2rem;
    white-space: nowrap;
    max-height: 4rem;
    min-height: 4rem;
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
  .carousel_blur {
    z-index: 1;
    position: absolute;
    width: 521px;
    height: 521px;
    left: 0px;
    bottom: -110px;
    background-color: rgba(11, 161, 255, 0.8);
    filter: blur(800px);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    overflow: visible;
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
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
  padding-top: 0 !important;
  position: relative;
  .polygon_blur {
    z-index: 1;
    position: absolute;
    width: 521px;
    height: 521px;
    left: 66px;
    top: 570px;
    filter: blur(800px);
    background-color: rgba(11, 161, 255, 0.7);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
  }
  .polygon_container {
    z-index: 2;
    grid-column: main;
    background: var(--surface-04);
    border-radius: 1.6rem;
    display: flex;
    gap: 4.8rem;
    flex-direction: column;
    padding: 2.4rem;
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
    padding: 3.2rem 1.6rem 4.8rem;
    gap: 3.2rem;
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
    /* white-space: nowrap; */
  }
`;
export const missionSection = css`
  padding-top: 0rem !important;
  position: relative;
  overflow: visible;
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
    ${breakpoints.large} {
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
export const featuredSection = css`
  padding-top: 0px !important;
  .featured_container {
    grid-column: main;
    height: 100%;
  }
  .featured_logo_wrapper {
    display: flex;
    width: 50%;
    justify-content: center;
    padding: 1.6rem;
    ${breakpoints.large} {
      width: 25%;
    }
  }
  .featured_logo_container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .featured_title {
    padding-bottom: 1.6rem;
    color: var(--font-03);
  }
`;
export const faqSection = css`
  background: #1b4659;
  padding-top: 0 !important;
  position: relative;
  .faq_answer2 {
    gap: 1.2rem;
    display: flex;
    flex-direction: column;
  }
  .faq_blur {
    position: absolute;
    width: 521px;
    height: 521px;
    left: 30px;
    top: -70px;
    background-color: rgba(11, 161, 255, 0.8);
    filter: blur(800px);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
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
    max-height: 4rem;
    min-height: 4rem;

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
  .cta_container {
    grid-column: main;
    display: flex;
    flex-wrap: wrap;
    z-index: 2;
  }
  .cta_left_container {
    width: 100%;
    display: flex;
    align-items: center;
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
      text-align: left;
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
    height: 100%;
    width: 100%;
  }
  .cta_blur {
    z-index: 1;
    position: absolute;
    width: 521px;
    height: 521px;
    left: calc(50% - 521px / 2 + 349px);
    top: 30px;
    display: none;
    ${breakpoints.medium} {
      display: flex;
    }
    background-color: rgba(11, 161, 255, 0.8);
    // filter opacity doesnt work the same on firefox and -moz-background-color wasnt working
    // either so we are using this to target firefox instead. with -moz-background-color the background-color is still the one used. idk why.
    @-moz-document url-prefix() {
      background-color: rgba(11, 161, 255, 0.2);
    }
    filter: blur(800px);
  }
`;
