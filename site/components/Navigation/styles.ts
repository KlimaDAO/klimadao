import { css } from "@emotion/css";
import { button } from "@klimadao/lib/theme/typography";

export const navMain_DesktopLink = css`
  ${button};
  text-decoration: none;
  cursor: default;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  padding: 1.6rem 1.2rem;
  white-space: nowrap;
  color: var(--font-02) !important;
  &,
  &:hover,
  &:visited {
    color: var(--font-03);
    font-weight: 500;
  }
  &:hover,
  &:focus {
    color: var(--font-01) !important;
    background: var(--klima-green);
  }
  &.dropdown {
    &:hover,
    &:focus {
      border: 1px solid var(--font-01);
      background: transparent !important;
    }
  }
  &[data-active="true"] {
    color: var(--font-01);
    font-weight: 600;
  }
`;

export const navMain_MobileItem = css`
  padding: 1.2rem 2.4rem;
  width: 100%;
  button {
    justify-content: start;
  }
  a {
    justify-content: start;
  }
`;

export const navMain_MobileButton = css`
  width: min-content;
  color: var(--font-01) !important;
  white-space: nowrap;
`;

export const navMain_MobileItemsWrapper = css`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 2.4rem 2rem 2.4rem;
  }
  .links {
    height: 100%;
    overflow: scroll;
  }
`;

export const navMain_MobileExpanded = css`
  display: none;
  flex-direction: column;
  padding: 0.8rem;
  &[data-show="true"] {
    display: flex;
  }
`;

export const navMain_MobileLink = css`
  display: flex;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--font-01) !important;
  font-size: 1.4rem !important;
  &.active {
    border: 1px solid var(--font-01) !important;
    border-radius: 0.4rem;
  }
`;

export const navMain_MobileDropdownItem = css`
  color: var(--font-01) !important;
`;

export const navMain_MobileItemInner = css`
  font-size: 3.75rem;
  font-weight: 500;
  color: var(--font-01);
  display: flex;
  align-items: center;
  &:hover {
    color: var(--surface-04);
  }
`;

export const navMain_DesktopMenuItem = css`
  background-color: transparent;
  white-space: nowrap;

  color: var(--font-01) !important;

  &:hover {
    background: var(--klima-green);
  }
`;

export const navMain_DesktopSelectContainer = css`
  position: relative;
  min-height: fit-content;
  overflow: visible;
  display: flex;
  z-index: 2;
  .content {
    display: none;
    position: absolute;
    background: var(--surface-02);
    gap: 0.8rem;
    top: 5rem;
    left: -4.6rem;
    padding: 1rem;
    min-width: fit-content;
    z-index: 1;
  }
  &:hover .content {
    display: flex;
    flex-direction: column;
  }
`;
