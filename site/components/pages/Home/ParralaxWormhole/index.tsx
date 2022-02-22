import Image from "next/image";
import * as styles from "./styles";
import wormhole from "public/bg-green-wormhole.jpg";
import { useEffect, useRef, useState } from "react";

/** Given distance from top of viewport, interpolate value between 35%-90% */
const interpolateObjectPosition = (params: {
  top: number;
  innerHeight: number;
}): string => {
  const rawDistance = 100 - Math.floor((params.top / innerHeight) * 100);
  const distance = rawDistance < 0 ? 0 : rawDistance > 100 ? 100 : rawDistance;
  const startPercent = 35;
  const endPercent = 90;
  const range = endPercent - startPercent;
  const currentPercent = startPercent + (distance / 100) * range;
  return `${currentPercent}%`;
};

/** Abstract all the fancy parrallax hax into this hook */
const useParrallaxPosition = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState("50%");

  useEffect(() => {
    if (!containerRef.current) return;
    const top = containerRef.current?.getBoundingClientRect()?.top ?? 1;
    const innerHeight = window.innerHeight;
    setPosition(interpolateObjectPosition({ top, innerHeight }));
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const top = containerRef.current?.getBoundingClientRect()?.top ?? 1;
        const innerHeight = window.innerHeight;
        setPosition(interpolateObjectPosition({ top, innerHeight }));
      });
    };
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        document.addEventListener("scroll", handleScroll);
      } else {
        document.removeEventListener("scroll", handleScroll);
      }
    });
    observer.observe(containerRef.current);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return [position, containerRef];
};

export const ParralaxWormhole = () => {
  const [position, containerRef] = useParrallaxPosition();

  return (
    <div className={styles.container} ref={containerRef}>
      <Image
        alt="BlackHole"
        src={wormhole}
        layout="fill"
        objectFit="cover"
        objectPosition={`50% ${position}`}
        placeholder="blur"
      />
    </div>
  );
};
