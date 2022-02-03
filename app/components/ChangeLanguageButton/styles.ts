import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import typography from "@klimadao/lib/theme/typography";

export const changeLanguageButton = css`

  ${breakpoints.small} {
    right: -0.2rem;
    display: flex;
    min-height: 4rem;
    align-items: center;
    background-color: var(--surface-02);
    padding: 0.8rem;
    border-radius: 0.4rem;
    align-items: center;
    align-content: center;
  }

// `;

export const tooltip = css`
  ${typography.caption};
  text-align: center;
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
  &:hover {
    color: var(--primary-variant);
  }
`;

