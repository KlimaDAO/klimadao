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
  .pledge-wallet-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const wallet_table = css``;

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
  padding: 0rem;
  margin-top: 3.2rem;
  min-height: 3.6rem;
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 1rem;
  border: 0.175rem solid var(--surface-03);
  background-color: var(--surface-02);
  transition: border-color 0.2s ease-in;

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
