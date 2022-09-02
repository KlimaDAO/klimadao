import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";
export {
  address,
  stakeSwitch,
  switchButton,
  stakeInput,
  stakeInput_input,
  stakeInput_max,
  buttonRow,
  buttonRow_spinner,
  submitButton,
} from "../Stake/styles";

export const transaction_modal_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const bondCard = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;
  grid-column: 1 / 3;
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
    gap: 4.8rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
    min-height: 88rem;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const bondCard_header = css`
  display: grid;
  gap: 0.8rem;
  grid-auto-columns: min-content 1fr;
  grid-template-areas:
    "back back"
    "icon title";
  align-items: center;

  .icon_container {
    grid-area: icon;
    width: 3.2rem;
  }

  ${breakpoints.large} {
    gap: 1.6rem;

    .icon_container {
      width: 4.8rem;
    }
  }
`;

export const bondCard_ui = css`
  display: grid;
  gap: 2.4rem;
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

export const backButton = css`
  display: flex;
  align-items: center;
  justify-self: start;
  color: var(--font-03);
  grid-area: back;
`;

export const dataContainer = css`
  display: grid;
  grid-gap: 0.8rem;
  gap: 0.8rem;
  list-style: none;
  padding-left: unset;
  min-height: 28rem;
  align-content: start;
`;
export const dataContainer_address = css`
  font-family: monospace;
  text-align: center;
  margin: 2rem auto;
`;
export const dataContainer_row = css`
  display: grid;
  grid-gap: 1.6rem;
  gap: 1.6rem;
  grid-template-columns: 1fr 1fr;
`;
export const dataContainer_label = css`
  color: var(--font-03);
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
  align-items: center;
  text-align: end;
  justify-self: flex-end;
  > div {
    margin-left: -0.3rem;
  }
`;

export const dataContainer_value = css`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-start;
  align-items: center;
  color: var(--font-03);
  span {
    ${typography.caption};
    color: var(--font-01);
  }
  span[data-warning="true"] {
    color: rgb(248, 152, 27);
  }
`;

export const infoIconWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  min-width: 2.4rem;
  min-height: 2.4rem;
`;

export const inputsContainer = css`
  display: grid;
  gap: 2rem;
`;

export const checkboxContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-right: 1.6rem;
`;

export const checkbox = css`
  color: var(--font-01);
`;
