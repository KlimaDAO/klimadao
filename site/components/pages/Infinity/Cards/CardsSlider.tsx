import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  RefObject,
} from "react";
import { Trans } from "@lingui/macro";

import { Text } from "@klimadao/lib/components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Card } from "./Card";

import * as styles from "./styles";

import { cards } from "./cards";

// highly inspired by https://github.com/aexol-studio/rerousel/blob/master/src/index.tsx

const useWidth = (elementRef: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);

  const updateWidth = useCallback(() => {
    if (elementRef && elementRef.current) {
      const { width } = elementRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, [elementRef]);

  const firstUpdateWidth = useCallback(() => {
    if (elementRef && elementRef.current) {
      let { width } = elementRef.current.getBoundingClientRect();
      width =
        width -
        parseInt(
          window
            .getComputedStyle(elementRef.current)
            .getPropertyValue("border-left-width")
        ) -
        parseInt(
          window
            .getComputedStyle(elementRef.current)
            .getPropertyValue("border-right-width")
        );

      width =
        width -
        parseInt(
          window
            .getComputedStyle(elementRef.current)
            .getPropertyValue("padding-left")
        ) -
        parseInt(
          window
            .getComputedStyle(elementRef.current)
            .getPropertyValue("padding-right")
        );

      setWidth(width);
    }
  }, [elementRef]);

  useEffect(() => {
    firstUpdateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  return [width];
};

export const CardsSlider = () => {
  const carouselRef = useRef(null);

  const [itemWidth] = useWidth(carouselRef);
  const [, setScrollInterval] = useState<NodeJS.Timeout>();
  const [currentScrollLeft, setCurrentScrollLeft] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cc = cards.length;

  useEffect(() => {
    if (currentScrollLeft < 0) {
      wrapperRef.current?.scrollTo({ left: 0 });
      setCurrentScrollLeft(0);
      return;
    }
    if (currentScrollLeft > cc - 1) {
      setCurrentScrollLeft(0);
      return;
    }

    if (itemWidth != undefined) {
      wrapperRef.current?.scrollTo({
        left: itemWidth * currentScrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentScrollLeft, itemWidth]);

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentScrollLeft((csl) => csl + 1);
    }, 3000);
    setScrollInterval(i);

    return () => {
      stopAutoSlide();
    };
  }, [itemWidth]);

  const stopAutoSlide = () => {
    setScrollInterval((i) => {
      if (i) {
        clearInterval(i);
      }
      return undefined;
    });
  };

  const onForward = () => {
    stopAutoSlide();
    setCurrentScrollLeft((csl) => csl + 1);
  };

  const onBackwards = () => {
    stopAutoSlide();
    setCurrentScrollLeft((csl) => csl - 1);
  };

  return (
    <div className={styles.cardsSliderContainer}>
      <div className={styles.sliderHeader}>
        <Text t="h3" className={styles.sliderTitle}>
          <Trans id="infinity.cards_slider.title">
            Dozens of organizations have offset over 150,000 carbon tonnes with
            Klima Infinity
          </Trans>
        </Text>
        <div className={styles.sliderButtonContainer}>
          <button
            type="button"
            className={styles.sliderArrow}
            onClick={onBackwards}
          >
            <ArrowBackIcon />
          </button>
          <button
            type="button"
            className={styles.sliderArrow}
            onClick={onForward}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
      <div className={styles.rerouselContainer}>
        <div
          className={styles.sliderWrapper}
          ref={wrapperRef}
          onTouchStart={stopAutoSlide}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.link}-${index}`}
              ref={carouselRef}
              className={styles.rereouselItem}
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
