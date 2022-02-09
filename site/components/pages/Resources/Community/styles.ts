import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const communityContainer = css`
  grid-column: main;

  ${breakpoints.medium} {
    display: grid;
    grid-template-columns:
      [community_full-start] minmax(20rem, 1fr)
      [community_inner-start] minmax(0, 107.2rem)
      [community_inner-end] minmax(20rem, 1fr)
      [community_full-end];

    gap: 2.5rem;
  }
`;

export const community_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    grid-column: community_inner;
  }

  img {
    border-radius: 1.6rem 1.6rem 0 0;
  }
`;

export const partner_logos = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  background-color: #ffffff;
  border-radius: 1.6rem;
  align-items: center;

  padding: 3rem 0;

  ${breakpoints.medium} {
    grid-column: community_inner;
  }

  .partner_logo {
    max-width: 15rem;
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
  ${breakpoints.medium} {
    padding: 6.4rem 0rem;
    font-size: 7.2rem;
    line-height: 7.2rem;
  }
`;

export const joinDiscord = css`
  margin-top: 3rem;
  display: grid;
  grid-column: community_inner;
  background-color: var(--surface-01);
  box-shadow: var(--shadow-06);
  border-radius: 1.6rem;
  overflow: hidden;

  .joinDiscord_row1 {
    display: grid;
    align-self: center;
    justify-items: center;
    gap: 1.6rem;
    padding: 3.2rem;
  }

  .joinDiscord_row2 {
    position: relative;
  }

  .joinDiscord_dummy {
    border-radius: 2.4rem;
    margin-bottom: -10%;
    margin-left: 10%;
    ${breakpoints.medium} {
      margin-bottom: -20%;
    }
  }
`;

export const page_discordButton = css`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #7780f0 0%, #5c65ed 100%);
  border-radius: 4px;
  width: 12.8rem;
  height: 4rem;
  padding: 1.6rem;
  font-size: 1.4rem;
  margin-bottom: 4.8rem;

  span {
    color: white;
  }
`;

export const page_discordIcon = css`
  width: 2rem;
`;
