import { css, keyframes } from "@emotion/css";

export const formatParagraph = css`
  p {
    margin-bottom: 1.6rem;
  }
`;

export const processingTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

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

// Spinner
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const processingSpinner = css`
  position: relative !important;
  width: 120px !important;
  height: 120px !important;
  border: 6px solid #fceabe !important;
  border-radius: 50% !important;
  margin: 0 auto !important;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 6px solid gray;
    border-color: #4e3d42 transparent transparent;
    border-radius: 50%;
    animation: ${rotate} 1.2s linear infinite;
  }

  & > div:first-child {
    display: none !important;
  }
  & > div:last-child {
    display: none !important;
  }
`;
