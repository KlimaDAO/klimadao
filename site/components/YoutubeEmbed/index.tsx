import { FC, useState } from "react";
import { toNumber } from "lodash";
import * as styles from "./styles";
import Image, { ImageProps } from "next/legacy/image";
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
  const [playInitiated, setPlayInitiated] = useState(false);
  const handleClick = () => setPlayInitiated(true);

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
        <div className={cx(styles.posterOverlay, { hidden: playInitiated })}>
          <Image src={props.posterImg.src} alt={props.posterImg.alt} />
          <button className="youtubeEmbed_posterBtn" onClick={handleClick}>
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
    <path
      d="M66 16.0781C59.125 16.0781 52.6406 17.4063 46.5469 20.0625C40.6094 22.5625 35.2969 26.1562 30.6094 30.8438C26.0781 35.375 22.4844 40.6875 19.8281 46.7812C17.3281 52.7187 16.0781 59.125 16.0781 66C16.0781 72.875 17.3281 79.3594 19.8281 85.4531C22.4844 91.3906 26.0781 96.7031 30.6094 101.391C35.2969 105.922 40.6094 109.516 46.5469 112.172C52.6406 114.672 59.125 115.922 66 115.922C72.875 115.922 79.2812 114.672 85.2188 112.172C91.3125 109.516 96.625 105.922 101.156 101.391C105.844 96.7031 109.438 91.3906 111.938 85.4531C114.594 79.3594 115.922 72.875 115.922 66C115.922 59.125 114.594 52.7187 111.938 46.7812C109.438 40.6875 105.844 35.375 101.156 30.8438C96.625 26.1562 91.3125 22.5625 85.2188 20.0625C79.2812 17.4063 72.875 16.0781 66 16.0781ZM53.5781 88.5V43.5L88.5 66L53.5781 88.5Z"
      fill="currentColor"
    />
  </svg>
);
