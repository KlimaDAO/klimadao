import { css } from "@emotion/css";
import { button } from "@klimadao/lib/theme/typography";

export const navMain_DesktopLink = css`
  ${button};
  text-decoration: none;
  display: flex;
  align-items: center;
  text-align: center;
  &,
  &:hover,
  &:visited {
    color: var(--font-03);
    font-weight: 500;
  }
  &:hover,
  &:focus {
    color: var(--font-02);
  }
  &[data-active="true"] {
    color: var(--font-01);
    font-weight: 700;
  }
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
  color: var(--font-01);
  display: flex;
  align-items: center;
  &:hover {
    color: var(--surface-04);
  }
`;

export const navMain_MobileItemInnerNumber = css`
  font-size: 2rem;
  font-weight: 600;
  color: var(--font-01);
  margin-right: 2rem;
`;
