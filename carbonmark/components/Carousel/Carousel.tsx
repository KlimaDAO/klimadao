import { cx } from "@emotion/css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import * as styles from "./styles";

interface CarouselImage {
  url: string;
  caption: string;
}

type PropType = {
  images: Array<CarouselImage>;
  options?: EmblaOptionsType;
};

const Thumb: React.FC<any> = (props) => (
  <div className={styles.thumbsSlide}>
    <button
      type="button"
      onClick={props.onClick}
      className={styles.thumbsSlideButton}
    >
      {props.selected && <div className={styles.selected} />}
      <img
        src={props.img}
        alt={props.caption}
        className={styles.thumbsSlideImg}
      />
    </button>
  </div>
);

const maxThumbSlides = 5;

const Carousel: React.FC<PropType> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel(props.options);
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

  const onPreviousClick = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    mainApi.scrollPrev();
    thumbsApi.scrollPrev();
  }, [mainApi, thumbsApi]);

  const onNextClick = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    mainApi.scrollNext();
    thumbsApi.scrollNext();
  }, [mainApi, thumbsApi]);

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
          {props.images.map((image: any, index: number) => (
            <div className={styles.slide} key={index}>
              <TextInfoTooltip tooltip={image.caption}>
                <InfoOutlinedIcon width={20} height={20} />
              </TextInfoTooltip>
              <img
                src={image.url}
                alt={image.caption}
                className={styles.slideImg}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.thumbs}>
        {props.images.length > maxThumbSlides && selectedIndex !== 0 && (
          <div onClick={onPreviousClick} className={cx(styles.arrows, "left")}>
            <KeyboardArrowLeftOutlinedIcon />
          </div>
        )}
        <div ref={thumbsRef} className={styles.thumbsViewport}>
          <div className={styles.thumbsContainer}>
            {props?.images?.map((image: any, index: number) => (
              <Thumb
                img={image.url}
                key={`thumbnail-${index}`}
                caption={image.caption}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                totalLength={props?.images?.length}
              />
            ))}
          </div>
        </div>
        {props.images.length > maxThumbSlides &&
          selectedIndex !== props.images.length - 1 && (
            <div onClick={onNextClick} className={cx(styles.arrows, "right")}>
              <KeyboardArrowRightOutlinedIcon />
            </div>
          )}
      </div>
    </div>
  );
};

export default Carousel;
