import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import * as styles from "./styles";

type PropType = {
  images: any;
  options?: EmblaOptionsType;
};

const Thumb: React.FC<any> = (props) => (
  <div
    className={styles.thumbsSlide}
    style={{ flex: `0 0 ${100 / props.totalLength}%` }}
  >
    <button
      type="button"
      onClick={props.onClick}
      className={styles.thumbsSlideButton}
    >
      <img
        src={props.imgSrc}
        alt="Your alt text"
        className={styles.thumbsSlideImg}
      />
    </button>
  </div>
);

const Carousel: React.FC<PropType> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel(props.options, [Autoplay()]);
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbsApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
  }, [mainApi, onSelect]);

  return (
    <div className={styles.carousel}>
      <div ref={mainRef} className={styles.viewport}>
        <div className={styles.container}>
          {props?.images?.map((image: any, index: any) => (
            <div className={styles.slide} key={index}>
              <img src={image.url} className={styles.slideImg} alt="alt" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.thumbs}>
        <div ref={thumbsRef} className={styles.thumbsViewport}>
          <div className={styles.thumbsContainer}>
            {props?.images?.map((image: any, index: any) => (
              <Thumb
                key={index}
                totalLength={props?.images?.length}
                imgSrc={image.url}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
