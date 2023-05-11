import { css } from "@emotion/css";

export const carousel = css`
  // padding: 1.6rem;
`;

export const viewport = css`
  overflow: hidden;
`;

export const container = css`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  flex-direction: row;
  height: auto;
  margin-left: calc(1rem * -1);
`;

export const slide = css`
  overflow: hidden;
  flex: 0 0 100%;
  min-width: 0;
  padding-left: 1rem;
  position: relative;
`;

export const slideImg = css`
  display: block;
  height: 32rem;
  width: 100%;
  object-fit: cover;
`;

export const thumbs = css`
  --thumbs-slide-spacing: 0.8rem;
  --thumbs-slide-height: 9rem;
  margin-top: var(--thumbs-slide-spacing);
`;

export const thumbsViewport = css`
  overflow: hidden;
`;

export const thumbsContainer = css`
  display: flex;
  flex-direction: row;
  margin-left: calc(var(--thumbs-slide-spacing) * -1);
`;

export const thumbsSlide = css`
  min-width: 0;
  padding-left: var(--thumbs-slide-spacing);
  position: relative;
  max-height: 60px;
`;

// @media (min-width: 576px) {
//   .embla-thumbs__slide {
//     flex: 0 0 18%;
//   }
// }

export const thumbsSlideButton = css`
  -webkit-appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: block;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  opacity: 1;
  max-height: 60px;
  transition: opacity 0.2s;
`;

export const thumbsSlideSelected = css`
  button {
    opacity: 1;
  }
`;

export const thumbsSlideImg = css`
  display: block;
  height: var(--thumbs-slide-height);
  width: 100%;
  object-fit: cover;
  max-height: 60px;
`;
