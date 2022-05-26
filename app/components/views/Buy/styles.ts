import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const buyCard = css`
  position: relative;
  display: grid;
  align-content: start;
  grid-column: 1 / 3;
  grid-template-rows: min-content 1fr;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding-top: 2.4rem;
  gap: 2.4rem;

  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 3;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
    min-height: 107rem; /* gross overflow hack */
  }
`;



export const buyCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;

  ${breakpoints.desktopLarge} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const buyCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const buyCard_ui = css`
  display: grid;
  gap: 2.4rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-bottom: 2.4rem;
  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }
  ${breakpoints.desktop} {
    gap: 4.8rem;
    padding: 3.2rem;
    max-width: 48rem;
    justify-self: center;
    width: 100%;
  }
`;

export const submitButton = css`
  width: 100%;
`;

export const copyButton = css`
  margin: 0rem 2.4rem;
  justify-self: start;
  gap: 0.4rem;
  ${breakpoints.desktopLarge} {
    margin: unset;
  }
`;

export const address = css`
  font-family: monospace;
  text-align: center;
  color: var(--gray);
`;


export const buyCard_service_wrapper = css`
  display: grid;
  gap: 2.4rem;
  grid-template-columns: 28.8rem;
  grid-template-rows: 26.4rem 26.4rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.4rem;
  
  ${breakpoints.desktopExtraLarge} {
    grid-template-columns: 28.8rem 28.8rem;
    grid-template-rows: 26.4rem;
  }
`;

export const buyCard_service = css`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  background-color: #2B2B2B;
  color: var(--font-03);
  padding: 2.4rem;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    height: 3.4rem;
    
    .logo {
      position: relative;
      width: 18.8rem;
    }
  
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    
    li {
      margin-bottom: .4rem;
    }
  }
  
  span.key {
    color: var(--font-03);
    
  }
  
  span.value {
  }
  
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: auto;
    background-color: #2575FC;
    padding: 1rem 2rem;
    border-radius: .4rem;
  }
`;
