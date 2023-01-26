import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas:
    "image"
    "content";
  background-color: var(--surface-01);
  overflow: hidden;
  grid-column: main;
  border-radius: 1.2rem;
  box-shadow: var(--shadow-07);
  ${breakpoints.large} {
    grid-template-areas: "content image";
    grid-template-columns: 1fr 1fr;
    height: 28rem;
  }
`;

export const content = css`
  margin: 2.4rem;
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  svg {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    margin-top: 0.4rem;
    path {
      fill: var(--klima-green);
    }
  }

  .summary {
    display: none;
    display: flex;
    color: var(--font-02);
    font-size: 1.6rem;
    line-height: 1.8rem;
    max-height: 7rem;
    /* CSS magic to limit lines shown to 3 https://stackoverflow.com/questions/3922739/limit-text-length-to-n-lines-using-css */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .date {
    color: var(--font-03);
  }
`;

export const image = css`
  position: relative;
  grid-area: image;
  min-height: 24rem;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  div {
    width: 100%;
  }
  ${breakpoints.large} {
    min-height: unset;
    div {
      padding-right: 1.6rem;
    }
  }
`;
