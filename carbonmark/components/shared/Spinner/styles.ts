import { css, keyframes } from "@emotion/css";

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

/*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
export const spinner = css`
  display: block;
  font-size: 0;
  color: var(--blue-yellow);

  &,
  & > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  &.la-dark {
    color: #333;
  }

  & > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }

  & {
    width: 32px;
    height: 32px;
  }

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 100%;
    -webkit-animation: ${rotate} 1s ease-in-out infinite;
    -moz-animation: ${rotate} 1s ease-in-out infinite;
    -o-animation: ${rotate} 1s ease-in-out infinite;
    animation: ${rotate} 1s ease-in-out infinite;
  }

  & > div:first-child {
    position: absolute;
    width: 32px;
    height: 32px;
    border-right-color: transparent;
    border-left-color: transparent;
  }

  & > div:last-child {
    width: 16px;
    height: 16px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    -webkit-animation-duration: 0.5s;
    -moz-animation-duration: 0.5s;
    -o-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-direction: reverse;
    -moz-animation-direction: reverse;
    -o-animation-direction: reverse;
    animation-direction: reverse;
  }

  &.la-sm {
    width: 16px;
    height: 16px;
  }

  &.la-sm > div {
    border-width: 1px;
  }

  &.la-sm > div:first-child {
    width: 16px;
    height: 16px;
  }

  &.la-sm > div:last-child {
    width: 8px;
    height: 8px;
  }
`;
