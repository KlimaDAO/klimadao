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
`;
export const content = css`
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
`