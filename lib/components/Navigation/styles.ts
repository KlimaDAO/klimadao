import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const navMain_DesktopLink = css`
  text-decoration: none;
  padding: 0 3rem;
  font-weight: 500;
  color: var(--surface-05) !important;
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  &:hover {
    color: var(--surface) !important;
  }

  &[data-active="true"] {
    color: var(--surface) !important;
  }
`;

export const navMain_Mobile = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0.4rem 0.4rem;
  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.5s ease 0s;
  padding-top: var(--header-height);
  display: flex;
  ${breakpoints.medium} {
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
  background-color: var(--white);
  transform: translate3d(100%, 0px, 0px);
  transition: transform 0.5s ease 0s;
  padding-top: var(--header-height);
  display: flex;
  ${breakpoints.medium} {
    display: none;
  }
`;

export const navMain_MobileList = css`
  padding: 0;
  padding-top: 2rem;
  list-style: none;
  margin: 0 auto;
`;

export const navMain_MobileItem = css`
  padding: 1.2rem 2.4rem;
`;

export const navMain_MobileLink = css`
  display: block;
  width: 100%;
`;

export const navMain_MobileItemInner = css`
  font-size: 3.75rem;
  font-weight: 500;
  color: var(--surface-02);
  padding: 0.4rem 0 0;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--surface-04);
  }
`;

export const navMain_MobileItemInnerNumber = css`
  font-size: 2rem;
  font-weight: 600;
  color: var(--surface-05);
  margin-right: 2rem;
`;

export const buttonToggleNav = css`
  padding: 1rem;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  color: inherit;
  text-transform: none;
  background-color: var(--white);
  border: 0;
  border-radius: var(--border-radius);
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
  display: inline-block;
  position: relative;
`;

export const hamburgerInnerToggled = css`
  width: 2.4rem;
  height: 0.4rem;
  background-color: var(--surface);
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
    background-color: var(--surface);
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
    background-color: var(--surface);
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
  margin-top: -0.2rem;
  width: 2.4rem;
  height: 0.4rem;
  background-color: var(--surface);
  border-radius: 0;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;

  &::before {
    transition: top 0.075s ease 0.12s, opacity 0.075s ease 0s;
    top: -0.8rem;
    content: "";
    display: block;
    width: 2.4rem;
    height: 0.4rem;
    background-color: var(--surface);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &::after {
    transition: bottom 0.075s ease 0.12s,
      transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0s;
    bottom: -0.8rem;
    content: "";
    display: block;
    width: 2.4rem;
    height: 0.4rem;
    background-color: var(--surface);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
`;
