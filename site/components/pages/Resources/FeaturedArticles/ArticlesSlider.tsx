import React, { FC, useEffect, useState, useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Article } from "./Article";

import { useElementWidth } from "hooks/useElementWidth";
import { FeaturedPost } from "lib/queries";

import * as styles from "./styles";

type Props = {
  articles: FeaturedPost[];
};

export const ArticlesSlider: FC<Props> = (props) => {
  const cardRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [cardWidth] = useElementWidth(cardRef);
  const [sliderWidth] = useElementWidth(sliderRef);
  const [, setScrollInterval] = useState<NodeJS.Timeout>();
  const [currentScrollLeft, setCurrentScrollLeft] = useState<number>(0);
  const cardsLength = props.articles.length;

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
    <div className={styles.container}>
      <div className={styles.sliderContainerOuter}>
        <div
          className={styles.sliderContainerInner}
          ref={sliderRef}
          onTouchStart={stopAutoSlide}
        >
          {props.articles.map((article) => (
            <div
              key={article.slug}
              ref={cardRef}
              className={styles.rereouselItem}
            >
              <Article article={article} />
            </div>
          ))}
        </div>

        <div className={styles.controlButtonLeft}>
          <button
            type="button"
            className={styles.sliderArrow}
            onClick={onBackwards}
            disabled={currentScrollLeft <= 0}
          >
            <ArrowBackIosNewIcon />
          </button>
        </div>
        <div className={styles.controlButtonRight}>
          <button
            type="button"
            className={styles.sliderArrow}
            onClick={onForward}
            disabled={hasReachedEnd()}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
