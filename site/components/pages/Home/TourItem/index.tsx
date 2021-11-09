import { FC, useEffect, useRef } from "react";
import styles from "./index.module.css";

export const MAP_HEIGHT_VH = 35;

interface Props {
  title: string;
  text: string;
}

export const TourItem: FC<Props> = (props) => {
  return (
    <div className={styles.tourItem}>
      <h2 className={styles.tourItem_title}>{props.title}</h2>
      <p className={styles.tourItem_description}>{props.text}</p>
    </div>
  );
};

interface TourStartObserverProps {
  onIntersect: () => void;
}

export const TourStartObserver: FC<TourStartObserverProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(props.onIntersect, {
      threshold: 1,
    });
    observer.observe(containerRef.current!);
    return () => {
      observer.disconnect();
    };
  }, []);
  return <div className={styles.tourStartObserver} ref={containerRef}></div>;
};

interface IntersectDetectorProps {
  onIntersect: () => void;
}

export const IntersectDetector = (props: IntersectDetectorProps) => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const intersectMapPx = window.innerHeight * (MAP_HEIGHT_VH * 0.01);
      if (ref.current!.getBoundingClientRect().top < intersectMapPx) {
        props.onIntersect();
      }
    };
    const addScrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    };
    const removeEventListener = () => {
      window.removeEventListener("scroll", handleScroll);
    };
    const observer = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) {
          removeEventListener();
        } else {
          addScrollListener();
        }
      },
      {
        threshold: [0, 1],
      }
    );

    observer.observe(ref.current);

    return () => {
      removeEventListener();
      observer.disconnect();
    };
  }, []);

  return <div className={styles.divider} ref={ref} />;
};
