import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const cardsSliderContainer = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
`;

export const sliderHeader = css`
  grid-column: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const sliderTitle = css`
  width: 100%;
  ${breakpoints.medium} {
    width: 88%;
  }
`;

export const sliderButtonContainer = css`
  display: none;
  gap: 1rem;
  ${breakpoints.medium} {
    display: flex;
  }
`;

export const sliderArrow = css`
  width: 6rem;
  height: 6rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6rem;

  &:disabled {
    opacity: 50%;
  }

  & svg {
    fill: var(--klima-blue);
    height: 3rem;
    width: 3rem;
  }
`;

export const rerouselContainer = css`
  width: 100%;
  margin: 50px auto;
  border-radius: 10px;
  grid-column: full;
`;

export const rereouselItem = css`
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 0 1rem;
`;

export const sliderWrapper = css`
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

export const card = css`
  min-width: 29rem;
  max-width: 32.8rem;
  min-height: 40rem;
  height: 38.4rem;
  width: 100%;
  border-radius: 1.6rem;
  padding: 2.4rem;
  background: var(--surface-04);
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const cardTitleContainer = css`
  display: flex;
  justify-content: space-between;

  & svg {
    fill: var(--white);
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const cardImageContainer = css`
  height: 4rem;
  width: 50%;
  max-height: 4rem;
  position: relative;
  display: block;
`;

export const cardContent = css`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
`;

export const cardMessage = css`
  padding-top: 1.6rem;
`;

export const cardFooter = css`
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;

export const cardDate = css`
  color: var(--klima-green);
  padding-bottom: 0.4rem;
`;

export const cardImage = css`
  display: block;
`;
