import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import typography from "@klimadao/lib/theme/typography";

export const changeLanguageButton = css`
  padding: 0.8rem;
  position: absolute;
  right: -0.4rem;
  top: 6.4rem;

  ${breakpoints.small} {
    top: 3.2rem;
    right: -0.2rem;
    display: flex;
    min-height: 4rem;
    align-items: center;
    border: 2px solid var(--primary);
    background-color: var(--surface-02);
    padding: 0.8rem;
    border-radius: 0.4rem;
    align-items: center;
    align-content: center;
  }

  ${breakpoints.medium} {
    top: 9.8rem;
  }

  ${breakpoints.medium} {
    top: 10.8rem;
  }
`;

export const tooltip = css`
  ${typography.caption};
  text-align: center;
  border: 1px solid var(--primary-variant);
  background: var(--surface-08);
  border-radius: 0.4rem;
  padding: 1.6rem;
  @media (max-width: 32.5rem) {
    &.tippy-box {
      max-width: 24rem !important; // fix x-overflow bug on small mobile
    }
  }
`;

export const menuItem = css`
  ${typography.button};
  color: white !important;
  &:hover {
    color: var(--primary-variant) !important;
  }
`;

export const menuItemContainer = css`
  display: grid;
  gap: 1.6rem;
`;
