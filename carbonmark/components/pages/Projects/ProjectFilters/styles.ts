import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pillContainer = css`
  position: relative;
  gap: 0.4rem;
  width: 100%;
  display: flex;
  overflow-x: auto;
  grid-column: full;
  align-items: center;
  align-items: center;
  justify-self: center;
  width: calc(100vw - 4rem);

  &::-webkit-scrollbar {
    display: none;
  }

  ${breakpoints.desktop} {
    width: calc(100vw - 6rem);
    overflow-x: hidden;
  }

  .more-text {
    display: none;

    ${breakpoints.desktop} {
      top: 0;
      right: 0;
      z-index: 1;
      display: block;
      width: 12rem;
      height: 3.2rem;
      position: absolute;
      background: linear-gradient(
        270deg,
        #eeeff5 55.13%,
        rgba(238, 239, 245, 0) 100%
      );

      & p {
        display: flex;
        cursor: pointer;
        height: 3.2rem;
        align-items: center;
        justify-content: end;
        color: var(--bright-blue);
        text-transform: uppercase;
      }
    }
  }
`;

export const pill = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  padding: 0.8rem 1.6rem;
  background: #8b8fae;
  border-radius: 4rem;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.6rem;

  & svg {
    cursor: pointer;
  }
`;
