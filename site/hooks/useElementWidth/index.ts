import { useEffect, useCallback, useState, RefObject } from "react";

export const useElementWidth = (elementRef: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);

  const updateWidth = useCallback(() => {
    if (elementRef && elementRef.current) {
      const { width } = elementRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, [elementRef]);

  const firstUpdateWidth = useCallback(() => {
    if (elementRef && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const width =
        rect.width -
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
