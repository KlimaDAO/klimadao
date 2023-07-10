import { css } from "@emotion/css";

export const formatParagraph = css`
  p {
    margin-bottom: 1.6rem;
  }
`;

export const processingTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 376px) {
    font-size: 22px;
  }

  @media (max-width: 332px) {
    font-size: 18px;
  }
`;

export const processingRetirement = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const processingSpinner = css`
  width: 12rem !important;
  height: 12rem !important;
  transform: scale(2.25);
`;
