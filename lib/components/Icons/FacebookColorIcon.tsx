import React from "react";

interface Props {
  className?: string;
}

export const FacebookColorIcon = (props: Props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <g clipPath="url(#clip0_16_172)">
      <path
        d="M10.855 26C4.68 24.8894 0 19.5327 0 13.0653C0 5.8794 5.85 0 13 0C20.15 0 26 5.8794 26 13.0653C26 19.5327 21.32 24.8894 15.145 26L14.43 25.4121H11.57L10.855 26Z"
        fill="url(#paint0_linear_16_172)"
      />
      <path
        d="M18.07 16.64L18.655 13H15.21V10.465C15.21 9.42501 15.6 8.64501 17.16 8.64501H18.85V5.33001C17.94 5.20001 16.9 5.07001 15.99 5.07001C13 5.07001 10.92 6.89001 10.92 10.14V13H7.67001V16.64H10.92V25.805C11.635 25.935 12.35 26 13.065 26C13.78 26 14.495 25.935 15.21 25.805V16.64H18.07Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_16_172"
        x1="13.0006"
        y1="25.2219"
        x2="13.0006"
        y2="-0.00481312"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0062E0" />
        <stop offset="1" stopColor="#19AFFF" />
      </linearGradient>
      <clipPath id="clip0_16_172">
        <rect width="26" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
