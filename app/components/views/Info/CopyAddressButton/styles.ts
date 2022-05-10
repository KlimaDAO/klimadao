import { css } from "@emotion/css";

// used !important here bc home component global css is more specific than this one
// idk what this global was doing .copyAddressButtonIcon:global(.MuiSvgIcon-root) {
export const copyAddressButtonIcon = css`
  height: 1.6rem !important;
  width: 1.6rem !important;
  cursor: pointer;
`;

export const checkmark = css`
  padding: 0.8rem;
  max-height: 3.2rem;
`;

export const copyAddressButton = css`
  padding: 0.8rem;
`;
