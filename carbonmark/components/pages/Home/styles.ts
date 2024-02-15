import { css } from "@emotion/css";
import breakpoints, {
  breakpoints as specificBreakpoints,
} from "@klimadao/lib/theme/breakpoints";

export const global = css`
  [data-mobile-only="true"] {
    ${breakpoints.desktop} {
      display: none;
    }
  }
  [data-desktop-only="true"] {
    @media (max-width: ${specificBreakpoints.desktop}px) {
      display: none;
    }
  }

  display: block;
  grid-template-columns:
    [full-start] minmax(1.6rem, 1fr) [main-start] minmax(0, 10.2rem) [main-end] minmax(
      1.6rem,
      1fr
    )
    [full-end];
`;

export const hero = css`
  display: grid;
  padding: 4rem 0 0 !important;
  grid-column: full;
  grid-template-columns: inherit;
  position: relative;

  .hero_img {
    z-index: 1;
    filter: blur(4px);
    opacity: 70%;
    object-fit: cover;
  }

  ${breakpoints.desktop} {
    height: 100vh;
    padding: 0 !important;
  }

  .stack {
    z-index: 2;
    gap: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    max-width: 100%;
    grid-column: main;
    margin-top: 8rem;
    margin-bottom: 4rem;

    ${breakpoints.desktop} {
      max-width: 70%;
      margin-bottom: 8.4rem;
    }

    & h1 {
      margin: 0;
      color: #000;
      font-size: 4.4rem;
      line-height: 4.4rem;
      max-width: 75%;

      ${breakpoints.desktop} {
        max-width: 100%;
        font-size: 6rem;
        line-height: 6rem;
      }
    }

    & h2 {
      margin: 0;
      color: #000;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2rem;
      font-family: var(--font-family);

      ${breakpoints.desktop} {
        font-size: 2.4rem;
        line-height: 3.2rem;
      }
    }

    & a {
      margin: 0 !important;
      color: #fff;
      width: 100%;
      font-size: 1.4rem;
      background: var(--warning-red);

      ${breakpoints.desktop} {
        width: 15rem;
        min-width: 15rem !important;
      }
    }
  }
`;

export const partnersSection = css`
  position: relative;
  padding: 4rem 0rem 2rem !important;

  & img {
    z-index: 1;
    object-fit: cover;
    object-position: top;
  }

  ${breakpoints.desktop} {
    padding: 7.6rem 0rem 11rem !important;
    & img {
      object-position: center;
    }
  }

  ${breakpoints.desktopLarge} {
    & img {
      object-position: center 28%;
    }
  }

  & .stack {
    z-index: 2;
  }

  & h2 {
    margin: 0 auto 4rem;
    max-width: 100%;
    font-size: 2.4rem;
    line-height: 2.8rem;

    ${breakpoints.desktop} {
      max-width: 90%;
      font-size: 3.2rem;
      line-height: 3.6rem;
    }
  }

  & .partners {
    gap: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 6rem;
    margin-top: 2.6rem;

    ${breakpoints.desktop} {
      margin-top: 2rem;
      flex-direction: column;
      margin-bottom: 37rem;
    }

    & div {
      gap: 2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      ${breakpoints.desktop} {
        gap: 7rem;
        flex-direction: row;
      }
    }
  }

  & .partners-list {
    ${breakpoints.desktop} {
      position: relative;
    }
    & .card {
      min-width: 3.5rem;
    }
  }

  & .card-wrapper {
    display: none !important;

    ${breakpoints.desktop} {
      display: flex !important;
    }
  }

  & a {
    margin: 0;
    display: none;

    ${breakpoints.desktop} {
      display: flex;
      margin: 4rem auto 0;
    }
  }
`;

export const offsetCarbonSection = css`
  position: relative;
  padding: 4rem 0rem !important;

  & img {
    z-index: 1;
    object-fit: cover;
    object-position: top;
  }

  ${breakpoints.desktop} {
    padding: 22rem 0rem !important;
  }

  & .stack {
    z-index: 2;
    gap: 3.2rem;
    display: flex;
    flex-direction: column;

    & > div {
      flex: 1;
    }

    ${breakpoints.desktop} {
      gap: 2.7rem;
      flex-direction: row;
    }
  }

  & h2 {
    margin-bottom: 3.2rem;
    max-width: 100%;
    text-align: left !important;
    font-size: 3.6rem;
    line-height: 3.6rem;

    ${breakpoints.desktop} {
      max-width: 80%;
      font-size: 6rem;
      line-height: 6rem;
      margin-bottom: 2rem !important;
    }
  }

  & .description {
    margin: 0 !important;
    margin-bottom: 2rem !important;
    text-align: left !important;
    font-size: 1.8rem;
    line-height: 2rem;
  }

  & a {
    margin: 3.2rem 0 0;

    ${breakpoints.desktop} {
      margin: 2rem 0;
    }
  }
`;

export const sellCarbonSection = css`
  position: relative;
  padding: 4rem 0rem !important;

  & img {
    z-index: 1;
    object-fit: cover;
    object-position: top;
  }

  ${breakpoints.desktop} {
    padding: 22rem 0rem !important;
  }

  & .stack {
    z-index: 2;
    gap: 3.2rem;
    display: flex;
    flex-direction: column-reverse;

    & > div {
      :first-child {
        flex: 1.35;
      }
      :last-child {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }

    ${breakpoints.desktop} {
      gap: 7.3rem;
      flex-direction: row;
    }
  }

  & h2 {
    margin-bottom: 3.2rem;
    max-width: 100%;
    text-align: left !important;
    font-size: 3.6rem;
    line-height: 3.6rem;

    ${breakpoints.desktop} {
      max-width: 80%;
      font-size: 6rem;
      line-height: 6rem;
      margin-bottom: 2rem !important;
    }
  }

  & .description {
    margin: 0 !important;
    margin-bottom: 2rem !important;
    text-align: left !important;
    font-size: 1.8rem;
    line-height: 2rem;
  }

  & a {
    width: 100%;
    margin: 3.2rem 0 0 !important;
    background: var(--warning-red) !important;

    ${breakpoints.desktop} {
      width: 16.5rem;
      margin: 0 !important;
    }
  }

  & .card {
    background: #eddaa9 !important;
    h4 {
      color: var(--warning-red);
    }
  }

  & .card-title {
    svg {
      color: var(--warning-red);
    }
  }
`;

export const learnMoreSection = css`
  position: relative;
  padding: 4rem 0rem;

  & img {
    z-index: 1;
    object-fit: cover;
  }

  ${breakpoints.desktop} {
    padding: 7.5rem 0rem 3rem;
  }

  & .stack {
    z-index: 2;
  }

  & h2 {
    margin-bottom: 4rem;
  }

  .card-wrapper div {
    min-height: 2.75rem;

    ${breakpoints.desktop} {
      justify-content: center;
    }

    & .content > * {
      text-align: center;
    }

    & .content {
      p {
        max-height: 6rem;
      }

      h5 {
        text-decoration: none;
      }

      h6 {
        text-decoration: underline;
      }
    }
  }
`;

export const poweredBySection = css`
  position: relative;
  padding: 8.4rem 0rem 6rem !important;

  & img {
    z-index: 1;
    object-fit: cover;
  }

  ${breakpoints.desktop} {
    padding: 16rem 0rem 6rem !important;
  }

  & .stack {
    z-index: 2;
  }

  & h2 {
    color: #fff;
    margin: 0;
    gap: 1rem;
    font-size: 2.4rem;
    line-height: 2.8rem;
    display: flex !important;
    align-items: center;
    justify-content: center;

    ${breakpoints.desktop} {
      font-size: 3.2rem;
      line-height: 3.6rem;
    }
  }

  & p.description {
    max-width: 100%;
    margin: 2.4rem auto !important;
    text-align: center;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #fff !important;

    ${breakpoints.desktop} {
      max-width: 75%;
      font-size: 2.2rem;
      line-height: 3.3rem;
      margin: 3.2rem auto !important;
    }
  }

  & svg path {
    fill: #fff !important;
    &:last-of-type {
      fill: var(--klima-green) !important;
    }
  }
`;

export const list = css`
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
  justify-content: center;

  & .card-wrapper {
    gap: 2rem;
    display: flex;
    flex-direction: row;
    ${breakpoints.desktop} {
      justify-content: center;
    }
  }
`;

export const learnMoreList = css`
  gap: 2rem;
  width: 100%;
  flex-direction: row;
  justify-content: normal;

  & .card-wrapper {
    gap: 1.6rem;
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 0 0 1.6rem;
    flex-direction: column;

    & > div {
      min-width: 100%;
    }

    ${breakpoints.medium} {
      flex-direction: row;
      & > div {
        min-width: auto;
      }
    }

    ${breakpoints.desktop} {
      margin: 6rem auto;
    }
  }
`;

export const step = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  & h4 {
    font-size: 4.8rem;
    line-height: 4.8rem;
    color: var(--bright-blue);
    font-weight: 700;
    font-family: var(--font-family-secondary);
  }

  & .card {
    gap: 2rem;
    display: flex;
    align-items: center;
    padding: 2.9rem 2rem;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    background-color: var(--surface-02);

    ${breakpoints.desktop} {
      padding: 3rem;
      flex-direction: row;
    }

    & .card-title {
      flex: 1;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;

      ${breakpoints.desktop} {
        flex: 1;
      }
    }

    & h4 {
      flex: none;
      ${breakpoints.desktop} {
        flex: 1.5;
      }
    }

    svg {
      flex: 0.5;
      height: 4.9rem;
      color: var(--bright-blue);
    }

    & .card-info {
      flex: 1;
      margin: 0;
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2.2rem;
      color: var(--font-01);
      font-family: var(--font-family-secondary);
      text-align: center;

      ${breakpoints.desktop} {
        text-align: left;
      }
    }
  }
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow:
    0px 1px 3px rgba(0, 0, 0, 0.12),
    0px 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex: 1;
  gap: 1.6rem;
  max-width: 32rem;
  flex-direction: column;
  height: 100%;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;

  img {
    object-fit: cover;
  }
`;

export const cardContent = css`
  flex: 1 0 auto;
  padding: 1.2rem 2rem 2rem;
  display: grid;
  gap: 1.2rem;
  .readMore {
    text-align: center;
  }
  & h4 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
    font-family: var(--font-family-secondary);
  }

  & h5 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > p {
    overflow: hidden;
    height: 12rem;
    line-height: 2rem;
    background: linear-gradient(
      180deg,
      #313131 43.44%,
      rgba(49, 49, 49, 0) 92.91%
    );
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const tags = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;

export const section = css`
  display: grid;
  grid-column: full;
  padding: 8rem 0rem;
  grid-template-columns: inherit;

  ${breakpoints.desktop} {
    padding: 10rem 0rem;
  }

  .stack {
    grid-column: main;

    & h2 {
      text-align: center;
    }

    & p.description {
      margin: 3.2rem 0;
      text-align: center;

      ${breakpoints.desktop} {
        margin: 4rem 0;
        &:first-of-type {
          margin-bottom: 6rem;
        }
      }
    }

    & .coming-soon {
      margin-top: 3.2rem;
      text-align: center;
      color: var(--font-02);

      ${breakpoints.desktop} {
        margin-top: 6rem;
      }

      & > span {
        text-decoration: underline;
        color: var(--klima-green);
      }
    }
  }
`;

export const heroBackground = css`
  border-radius: 1rem;
  padding: 2rem 2.4rem;
`;

export const sectionImage = css`
  width: 100%;
  display: flex;
  grid-column: full;
  padding: 0 !important;
  min-height: 53rem;

  ${breakpoints.desktop} {
    min-height: 70rem;
  }

  & div {
    width: 100%;
    display: flex;
    flex-direction: column;

    &.project-devs {
      flex-direction: column-reverse;
      ${breakpoints.desktop} {
        flex-direction: row;
      }
    }

    ${breakpoints.desktop} {
      flex-direction: row;
    }

    & .image-bg {
      width: 100%;
      height: 50rem;

      ${breakpoints.desktop} {
        width: 50%;
        height: 100%;
      }
    }

    &.carbon-traders {
      & .image-bg {
        position: relative;
        & img {
          z-index: 1;
          object-fit: cover;
        }
      }
      & .pattern-bg {
        z-index: 2;
        position: relative;
        & img {
          z-index: 1;
          object-fit: cover;
        }
      }
    }

    &.project-devs {
      & .image-bg {
        position: relative;
        & img {
          z-index: 1;
          object-fit: cover;
        }
      }
      & .pattern-bg {
        position: relative;
        & img {
          z-index: 1;
          object-fit: cover;
        }
      }
    }

    & .pattern-bg {
      width: 100%;
      height: auto;

      ${breakpoints.desktop} {
        width: 50%;
        height: 100%;
      }

      & div {
        z-index: 2;
        display: flex;
        max-width: 100%;
        padding: 8rem 3.2rem;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;

        ${breakpoints.desktop} {
          padding: 0;
          max-width: 60%;
          padding: 8rem 1.8rem;
        }
      }

      & h2 {
        max-width: 75%;
        text-align: left;
        font-size: 3.6rem;
        line-height: 3.6rem;
        margin: 0 0 3.2rem 0;

        ${breakpoints.desktop} {
          max-width: 100%;
          margin-bottom: 4rem;
          font-size: 6rem;
          line-height: 6rem;
        }
      }

      & ul {
        padding: 0;
        list-style: none;

        & li {
          gap: 1.8rem;
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          font-size: 2.2rem;
          line-height: 3.3rem;

          &:last-child {
            margin-bottom: 0;
          }

          & svg {
            width: 3rem;
            height: 3rem;
            color: var(--bright-blue);
          }
        }
      }
    }
  }
`;

export const browseButton = css`
  width: auto;
  margin: 4rem auto 0;
  white-space: nowrap;

  ${breakpoints.desktop} {
    width: 19rem;
    min-width: 19rem;
  }
`;

export const footer = css`
  width: 100vw;
  background-color: var(--manatee);
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1.6rem;

  ${breakpoints.desktop} {
    padding: 4rem;
    padding-bottom: 10rem;
    gap: 3rem;
  }

  ${breakpoints.desktopLarge} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  a,
  a:visited {
    color: white;
  }
`;

export const footerNav = css`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;

  ${breakpoints.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${breakpoints.desktopLarge} {
    gap: 4rem;
  }
`;

export const footerIcons = css`
  display: flex;
  gap: 2rem;

  ${breakpoints.desktop} {
    justify-content: center;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  & svg path {
    fill: #fff;
  }
`;
