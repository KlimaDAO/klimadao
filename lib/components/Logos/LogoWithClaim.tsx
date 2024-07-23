import { cx } from "@emotion/css";
import React from "react";
import * as styles from "./styles";

export const LogoWithClaim = (props: { className?: string }) => {
  return (
    <svg
      className={cx(styles.logoWithClaim, props.className)}
      width="191"
      height="32"
      viewBox="0 0 191 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.491 27.2001L48.8416 17.2481V27.2001H45.1761V4.96006H48.8416V15.1041L57.5231 4.96006H62.1211L52.4107 16.0961L62.2819 27.2001H57.491Z"
        fill="var(--font-01)"
      />
      <path
        d="M67.2597 3.52006V27.2001H63.5941V3.52006H67.2597Z"
        fill="var(--font-01)"
      />
      <path
        d="M72.0079 7.23206C71.3434 7.23206 70.786 7.00806 70.3359 6.56006C69.8857 6.11206 69.6607 5.55739 69.6607 4.89606C69.6607 4.23473 69.8857 3.68006 70.3359 3.23206C70.786 2.78406 71.3434 2.56006 72.0079 2.56006C72.651 2.56006 73.1976 2.78406 73.6477 3.23206C74.0979 3.68006 74.323 4.23473 74.323 4.89606C74.323 5.55739 74.0979 6.11206 73.6477 6.56006C73.1976 7.00806 72.651 7.23206 72.0079 7.23206ZM73.8085 9.56806V27.2001H70.143V9.56806H73.8085Z"
        fill="var(--font-01)"
      />
      <path
        d="M98.1384 9.28006C99.5317 9.28006 100.775 9.56806 101.868 10.1441C102.983 10.7201 103.851 11.5734 104.473 12.7041C105.116 13.8347 105.437 15.2001 105.437 16.8001V27.2001H101.804V17.3441C101.804 15.7654 101.407 14.5601 100.614 13.7281C99.8211 12.8747 98.7386 12.4481 97.3667 12.4481C95.9948 12.4481 94.9015 12.8747 94.087 13.7281C93.2939 14.5601 92.8973 15.7654 92.8973 17.3441V27.2001H89.2639V17.3441C89.2639 15.7654 88.8674 14.5601 88.0742 13.7281C87.2811 12.8747 86.1986 12.4481 84.8267 12.4481C83.4548 12.4481 82.3616 12.8747 81.547 13.7281C80.7539 14.5601 80.3573 15.7654 80.3573 17.3441V27.2001H76.6918V9.56806H80.3573V11.5841C80.9575 10.8587 81.7185 10.2934 82.6402 9.88806C83.562 9.48273 84.548 9.28006 85.5984 9.28006C87.0132 9.28006 88.2779 9.57873 89.3925 10.1761C90.5072 10.7734 91.3646 11.6374 91.9648 12.7681C92.5007 11.7014 93.3367 10.8587 94.4728 10.2401C95.6089 9.60006 96.8308 9.28006 98.1384 9.28006Z"
        fill="var(--font-01)"
      />
      <path
        d="M106.951 18.3041C106.951 16.5334 107.315 14.9654 108.044 13.6001C108.794 12.2347 109.801 11.1787 111.066 10.4321C112.352 9.66406 113.767 9.28006 115.31 9.28006C116.704 9.28006 117.915 9.55739 118.944 10.1121C119.994 10.6454 120.83 11.3174 121.452 12.1281V9.56806H125.15V27.2001H121.452V24.5761C120.83 25.4081 119.984 26.1014 118.912 26.6561C117.84 27.2107 116.618 27.4881 115.246 27.4881C113.724 27.4881 112.331 27.1041 111.066 26.3361C109.801 25.5467 108.794 24.4587 108.044 23.0721C107.315 21.6641 106.951 20.0747 106.951 18.3041ZM121.452 18.3681C121.452 17.1521 121.195 16.0961 120.68 15.2001C120.187 14.3041 119.533 13.6214 118.719 13.1521C117.904 12.6827 117.025 12.4481 116.082 12.4481C115.139 12.4481 114.26 12.6827 113.446 13.1521C112.631 13.6001 111.966 14.2721 111.452 15.1681C110.959 16.0427 110.712 17.0881 110.712 18.3041C110.712 19.5201 110.959 20.5867 111.452 21.5041C111.966 22.4214 112.631 23.1254 113.446 23.6161C114.282 24.0854 115.16 24.3201 116.082 24.3201C117.025 24.3201 117.904 24.0854 118.719 23.6161C119.533 23.1467 120.187 22.4641 120.68 21.5681C121.195 20.6507 121.452 19.5841 121.452 18.3681Z"
        fill="var(--font-01)"
      />
      <path
        d="M135.334 4.96006C137.713 4.96006 139.792 5.41873 141.572 6.33606C143.372 7.23206 144.755 8.53339 145.719 10.2401C146.705 11.9254 147.199 13.8987 147.199 16.1601C147.199 18.4214 146.705 20.3841 145.719 22.0481C144.755 23.7121 143.372 24.9921 141.572 25.8881C139.792 26.7627 137.713 27.2001 135.334 27.2001H128.035V4.96006H135.334ZM135.334 24.2241C137.949 24.2241 139.953 23.5201 141.347 22.1121C142.74 20.7041 143.437 18.7201 143.437 16.1601C143.437 13.5787 142.74 11.5627 141.347 10.1121C139.953 8.66139 137.949 7.93606 135.334 7.93606H131.7V24.2241H135.334Z"
        fill="var(--font-01)"
      />
      <path
        d="M162.375 22.6561H153.018L151.41 27.2001H147.584L155.59 4.92806H159.834L167.841 27.2001H163.982L162.375 22.6561ZM161.346 19.6801L157.712 9.34406L154.047 19.6801H161.346Z"
        fill="var(--font-01)"
      />
      <path
        d="M179.585 27.4241C177.506 27.4241 175.588 26.9441 173.83 25.9841C172.094 25.0027 170.711 23.6481 169.682 21.9201C168.675 20.1707 168.171 18.2081 168.171 16.0321C168.171 13.8561 168.675 11.9041 169.682 10.1761C170.711 8.44806 172.094 7.10406 173.83 6.14406C175.588 5.16272 177.506 4.67206 179.585 4.67206C181.686 4.67206 183.605 5.16272 185.341 6.14406C187.099 7.10406 188.481 8.44806 189.489 10.1761C190.496 11.9041 191 13.8561 191 16.0321C191 18.2081 190.496 20.1707 189.489 21.9201C188.481 23.6481 187.099 25.0027 185.341 25.9841C183.605 26.9441 181.686 27.4241 179.585 27.4241ZM179.585 24.2561C181.064 24.2561 182.383 23.9254 183.54 23.2641C184.698 22.5814 185.598 21.6214 186.241 20.3841C186.906 19.1254 187.238 17.6747 187.238 16.0321C187.238 14.3894 186.906 12.9494 186.241 11.7121C185.598 10.4747 184.698 9.52539 183.54 8.86406C182.383 8.20273 181.064 7.87206 179.585 7.87206C178.106 7.87206 176.788 8.20273 175.63 8.86406C174.473 9.52539 173.562 10.4747 172.897 11.7121C172.254 12.9494 171.933 14.3894 171.933 16.0321C171.933 17.6747 172.254 19.1254 172.897 20.3841C173.562 21.6214 174.473 22.5814 175.63 23.2641C176.788 23.9254 178.106 24.2561 179.585 24.2561Z"
        fill="var(--font-01)"
      />
      <path
        d="M31.5336 17.2234V14.7766H23.7913L33.4399 0H0L9.92548 14.7766H2.15123V17.2234H9.92548L0 32H9.60599V29.7332H4.27051L11.9489 18.1662L16.8371 25.5597L21.6721 18.1979L29.3292 29.7226H24.0256V31.9894H33.4293L23.7913 17.2234H31.5336ZM4.28116 2.2668H29.3292L21.6721 13.8021L16.8371 6.44025L11.9489 13.8338L4.28116 2.2668ZM16.8371 10.4654L19.6912 14.766H13.9617L16.8371 10.4654ZM16.8371 21.524L13.9617 17.2234H19.6912L16.8371 21.524Z"
        fill="var(--klima-green)"
      />
    </svg>
  );
};
