import { breakpointsInEm } from "@klimadao/lib/theme/breakpoints";

type BreakpointName = "small" | "medium" | "large" | "desktop" | "desktopLarge";

export const breakpointNames: Array<BreakpointName> = [
  "small",
  "medium",
  "large",
  "desktop",
  "desktopLarge",
];

// Returns a string to be used in the sizes property of the Image component
export const getImageSizes = (
  params: Partial<Record<BreakpointName, string>>
) => {
  return breakpointNames.reduce((prevStr, breakpointName) => {
    if (params[breakpointName]) {
      // if an override exists, prepend it to the size query
      return `(min-width: ${breakpointsInEm[breakpointName]}em) ${params[breakpointName]}, ${prevStr}`;
    } else {
      return prevStr;
    }
  }, "100vw");
};
