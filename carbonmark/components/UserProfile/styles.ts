import { css } from "@emotion/css";

export const userProfile = css`
  width: 24rem;
  background: white;
  color: black;
  border-radius: 0.3rem;
  display: flex;
  padding: 0 0.9rem;
  justify-content: flex-start;
  align-items: center;
  z-index: 99999;

  & .content {
    text-transform: initial;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: #3b3b3d;
    font-weight: 600;
    font-size: 16px;

    & div {
      width: 3.2rem;
      height: 3.2rem;

      & img {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
  }

  & .placeholder {
    width: 3rem;
    height: 3rem;
    color: white;
    background: var(--manatee);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    & .placeholderIcon {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;
