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
  const cardRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [cardWidth] = useWidth(cardRef);
  const [sliderWidth] = useWidth(sliderRef);
  const [, setScrollInterval] = useState<NodeJS.Timeout>();
  const [currentScrollLeft, setCurrentScrollLeft] = useState<number>(0);
  const cardsLength = cards.length;

  const hasReachedEnd = () => {
    if (!!cardWidth && !!sliderWidth) {
      const visibleCards = Math.floor(sliderWidth / cardWidth);
      const maxIndex = cardsLength - visibleCards;
      return currentScrollLeft > maxIndex;
    }
    return currentScrollLeft > cardsLength - 1;
  };

  useEffect(() => {
    if (hasReachedEnd()) {
      setCurrentScrollLeft(0);
      return;
    }

    if (currentScrollLeft < 0) {
      sliderRef.current?.scrollTo({ left: 0 });
      setCurrentScrollLeft(0);
      return;
    }

    // trigger scrolling
    if (cardWidth != undefined) {
      sliderRef.current?.scrollTo({
        left: cardWidth * currentScrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentScrollLeft, cardWidth]);

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentScrollLeft((csl) => csl + 1);
    }, 3000);
    setScrollInterval(i);

    return () => {
      stopAutoSlide();
    };
  }, []);

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
            disabled={currentScrollLeft <= 0}
          >
            <ArrowBackIcon />
          </button>
          <button
            type="button"
            className={styles.sliderArrow}
            onClick={onForward}
            disabled={hasReachedEnd()}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
      <div className={styles.rerouselContainer}>
        <div
          className={styles.sliderWrapper}
          ref={sliderRef}
          onTouchStart={stopAutoSlide}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.link}-${index}`}
              ref={cardRef}
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
