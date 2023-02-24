import { css } from "@emotion/css";

export const profileLogo = css`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .imgUrl {
    object-fit: fill;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
  }

  &.hasBorder {
    border: 1px solid gray;
  }

  .placeholderIcon {
    width: 4.8rem;
    height: 4.8rem;
    color: var(--manatee);
  }
`;
