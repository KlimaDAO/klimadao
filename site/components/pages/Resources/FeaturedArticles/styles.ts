import { css } from "@emotion/css";

export const container = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
`;

export const sliderArrow = css`
  width: 4rem;
  height: 4rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6rem;
  opacity: 90%;

  &:disabled {
    opacity: 50%;
  }

  & svg {
    fill: var(--font-03);
    height: 2rem;
    width: 2rem;
  }
`;

export const sliderContainerOuter = css`
  width: 100%;
  margin: 0 auto;
  grid-column: full;
  position: relative;
`;

export const controlButtonLeft = css`
  position: absolute;
  left: 1rem;
  z-index: 2;
  bottom: 20%;
`;

export const controlButtonRight = css`
  position: absolute;
  right: 1rem;
  z-index: 2;
  bottom: 20%;
`;

export const sliderItem = css`
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 0 1rem;
  overflow: hidden;
`;

export const sliderContainerInner = css`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  & > * {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const article = css`
  position: relative;
  overflow: hidden;
  height: 50rem;
  width: 90vw;
  max-width: 70rem;
  border-radius: 1.2rem;

  .stack {
    position: absolute;
    z-index: 1;
    padding: 2.8rem;
    height: 100%;
    width: 100%;
    display: grid;
  }
`;

export const stackContent = css`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  a,
  a:visited {
    color: var(--white);
  }
`;

export const articleText = css`
  color: var(--white);
  word-break: break-word;
  z-index: 1;
`;
