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

export const posterOverlay = css`
  width: 100%;
  top: 0;
  left: 0;
  // This ensures the video is still controllable
  pointer-events: none;
  > span:first-of-type {
    //Unfortunately this is necessary because of NextJS Image inline styling
    height: 100% !important;
    display: block !important;
  }
`;

export const posterOverlay_hidden = css`
  opacity: 0;
  z-index: -1;
`;

export const playIcon = css`
  z-index: 1;
  opacity: 0.8;
`;
