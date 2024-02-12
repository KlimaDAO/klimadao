import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const carousel = css`
  width: 100%;
  height: 80vh;
  position: relative;
`;

export const viewport = css`
  overflow: hidden;
`;

export const dots = css`
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & .dot {
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    background: #8b8fae;
    border-radius: 50%;
    margin-right: 0.75rem;
    margin-left: 0.75rem;

    &.selected {
      background: white;
    }
  }
`;

export const container = css`
  height: auto;
  display: flex;
  touch-action: pan-y;
  flex-direction: row;
  margin-left: calc(1rem * -1);
  backface-visibility: hidden;

  & .backdrop {
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background: linear-gradient(
      to bottom,
      rgb(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.8) 90%
    );
  }
`;

export const slide = css`
  min-width: 0;
  overflow: hidden;
  flex: 0 0 100%;
  position: relative;
`;

export const slideImg = css`
  display: block;
  height: auto;
  width: 100%;
  object-fit: cover;
  // object-position: 0 -25rem;

  ${breakpoints.large} {
    height: 80vh;
  }
`;

export const content = css`
  z-index: 10;
  gap: 2rem;
  left: 8rem;
  bottom: 5rem;
  color: white;
  display: flex;
  position: absolute;
  flex-direction: column;

  & .title {
    font-size: 48px;
    line-height: 48px;
    font-weight: 700;
    font-family: Poppins;
  }

  & .description {
    font-size: 16px;
    max-width: 40%;
    line-height: 20px;
  }

  & .buttons {
    gap: 1rem;
    display: flex;
  }
`;
