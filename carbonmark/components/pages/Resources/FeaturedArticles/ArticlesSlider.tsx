import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FC, useEffect, useRef, useState } from "react";
import { Article } from "./Article";

import { useElementWidth } from "hooks/useElementWidth";
import { FeaturedPost } from "lib/queries";

import * as styles from "./styles";

type Props = {
  articles: FeaturedPost[];
};

export const ArticlesSlider: FC<Props> = (props) => {
  const articleRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [articleWidth] = useElementWidth(articleRef);
  const [sliderWidth] = useElementWidth(sliderRef);
  const [currentScrollLeft, setCurrentScrollLeft] = useState<number>(0);
  const scrollInterval = useRef<NodeJS.Timeout>();
  const articlesLength = props.articles.length;

  const hasReachedEnd = () => {
    if (!!articleWidth && !!sliderWidth) {
      const visibleArticles = Math.floor(sliderWidth / articleWidth);
      const maxIndex = articlesLength - visibleArticles;
      return currentScrollLeft > maxIndex;
    }
    return currentScrollLeft > articlesLength - 1;
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
    if (articleWidth != undefined) {
      sliderRef.current?.scrollTo({
        left: articleWidth * currentScrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentScrollLeft, articleWidth]);

  useEffect(() => {
    // start autoslide on mount
    const intervalId = setInterval(() => {
      setCurrentScrollLeft((csl) => csl + 1);
    }, 6000);

    scrollInterval.current = intervalId;

    return () => {
      stopAutoSlide();
    };
  }, []);

  const stopAutoSlide = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
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
              ref={articleRef}
              className={styles.sliderItem}
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
