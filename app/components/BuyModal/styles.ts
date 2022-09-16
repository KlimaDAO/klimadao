import { css } from "@emotion/css";

export const bg = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: not-allowed;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const card = css`
  cursor: default;
  align-self: center;
  width: 54rem;
  min-height: 24rem;
  background-color: #ffffff;
  border-radius: 1rem;
  margin: 2.5rem;
  @media (max-width: 32.5rem) {
    margin: 1.2rem;
  }
`;

export const card_header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.2rem;
  padding: 3rem 1.8rem 2rem;

  p {
    font-size: 2rem;
    font-weight: 600;
    color: #313131;
    text-transform: capitalize;
  }
`;

export const card_connected = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.6rem;
    color: #313131;
    margin-right: 1.2rem;
  }
`;

export const close_button = css`
  composes: textButton;
  min-height: 0;
  padding: 0.6rem;
  border: none;
  color: #313131;
  background-color: #fafafa;
  border-radius: 0.4rem;
`;

export const card_iframe_container = css`
  width: 42.4rem;
  margin-top: 2.4rem;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 32.5rem) {
    max-width: 24rem;
  }

  .MBMWidget_General {
    border: none;
  }

  .MBMWidget_General input:focus {
    outline: none;
  }

  .MBMWidget_Exchange_General .MBMWidget_Exchange_Toggle {
    display: none;
  }

  .MBMWidget_Exchange_General
    .MBMWidget_Exchange_Swap
    .MBMWidget_Exchange_Swap_Title {
    display: none;
  }

  .MBMWidget_Exchange_General
    .MBMWidget_Exchange_Swap
    .MBMWidget_Exchange_Buy_Sell_Togle {
    display: none;
  }

  .MBMWidget_General .MBWidget_general_menu_button {
    display: none;
  }

  .MBMWidget_Exchange_General .MBMWidget_Header {
    display: none;
  }

  .MBMWidget_Exchange_General .MBMWidget_title img {
    display: none;
  }

  .MBMWidget_General .MBMWidget_Exchange_crypto {
    top: 10rem;
  }

  .MBMWidget_General .MBMWidget_Exchange_preview {
    top: 21rem;
  }

  .MBMWidget_Exchange_General .MBMWidget_Exchange_Swap {
    margin-top: 13.5rem;
  }

  .MBWidget_block .MBWidget_footer_actions {
    position: unset;
    margin-top: 4rem;
  }

  .MBMWidget_General .MBMWidget_GeneralButton[color="primary"] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  .MBMWidget_General .MBWidget_general_back_button {
    top: 0.8rem;
    left: 0;
    box-shadow: unset;
  }

  .MBMWidget_Exchange_General
    .MBMWidget_Exchange_Swap
    .MBMWidget_Exchange_Swap_Input
    .MBMWidget_Exchange_fiat_selector_slot
    b {
    display: none;
  }

  .MBMWidget_Exchange_General .MBMWidget_GeneralInput[type="email"] label {
    display: none;
  }

  .MBMWidget_Exchange_General .MBWidget_Tfa .MBWidget_title.MBWidget_Header {
    margin-left: 0;
    margin-top: 6.2rem;
  }

  .MBMWidget_Exchange_Swap_Input .MBMWidget_Phaze_Select_Country_Dropdown {
    pointer-events: none;
  }

  .MBMWidget_Exchange_Swap_Input .select .btn-select .buttonLabel .caret {
    display: none !important;
  }

  .MBMWidget_Exchange_Swap_Input .MBMWidget_Exchange_fiat_selector_slot {
    display: none;
  }

  .MBMWidget_Exchange_General .MBMWidget_Exchange_Swap_Token {
    border-right: none !important;
    margin-right: 0;
    padding-right: 0;
    margin-top: 0;
  }

  .MBMWidget_Exchange_General
    .MBMWidget_Exchange_Swap_Input
    .select
    .btn-select {
    bottom: 10px !important;
  }
`;

export const spinner_container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
`;

export const iframe_wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
