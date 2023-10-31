"use client";
import Skeleton from "components/Skeleton";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import NoDataWrapper, { NoDataWrapperProps } from "../NoDataWrapper";

// A custom hook that detects if the window is currently being resized
// Returns a single value 'isBeingResized'
// the method is debounced to 200ms after which it returns to being false.
export const useIsResizing = () => {
  const [isBeingResized, setIsBeingResized] = useState(false);
  let width = 0;
  let height = 0;
  const reset = useCallback(
    debounce(() => {
      if (typeof window !== "undefined") {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      }
      setIsBeingResized(false);
    }, 200),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (
        typeof window !== "undefined" &&
        (height != document.documentElement.clientHeight ||
          width != document.documentElement.clientWidth)
      ) {
        setIsBeingResized(true);
        reset();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsBeingResized]);

  reset();
  return isBeingResized;
};

/** A wrapper for charts
 * Does not display charts during resize event to avoid sluggish recharts animations
 * See: https://github.com/recharts/recharts/issues/1767
 */
export default function ChartWrapper<T>(props: NoDataWrapperProps<T>) {
  const isBeingResized = useIsResizing();
  const content = !isBeingResized ? (
    <NoDataWrapper {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {props.children}
      </ResponsiveContainer>
    </NoDataWrapper>
  ) : (
    <Skeleton text="" />
  );
  return content;
}
