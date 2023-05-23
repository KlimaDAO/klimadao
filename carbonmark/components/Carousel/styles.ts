import { css } from "@emotion/css";

export const carousel = css`
  display: grid;
  gridcolumn: 1/3;
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

  svg {
    cursor: pointer;
    position: absolute;
    color: white;
    width: 2rem;
    height: 2rem;
    right: 0.75rem !important;
    bottom: 0.75rem !important;
  }
`;

export const slideImg = css`
  display: block;
  height: 32rem;
  width: 100%;
  object-fit: cover;
`;

export const thumbs = css`
  display: flex;
  position: relative;
  align-items: center;

  --thumbs-slide-spacing: 0.7rem;
  --thumbs-slide-height: 9rem;
  margin-top: var(--thumbs-slide-spacing);
`;

export const thumbsViewport = css`
  overflow: hidden;
  width: 100% !important;
`;

export const selected = css`
  inset: 0;
  position: absolute;
  border: 0.2rem solid #ffb800;
`;

export const arrows = css`
  position: absolute;
  top: 0;
  height: 100%;
  color: blue;
  width: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 9999;

  & svg {
    width: 3rem;
    height: 3rem;
  }

  &.left {
    left: 0;
    width: 5rem;
    height: 100%;
    justify-content: flex-start;
    background: linear-gradient(
      -270deg,
      #eeeff5 37.5%,
      rgba(238, 239, 245, 0) 100%
    );
  }

  &.right {
    right: 0;
    width: 5rem;
    height: 100%;
    justify-content: flex-end;
    background: linear-gradient(
      270deg,
      #eeeff5 37.5%,
      rgba(238, 239, 245, 0) 100%
    );
  }
`;

export const thumbsContainer = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: row;
  margin: 0 0.1rem;
`;

export const thumbsSlide = css`
  min-width: 0;
  position: relative;
  max-height: 9rem;
  flex: 0 0 16.66%;
`;

export const thumbsSlideButton = css`
  -webkit-appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: block;
  text-decoration: none;
  cursor: default;
  border: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  opacity: 1;
  max-height: 9rem;
  transition: opacity 0.2s;
`;

export const thumbsSlideImg = css`
  display: block;
  height: var(--thumbs-slide-height);
  width: 100%;
  object-fit: cover;
  max-height: 6rem;
`;
