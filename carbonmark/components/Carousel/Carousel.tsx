import { cx } from "@emotion/css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { ProjectMap } from "components/pages/Project/ProjectMap";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { useResponsive } from "hooks/useResponsive";
import { CarouselImage, Project } from "lib/types/carbonmark";
import { useCallback, useEffect, useState } from "react";
import * as styles from "./styles";

type CarouselProps = {
  images: Array<CarouselImage>;
  options?: EmblaOptionsType;
  geolocation?: Project["geolocation"];
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const { isMobile } = useResponsive();
  const [maxSlidesToShow] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState<Array<CarouselImage>>(props.images);
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

  useEffect(() => {
    if (props.geolocation) {
      const images = [...props.images];
      images.unshift({
        url: "/map-thumbnail.png",
        caption: images?.[1]?.caption,
      });
      setImages(images);
    }
  }, [props.geolocation, props.images]);

  return (
    <div className={styles.carousel}>
      <div ref={mainRef} className={styles.viewport}>
        <div className={styles.container}>
          {images?.map((image: CarouselImage, index: number) => (
            <div className={styles.slide} key={`slide-${index}`}>
              {props.geolocation && index === 0 ? (
                <ProjectMap
                  zoom={5}
                  lat={props.geolocation.lat}
                  lng={props.geolocation.lng}
                />
              ) : (
                <>
                  <TextInfoTooltip tooltip={image.caption}>
                    <div className="icon-wrapper">
                      <InfoOutlinedIcon width={20} height={20} />
                    </div>
                  </TextInfoTooltip>
                  <img
                    src={image.url}
                    alt={image.caption}
                    className={styles.slideImg}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.thumbs}>
        {!isMobile &&
          images?.length > maxSlidesToShow &&
          selectedIndex !== 0 && (
            <div
              onClick={onPreviousClick}
              className={cx(styles.arrows, "left")}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </div>
          )}
        <div ref={thumbsRef} className={styles.thumbsViewport}>
          <div className={styles.thumbsContainer}>
            {images?.map((image: CarouselImage, index: number) => (
              <div key={`thumbnail-${index}`} className={styles.thumbsSlide}>
                <button
                  type="button"
                  onClick={() => onThumbClick(index)}
                  className={styles.thumbsSlideButton}
                >
                  {index === selectedIndex && (
                    <div className={styles.selected} />
                  )}
                  <img
                    src={image.url}
                    alt={image.caption}
                    className={styles.thumbsSlideImg}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {!isMobile &&
          images?.length > maxSlidesToShow &&
          selectedIndex !== images.length - 1 && (
            <div onClick={onNextClick} className={cx(styles.arrows, "right")}>
              <KeyboardArrowRightOutlinedIcon />
            </div>
          )}
      </div>
    </div>
  );
};

export default Carousel;
