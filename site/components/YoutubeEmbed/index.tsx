import { FC, useState } from "react";
import { toNumber } from "lodash";
import * as styles from "./styles";
import Image, { ImageProps } from "next/image";
import { cx } from "@emotion/css";

/**
 * For more information about the available youtube embed parameters see:
 * https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018
 */
type YoutubeEmbedProps = {
  videoId: string;
  autoplay?: boolean;
  showSubtitles?: boolean;
  hideControls?: boolean;
  hideFullscreen?: boolean;
  posterImg?: {
    src: ImageProps["src"];
    alt: string;
  };
};

/**
 * A wrapper around a youtube IFrame to provide a poster overlay
 * @note auto play does not function on mobile devices
 * see: https://stackoverflow.com/questions/15090782/youtube-autoplay-not-working-on-mobile-devices-with-embedded-html5-player
 */
export const YoutubeEmbed: FC<YoutubeEmbedProps> = (props) => {
  // If a poster image is defined then track the play behaviour
  const [playInitiated, setPlayInitiated] = useState(!props.posterImg);

  // Build the src url
  const src = `https://www.youtube.com/embed/${props.videoId}?\
autoplay=${toNumber(!!(props.autoplay || playInitiated))}&\
controls=${toNumber(!props.hideControls)}&\
fs=${toNumber(!props.hideFullscreen)}&\
frameborder="0"&\
iv_load_policy=3&\
rel=0&\
cc_load_policy=${toNumber(!!props.showSubtitles)}`;

  return (
    <div className={styles.youtubeEmbed}>
      <iframe
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="youtubeEmbed_iframe"
        allowFullScreen
      ></iframe>

      {/* Video overlay */}
      {props.posterImg && (
        // The computed image height determines the height of the container (and the embedded video)
        // Because of this we are keeping the image in the DOM after click but hiding and setting
        // it behind the video
        <div
          className={cx(
            { [styles.posterOverlay_hidden]: playInitiated },
            styles.posterOverlay
          )}
        >
          <Image src={props.posterImg.src} alt={props.posterImg.alt} />
          <button
            className="youtubeEmbed_posterBtn"
            onClick={() => setPlayInitiated(true)}
          >
            <div className="youtubeEmbed_playIconContainer">
              <PlayIcon />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

/** Simple play icon to allow currentColor styling */
const PlayIcon = () => (
  <svg
    className={styles.playIcon}
    width="80"
    height="80"
    viewBox="0 0 121 121"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="60.5"
      cy="60.5"
      r="55.5"
      stroke="currentColor"
      strokeWidth="10"
    />
    <path
      d="M92 57.0359C94.6667 58.5755 94.6667 62.4245 92 63.9641L47.75 89.5118C45.0833 91.0514 41.75 89.1269 41.75 86.0477L41.75 34.9522C41.75 31.873 45.0833 29.9485 47.75 31.4881L92 57.0359Z"
      fill="currentColor"
    />
  </svg>
);
