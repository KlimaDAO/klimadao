import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const timeline = css`
  max-width: 56rem;
  position: relative;
  left: -5rem;
  oveflow: visible;

  li {
    &:before {
      flex: unset;
    }
  }
`;

export const timelineItem = css`
  overflow: hidden;
  min-height: auto;
  transition: max-height 0.2s;
  min-width: max-content;

  ${breakpoints.desktop} {
    min-width: 56rem;
  }
`;

export const timelineItemVisible = css`
  max-height: 15rem;
  overflow: visible;
`;

export const timelineItemHidden = css`
  max-height: 0;
  overflow: hidden;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  white-space: nowrap;
  max-width: 48rem;

  ${breakpoints.desktop} {
    min-width: 48rem;
  }
`;

export const contentHeader = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const contentFooter = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  max-width: calc(100vw - 10rem);
`;
export const quantity = css`
  background-color: var(--surface-01);
`;

export const bridgeContentFooter = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: start;
`;

export const inline = css`
  display: inline;
  white-space: normal;
`;

export const verraLinkAndTooltip = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  svg {
    color: var(--font-03);
  }
`;

export const timelineItemDivider = css`
  max-width: min(calc(100vw - 11rem), 56rem);
  width: calc(100% + 9rem);
  position: relative;
  left: -4.5rem;
`;

export const divider = css`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
`;
