import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectControls = css`
  display: none;
  grid-column: main;
  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const projectHeader = css`
  grid-column: full;
  position: relative;
  padding: 2.6rem 1.6rem 3.8rem 1.6rem;
  display: grid;
  gap: 0.4rem;
  ${breakpoints.medium} {
    padding: 6rem 2rem;
  }

  ${breakpoints.desktop} {
    gap: 0.8rem;
    padding: 8rem 4rem;
    grid-column: main;
  }
`;

export const mapAndDescription = css`
  grid-column: main;
  display: grid;
  gap: 2rem;
  grid-template-areas: "description" "map";
  .mapColumn {
    grid-area: map;
    height: 100%;
    min-width: 100%;
    width: 100%;
    height: 23rem;
  }
  .descriptionColumn {
    display: grid;
    gap: 0.8rem;
    align-content: flex-start;
    grid-area: description;
  }
  ${breakpoints.desktop} {
    grid-template-areas: "map description";
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    .mapColumn {
      max-height: unset;
      height: 32rem;
    }
  }
`;

export const listingsAndStats = css`
  grid-column: main;
  display: grid;
  gap: 2rem;
  .listingsColumn {
    display: grid;
    align-content: flex-start;
    gap: 2rem;
    ${breakpoints.desktop} {
      grid-column: 1 / 3;
    }
  }
  .statsColumn {
    display: grid;
    align-content: flex-start;
    gap: 2rem;
    ${breakpoints.desktop} {
      grid-column: 3/4;
    }
  }
  ${breakpoints.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const listingsHeader = css`
  grid-column: main;
  display: grid;
  gap: 0.8rem;
  align-items: center;
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const projectHeaderText = css`
  color: white;
  z-index: 1;
`;

export const tags = css`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  z-index: 1;
  align-items: center;
`;

export const meta = css`
  grid-column: main;
  display: grid;
  grid-template-columns: 1fr auto;

  .best-price {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    ${breakpoints.medium} {
      flex-direction: row;
      align-items: center;
    }
  }

  .best-price-badge {
    padding: 0.8rem 1.6rem;
    background-color: var(--yellow);
    align-items: center;
    border-radius: var(--border-radius);
  }
`;

export const methodology = css`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
  & p:last-of-type {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.6rem;
    line-height: 2rem;
    & svg {
      width: 1.7rem;
      height: 1.7rem;
    }
  }
`;

export const infoContent = css`
  color: var(--white);
  padding: 1.2rem;
  background: #303030;
  max-width: 23rem !important;
  border-radius: 0.4rem;

  .tippy-arrow {
    color: #303030;
  }
`;
