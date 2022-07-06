import React from "react";

interface Props {
  className?: string;
}

export const FacebookIcon = (props: Props) => (
  <svg
    className={props.className}
    width="20"
    height="20"
    viewBox="0 0 17 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Facebook</title>
    <g clipPath="url(#clip0_1239_302)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 8C0.5 11.96 3.38 15.24 7.18 15.92L7.22732 15.8813C7.22495 15.8809 7.22258 15.8804 7.22021 15.88V10.24H5.22021V8H7.22021V6.24C7.22021 4.24 8.50021 3.12 10.3402 3.12C10.9002 3.12 11.5402 3.2 12.1002 3.27999V5.31999H11.0602C10.1002 5.31999 9.86021 5.8 9.86021 6.44V8H11.9802L11.6202 10.24H9.86021V15.88C9.83579 15.8844 9.81136 15.8888 9.78694 15.8929L9.82 15.92C13.62 15.24 16.5 11.96 16.5 8C16.5 3.6 12.9 0 8.5 0C4.1 0 0.5 3.6 0.5 8Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1239_302">
        <rect width="16" height="16" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);
