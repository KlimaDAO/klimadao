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

export const rerouselHeader = css`
  height: 50px;
  background-color: gray;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: bold;
`;

export const rereouselItem = css`
  display: flex;
  /* -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: calc(50%);
  height: 100px;
  font-family: Signika;
  font-weight: bold;
  font-size: 1.5em;
  border: 1px solid black;
  background-color: rgb(97, 218, 251); */
  box-sizing: border-box;
  flex-shrink: 0;
  margin: 0 1rem;
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

export const arrowIcon = css`
  fill: yellow !important;
`;

export const card = css`
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
  height: 40px;
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
