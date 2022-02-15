import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const communityContainer = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
`;

export const community_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;
  img {
    border-radius: 1.6rem 1.6rem 0 0;
  }
  p {
    max-width: 64rem;
  }
`;

export const partner_logos = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4rem;
  background-color: #ffffff;
  border-radius: 1.6rem;
  align-items: center;
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 64rem;
  justify-self: center;
  align-self: center;
  .partner_logo {
    max-width: 15rem;
  }
  ${breakpoints.desktop} {
    margin-top: 4.8rem;
  }
`;

export const beachSection = css`
  grid-column: full;
  display: grid;
  height: 72rem;
  position: relative;
  padding: 3.2rem 0rem;
  .beach_label {
    font-size: 5rem;
    line-height: 5rem;
    grid-column: main;
    z-index: 1;
    text-align: end;
    justify-self: end;
    align-self: end;
    max-width: 50rem;
  }
  ${breakpoints.large} {
    padding: 6.4rem 0rem;
    font-size: 7.2rem;
    line-height: 7.2rem;
  }
`;

export const joinDiscord = css`
  margin-top: 3rem;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;
  overflow: hidden;
  max-width: 64rem;
  align-self: center;

  .joinDiscord_row1 {
    display: grid;
    gap: 3.2rem;
    padding: 3.2rem;
  }
  .joinDiscord_dummy {
    border-radius: 2.4rem;
    margin-bottom: -1%;
    margin-left: 10%;
  }
`;

export const headerElements = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${breakpoints.medium} {
    flex-direction: row;
  }
`;

export const page_baseHeaderButtons = css`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  justify-content: space-between;
  background: var(--surface-01);
  border-radius: 4px;
  width: 12.8rem;
  height: 4rem;
  padding: 1.6rem;
  font-size: 1.4rem;
  box-shadow: var(--shadow-light);
  &:hover,
  &:focus {
    opacity: 0.6;
    transition: opacity 0.25s ease-in-out;
  }
  span {
    color: var(--font-01);
  }
`;

export const page_discordButton = css`
  ${page_baseHeaderButtons};
  background: linear-gradient(180deg, #7780f0 0%, #5c65ed 100%);
  span {
    color: var(--white);
  }
`;

export const page_discordIcon = css`
  width: 2rem;
`;

export const page_snapshotIcon = css`
  width: 1.6rem;
`;

export const page_forumIcon = css`
  color: var(--klima-green);
`;
