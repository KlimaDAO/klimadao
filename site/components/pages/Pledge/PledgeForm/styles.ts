import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  margin-top: 2rem;
  overflow: hidden;
`;

export const input = css`
  display: grid;
  align-content: start;
  gap: 0.75rem;
`;

export const errorMessage = css`
  color: var(--warn);
  text-align: center;
`;

export const categories_section = css`
  display: grid;
  align-content: start;
  row-gap: 1rem;
`;

export const wallets_section = css`
  display: flex;
  flex-direction: column;
`;

export const pledge_wallet_address_cell = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-right: 1.6rem;
`;

export const pledge_wallet_pending = css`
  background: var(--font-02);
  border-radius: 0.4rem;
  padding: 0.8rem;
  p {
    font-size: 1rem;
    line-height: 1rem;
    color: var(--surface-02);
    text-transform: uppercase;
    font-weight: 600;
  }
`;

export const pledge_form_remove_container = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1.2rem;
`;

export const pledge_form_remove_button = css`
  width: 100%;
`;

export const pledge_wallet_row = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0.4rem 0;
`;

export const pledge_wallet_icon = css`
  padding: 0rem;
  min-height: 3.6rem;
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 1rem;
  transition: border-color 0.2s ease-in;
`;

export const pledge_form_wallets_title = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const pledge_wallet_save = css`
  ${pledge_wallet_icon};
  border: 0.175rem solid var(--surface-03);
  background-color: var(--surface-02);

  svg {
    fill: var(--klima-green);
  }
  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }
`;

export const pledge_tooltip_arrow = css`
  position: absolute;
  bottom: -1.2rem;
  color: var(--font-01);
  left: calc(50% - 1rem);
`;

export const pledge_form_wallet_info = css`
  color: var(--font-02);
  cursor: pointer;
`;

export const pledge_form_wallet_info_content = css`
  p {
    color: var(--surface-01);
  }
  background: var(--font-01);
  padding: 1.2rem;
  border-radius: 0.4rem;
`;

export const pledge_wallet_delete = css`
  ${pledge_wallet_icon};
  border: 0.175rem solid var(--surface-03);
  background-color: var(--surface-02);

  svg {
    fill: var(--warn);
  }

  &:focus,
  &:hover {
    border-color: var(--warn);
  }
`;

export const pledge_wallet_add = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1.6rem;
`;

export const categories = css`
  display: grid;
  row-gap: 1.6rem;

  ${breakpoints.medium} {
    row-gap: 0.6rem;
  }
`;

export const categoryRow = css`
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  gap: 0.6rem;
  align-items: start;

  ${breakpoints.medium} {
    grid-template-columns: 1fr 0.1fr;
  }
`;

export const categoryRow_inputs = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;

  ${breakpoints.medium} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const categoryRow_removeButton = css`
  ${pledge_wallet_icon};
  margin-top: 3.2rem;
  border: 0.175rem solid var(--surface-03);
  background-color: var(--surface-02);

  svg {
    fill: var(--font-02);
  }

  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }

  ${breakpoints.medium} {
    margin-top: 0rem;
    height: 4.8rem;
    width: 4.8rem;
  }
`;

export const categories_appendRow = css`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const categories_appendButton = css`
  width: 16rem;
  margin-top: 0.8rem;
  border-radius: 1rem;
  background-color: var(--surface-02);
  border: 0.175rem solid var(--surface-03);
  transition: border-color 0.2s ease-in;

  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }

  ${breakpoints.medium} {
    width: 22rem;
  }
`;

export const submittingLabel = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
