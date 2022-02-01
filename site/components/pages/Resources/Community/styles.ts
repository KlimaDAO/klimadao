import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const communityContainer = css`
  grid-column: main;

  ${breakpoints.medium} {
    display: grid;
    grid-template-columns:
      [community_full-start] minmax(20rem, 1fr)
      [community_inner-start] minmax(0, 107.2rem)
      [community_inner-end] minmax(20rem, 1fr)
      [community_full-end];

    gap: 2.5rem;
  }
`;

export const community_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    grid-column: community_inner;
  }

  img {
    border-radius: 1.6rem 1.6rem 0 0;
  }
`;

export const partner_logos = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;

  padding: 3rem 0;

  ${breakpoints.medium} {
    grid-column: community_inner;
  }

  .partner_logo {
    max-width: 15rem;
  }
`;

export const beachSection = css`
  grid-column: full;
  display: grid;
  height: 72rem;
  position: relative;
  padding: 3.2rem 0rem;
  .beach_label {
    font-size: 5rem;
    line-height: 5rem;
    grid-column: main;
    z-index: 1;
    text-align: end;
    justify-self: end;
    align-self: end;
    max-width: 50rem;
  }
  ${breakpoints.medium} {
    padding: 6.4rem 0rem;
    font-size: 7.2rem;
    line-height: 7.2rem;
  }
`;

export const joinDiscord = css`
  margin-top: 3rem;
  display: grid;
  grid-column: main;
  grid-template-rows: 1fr 1fr;
  column-gap: 6.4rem;
  padding: 3.2rem;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;
  overflow: hidden;

  .joinDiscord_col1 {
    display: grid;
    align-self: flex-start;
    gap: 1.6rem;
    justify-items: start;
  }

  .joinDiscord_col2 {
    display: grid;
    position: relative;
  }

  .joinDiscord_dummy {
    opacity: 0.8;
    position: absolute;
    top: 2.4rem;
    left: 5%;
    width: 74rem;
    height: 48rem;
    box-shadow: var(--shadow-06);
    overflow: hidden;
    border-radius: 2.4rem;
  }

  ${breakpoints.medium} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
    padding: 6.4rem;

    .joinDiscord_dummy {
      top: 2.4rem;
    }
  }
`;

export const page_topElementMobile = css`
  padding-bottom: 1.6rem;

  h1 {
    padding: 1.6rem 0;
  }

  p {
    margin-bottom: 1.6rem;
  }
`;

export const page_topElementDesktop = css`
  display: none;
  ${breakpoints.medium} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 4.5rem;

    h1 {
      font-size: 6rem;
    }

    p {
      margin-bottom: 3.6rem;
    }

    button {
      margin-bottom: 0;
    }
  }
`;

export const page_h1 = css`
  text-align: center;
  padding: 2rem 0;
  text-transform: uppercase;
  color: var(--headings-color);
`;

export const page_h2 = css`
  text-align: center;
  text-transform: uppercase;
  color: var(--headings-color);
  font-size: 3.2rem;
  margin-bottom: 2.4rem;

  br {
    display: block;
  }

  span {
    display: none;
  }

  ${breakpoints.medium} {
    font-size: 4.8rem;
    margin-bottom: 2.2rem;

    br {
      display: none;
    }
    span {
      display: inline-block;
    }
  }
`;

export const page_h2_mb_Lg = css`
  ${breakpoints.medium} {
    margin-bottom: 4rem;
  }
`;

export const page_section = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  padding: 5.7rem 0;
`;

export const page_section_pt_Lg = css`
  padding-top: 9.1rem;
`;

export const page_section_pt_Xl = css`
  ${breakpoints.medium} {
    padding-top: 13.1rem;
  }
`;

export const page_pb_0 = css`
  padding-bottom: 0;
`;

export const page_eyebrow = css`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  font-weight: bold;
  font-size: 1.6rem;
`;

export const page_paragraph = css`
  text-align: center;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.4rem;
  line-height: 140%;
  ${breakpoints.medium} {
    font-size: 2rem;
    max-width: 40rem;
    margin-bottom: 3.6rem;
  }
`;

export const page_imageContainer = css`
  width: calc(100% - 6.4rem);
  margin-right: 3.2rem;
  margin-left: 3.2rem;

  ${breakpoints.medium} {
    width: 70.8rem;
  }
`;

export const page_ctaButton = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 12rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4.4rem;
  height: 4rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  ${breakpoints.medium} {
    font-size: 1.6rem;
    width: 20rem;
    height: 5.2rem;
    margin-bottom: 3.6rem;
  }
`;

export const page_image = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 2.4rem;
  margin-right: 2.4rem;
  margin-bottom: 4.4rem;
  border-radius: 1.2rem;

  ${breakpoints.small} {
    display: none !important;
  }
`;

export const page_imageDesktop = css`
  display: none;

  ${breakpoints.small} {
    display: inline-block !important;
    height: 30.1rem;
  }
`;

export const page_bgGray = css`
  background-color: #f5f5f7;
`;

// export const section_partnerLogos = css`
//   position: relative;
//   display: grid;
//   grid-template-layout: 14.5rem 14.25rem;
//
//   & > * {
//     width: 14.5rem !important;
//     height: 3rem !important;
//   }
// `;

export const page_imageSection = css`
  position: relative;

  ${breakpoints.medium} {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

export const page_backingImage = css`
  span,
  img {
    width: 100% !important;
  }

  ${breakpoints.small} {
    display: none !important;
    height: 0;
  }
`;

export const page_backingImage_desktop = css`
  display: none !important;

  ${breakpoints.small} {
    display: inline-block !important;
    width: 100%;
  }
`;

export const page_overlayText = css`
  text-transform: uppercase;
  color: var(--white);
  text-align: right;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 95.5%;

  ${breakpoints.medium} {
    font-size: 70px;
  }
`;

export const page_desktopOnly = css`
  display: none;

  ${breakpoints.medium} {
    display: inline-block !important;
  }
`;

export const page_overlayTextContainer = css`
  width: calc(100% - 6.8rem);
  position: absolute;
  bottom: 3.4rem;
  margin-right: 3.4rem;
  margin-left: 3.4rem;

  ${breakpoints.medium} {
    width: calc(100% - 36.6rem);
    position: relative;
    margin-right: 18.3rem;
    margin-left: 18.3rem;
    margin-bottom: 6.5rem;
    max-width: 70rem;
  }
`;

export const page_overlayTextWrapper = css`
  ${breakpoints.small} {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  }
`;

export const page_roundedBox = css`
  background-color: var(--white);
  width: calc(100% - 6.8rem);
  height: 52rem;
  bottom: 3.4rem;
  margin-right: 3.4rem;
  margin-left: 3.4rem;
  padding-top: 3.4rem;
  padding-left: 2.8rem;
  overflow: hidden;

  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;

  h2 {
    text-align: left;
    margin-bottom: 2.8rem;
    padding-right: 2.8rem;
  }

  p {
    line-height: 140%;
    margin-bottom: 2.8rem;
    padding-right: 2.8rem;
  }

  ${breakpoints.small} {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    height: 32rem;
    padding: 0;

    h2 {
      font-size: 2.8rem;
    }
  }

  ${breakpoints.medium} {
    display: flex;
    flex-direction: row;
    align-items: start;
    width: 70.8rem;
    height: 32rem;
    padding: 0;

    h2 {
      font-size: 2.8rem;
    }
  }
`;

export const page_roundedBoxTextContainer = css`
  ${breakpoints.small} {
    width: 50%;
    padding-top: 4rem;
    padding-left: 3.6rem;
  }

  ${breakpoints.medium} {
    padding-right: 3.6rem;
  }
`;

export const page_discordButton = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #7780f0 0%, #5c65ed 100%);
  border-radius: 4px;
  width: 12.8rem;
  height: 4rem;
  padding: 1.6rem;
  font-size: 1.4rem;
  margin-bottom: 4.8rem;
`;

export const page_discordIcon = css`
  width: 2rem;
`;

export const page_screenShot = css`
  ${breakpoints.small} {
    display: flex !important;
    flex-direction: column;
    justify-content: end;
    width: 50%;
    height: 100%;

    & > span {
      height: 27rem !important;

      img {
        object-position: left;
      }
    }
  }

  ${breakpoints.medium} {
  }
`;

export const section_partnerLogos = css`
  background-color: #f5f5f7;

  h2 {
    margin-bottom: 4.3rem;
  }
`;

// export const section_partnerLogos_imageContainer = css`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   padding: 0 2.4rem;
//
//   & > * {
//     display: flex;
//     flex: 1 1 14.5rem;
//     flex-direction: row;
//     justify-content: center;
//     width: 14.5rem !important;
//     height: 3rem !important;
//     margin-bottom: 3rem;
//   }
//
//   img {
//     border-radius: 0;
//   }
// `;

export const section_partnerLogos_imageContainer = css`
  position: relative;
  display: grid;
  grid-template-columns: 14.5rem 14.5rem;
  grid-template-rows: 3rem;
  grid-column-gap: 3.2rem;
  grid-row-gap: 3.2rem;
  padding: 0 2.4rem;

  & > * {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 3rem;
  }

  img {
    border-radius: 0;
  }
`;
