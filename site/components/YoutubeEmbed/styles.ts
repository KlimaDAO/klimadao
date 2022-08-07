import { css } from "@emotion/css";

export const youtubeEmbed = css`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;

  .youtubeEmbed_iframe {
    border: none;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .youtubeEmbed_posterBtn {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .youtubeEmbed_playIconContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const posterOverlay = (hidden: boolean) => css`
  width: 100%;
  opacity: ${hidden ? 0 : 1};
  z-index: ${hidden ? -1 : "initial"};
  top: 0;
  left: 0;
  > span:first-of-type {
    //Unfortunately this is necessary because of NextJS Image inline styling
    height: 100% !important;
    display: block !important;
  }
`;

export const playIcon = css`
  z-index: 1;
  opacity: 0.8;
`;
