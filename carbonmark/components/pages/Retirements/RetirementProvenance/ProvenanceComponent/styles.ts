import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const wrapper = css`
  background-color: var(--surface-01);
  width: 100%;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: var(--shadow-01);
`;
export const header = css`
  display: flex;
  justify-content: space-between;
`;
export const headerItem = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  white-space: nowrap;
`;
export const iconAndText = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
export const right = css`
  justify-content: right;
`;

export const timeline = css`
  max-width: 36rem;
  position: relative;
  left: -5rem;
  oveflow: visible;
`;

export const timelineItem = css`
  overflow: hidden;
  min-height: auto;
  min-width: 56rem;
  transition: max-height 0.2s;
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
  min-width: 48rem;
`;

export const contentHeader = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const contentFooter = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  max-width: 20rem;
  ${breakpoints.medium} {
    max-width: none;
  }
`;
export const quantity = css`
  background-color: var(--surface-01);
`;

export const bridgeContentFooter = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: start;
  max-width: calc(100vw - 20rem);
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
