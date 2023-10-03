"use client"; // use client for recharts animations
import Skeleton from "components/Skeleton";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { NoDataWrapperProps } from "../NoDataWrapper";

// A custom hook that detects if the window is currently being resized
// Returns a single value 'isBeingResized'
// the method is debounced to 200ms after which it returns to being false.
export const useIsResizing = () => {
  const [isBeingResized, setIsBeingResized] = useState(false);

  const reset = useCallback(
    debounce(() => {
      setIsBeingResized(false);
    }, 200),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBeingResized(true);
      reset();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsBeingResized]);

  return isBeingResized;
};

/** A wrapper for charts
 * Does not display charts during resize event to avoid sluggish recharts animations
 * See: https://github.com/recharts/recharts/issues/1767
 */
export default function ChartWrapper<T>(props: NoDataWrapperProps<T>) {
  const isBeingResized = useIsResizing();
  const content = !isBeingResized ? (
    <ResponsiveContainer width="100%" height="100%">
      {props.children}
    </ResponsiveContainer>
  ) : (
    <Skeleton text="" />
  );
  return content;
}
