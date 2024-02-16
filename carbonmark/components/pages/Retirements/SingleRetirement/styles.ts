import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageWrapper = css`
  display: unset;
`;

export const section = css`
  padding-bottom: 3.6rem;
  ${breakpoints.desktop} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;

export const gridLayout = css`
  grid-column: main;

  ${breakpoints.desktop} {
    display: grid;
    column-gap: 4rem;
    grid-template-columns: 1fr 1fr;
  }

  & .column {
    display: unset;
    row-gap: 0 !important;
  }
`;

export const retirementContent = css`
  background-color: var(--surface-02);
  display: flex;
  gap: 1.6rem;
  padding: 2rem;
  margin: 2rem 0 2rem;
`;

export const profileLogo = css`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .imgUrl {
    object-fit: fill;
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }

  &.hasBorder {
    border: 1px solid gray;
  }

  .placeholderIcon {
    width: 4.8rem;
    height: 4.8rem;
    color: var(--manatee);
  }
`;

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .address {
    word-break: break-all;
  }

  a,
  a:visited {
    color: var(--font-01);
    text-decoration: underline;
  }
  a:hover {
    color: var(--font-01);
    text-decoration: none;
  }
`;

export const pending = css`
  background-color: var(--surface-03);
  border-radius: 0.8rem;
  padding: 1.6rem;
  display: grid;
  grid-column: main;
  max-width: 40rem;
  gap: 2.4rem;
  justify-items: center;
  justify-self: center;

  .spinnerTitle {
    display: flex;
    gap: 1.6rem;
    align-items: center;
  }
`;

export const visibleMobile = css`
  display: flex;

  ${breakpoints.desktop} {
    display: none;
  }
`;

export const visibleDesktop = css`
  display: none;

  ${breakpoints.desktop} {
    display: flex;
  }
`;
