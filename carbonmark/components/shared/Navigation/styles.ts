import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { button } from "@klimadao/lib/theme/typography";

export const navMain_DesktopLink = css`
  ${button};
  text-decoration: none;

  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  padding: 1.6rem 1.2rem;
  white-space: nowrap;
  color: #000 !important;
  width: 100%;
  &,
  &:hover,
  &:visited {
    color: var(--font-01);
    font-weight: 500;
  }
  &:hover,
  &:focus {
    font-weight: 700;
    color: var(--bright-blue) !important;
  }
  &.dropdown {
    text-transform: uppercase;
    &:hover,
    &:focus {
      border: 1px solid var(--font-01);
      background: transparent !important;
      cursor: default;
    }
  }
  &[data-active="true"] {
    font-weight: 700;
    color: var(--bright-blue) !important;
  }
`;

export const navMain_MobileItem = css`
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
  white-space: nowrap;
  background-color: var(--bright-blue);
  color: var(--white) !important;
`;

export const browseButton = css`
  width: min-content;
  white-space: nowrap;
  background-color: var(--bright-blue);
  color: var(--white) !important;
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
    height: calc(100%-7rem);
    padding: 1.2rem 2.4rem;
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari and Opera */
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const navMain_MobileExpanded = css`
  display: none;
  overflow: hidden;
  flex-direction: column;
  padding: 0.8rem;
  padding-left: 1.6rem;
  &[data-show="true"] {
    display: flex;
    gap: 0.8rem;
  }
`;

export const navMain_MobileLink = css`
  display: flex;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--white) !important;
  font-size: 1.4rem !important;
  &:focus {
    border: 1px solid var(--font-01) !important;
    border-radius: 0.4rem;
  }
  &:active {
    background: var(--klima-green);
    border-color: var(--klima-green);
  }
  transform: none !important;
  &.activeItem {
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

export const navMain_DesktopItemContainer = css`
  position: relative;
  min-height: fit-content;
  overflow: visible;
  display: flex;
  z-index: 2;
`;

export const navMain_DesktopSubMenu = css`
  background: var(--surface-02) !important;
  gap: 0.8rem;
  top: 5rem;
  left: -4.6rem;
  padding: 1rem;
  min-width: fit-content;
  z-index: 1;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-03);
  flex-direction: column;
`;

export const navMain_Mobile = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--surface-01);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0.4rem 0.4rem;
  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.5s ease 0s;
  padding-top: var(--header-height);
  display: flex;
  overscroll-behavior: contain;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const navMain_MobileClosed = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: var(--surface-01);
  transform: translate3d(100%, 0px, 0px);
  transition: transform 0.5s ease 0s;
  padding-top: var(--header-height);
  display: flex;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const navMain_MobileList = css`
  padding: 0;
  padding-top: 2rem;
  list-style: none;
  margin: 0 auto;
  width: 100%;
`;

export const buttonToggleNav = css`
  padding: 1rem;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  color: var(--font-01);
  text-transform: none;
  background-color: var(--surface-01);
  border: 0;
  border-radius: 0.4rem;
  margin: 0;
  overflow: visible;
  line-height: 0;
  &:hover {
    opacity: 0.7;
  }
`;

export const hamburgerOuter = css`
  text-transform: none;
  line-height: 0;
  box-sizing: border-box;
  width: 2.4rem;
  height: 2rem;
  display: inline-flex;
  justify-content: center;
  position: relative;
`;

export const hamburgerInnerToggled = css`
  width: 2.4rem;
  height: 0.4rem;
  background-color: var(--font-01);
  border-radius: 0;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
  display: block;
  top: 50%;
  margin-top: -0.2rem;
  transition-duration: 0.075s;
  transform: rotate(45deg);
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  &::before {
    width: 2.4rem;
    height: 0.4rem;
    background-color: var(--font-01);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
    content: "";
    display: block;
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease 0s,
      transform 0.075s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
  &::after {
    width: 2.4rem;
    height: 0.4rem;
    background-color: var(--font-01);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
    content: "";
    display: block;
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease 0s,
      transform 0.075s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export const hamburgerInner = css`
  color: inherit;
  text-transform: none;
  line-height: 0;
  box-sizing: border-box;
  display: block;
  top: 50%;
  width: 1.6rem;
  height: 0.2rem;
  background-color: var(--font-01);
  border-radius: 0;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
  &::before {
    transition: top 0.075s ease 0.12s, opacity 0.075s ease 0s;
    top: -0.5rem;
    content: "";
    display: block;
    width: 1.6rem;
    height: 0.2rem;
    background-color: var(--font-01);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  &::after {
    transition: bottom 0.075s ease 0.12s,
      transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0s;
    bottom: -0.5rem;
    content: "";
    display: block;
    width: 1.6rem;
    height: 0.2rem;
    background-color: var(--font-01);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
`;
