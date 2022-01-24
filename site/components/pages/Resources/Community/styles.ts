import { css } from "@emotion/css";

export const page_topElement = css`
  padding-bottom: 1.6rem;

  h1 {
    padding: 1.6rem 0;
  }

  p {
    margin-bottom: 1.6rem;
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
`;

export const page_section = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 5.7rem 0;
`;

export const page_eyebrow = css`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`;

export const page_paragraph = css`
  text-align: center;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.4rem;
  line-height: 140%;
`;

export const page_imageContainer = css`
  width: calc(100% - 6.4rem);
  margin-right: 3.2rem;
  margin-left: 3.2rem;
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
`;

export const page_image = css`
  width: 10px;
  margin-left: 2.4rem;
  margin-right: 2.4rem;
  margin-bottom: 4.4rem;
  border-radius: 1.2rem;
`;

export const page_bgGray = css`
  background-color: #f5f5f7;
`;

export const section_partnerLogos = css`
  position: relative;
  display: grid;
  grid-template-layout: 14.5rem 14.25rem;

  & > * {
    width: 14.5rem !important;
    height: 3rem !important;
  }
`;

export const page_imageSection = css`
  position: relative;
`;

export const page_backingImage = css``;

export const page_overlayText = css`
  text-transform: uppercase;
  color: var(--white);
  text-align: right;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 95.5%;
`;

export const page_overlayTextContainer = css`
  width: calc(100% - 6.8rem);
  position: absolute;
  bottom: 3.4rem;
  margin-right: 3.4rem;
  margin-left: 3.4rem;
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

export const page_screenShot = css``;

// export const section_partnerLogos = css`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   padding: 0 2.4rem;
//
//   & > * {
//     display: flex;
//     flex: 1 1 14.5rem;
//     width: 14.5rem !important;
//     height: 3rem !important;
//   }
// `;
