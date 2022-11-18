import React from "react";

interface Props {
  className?: string;
}

export const CoinbaseWalletIcon = (props: Props) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <g clipPath="url(#clip0_16_230)">
      <mask
        id="mask0_16_230"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <path
          d="M29.9843 0H6.01567C2.69331 0 0 2.69331 0 6.01567V29.9843C0 33.3067 2.69331 36 6.01567 36H29.9843C33.3067 36 36 33.3067 36 29.9843V6.01567C36 2.69331 33.3067 0 29.9843 0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_16_230)">
        <path
          d="M29.9373 0.0469971H6.06266C2.7403 0.0469971 0.0469971 2.7403 0.0469971 6.06266V29.9373C0.0469971 33.2597 2.7403 35.953 6.06266 35.953H29.9373C33.2597 35.953 35.953 33.2597 35.953 29.9373V6.06266C35.953 2.7403 33.2597 0.0469971 29.9373 0.0469971Z"
          stroke="#979797"
        />
        <path d="M0 0H36V36.094H0V0Z" fill="url(#paint0_linear_16_230)" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.64978 18.0068C5.64978 24.9054 11.2422 30.4978 18.1408 30.4978C25.0395 30.4978 30.6319 24.9054 30.6319 18.0068C30.6319 11.1082 25.0395 5.51578 18.1408 5.51578C11.2422 5.51578 5.64978 11.1082 5.64978 18.0068ZM14.9486 13.9819C14.4887 13.9819 14.1159 14.3547 14.1159 14.8146V21.1989C14.1159 21.6589 14.4887 22.0317 14.9486 22.0317H21.333C21.7929 22.0317 22.1657 21.6589 22.1657 21.1989V14.8146C22.1657 14.3547 21.7929 13.9819 21.333 13.9819H14.9486Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_16_230"
        x1="18"
        y1="0"
        x2="18"
        y2="36.094"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2E66F8" />
        <stop offset="1" stopColor="#124ADB" />
      </linearGradient>
      <clipPath id="clip0_16_230">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
