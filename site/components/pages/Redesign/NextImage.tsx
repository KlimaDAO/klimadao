import { FC } from "react";
import Image, { ImageProps } from "next/image";

import styles from "./index.module.css";

// https://github.com/vercel/next.js/discussions/18739#discussioncomment-344932

interface Props {
  src: ImageProps["src"];
  alt: string;
}

const NextImage: FC<Props> = (props) => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <Image
          src={props.src}
          alt={props.alt}
          layout="fill"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default NextImage;
