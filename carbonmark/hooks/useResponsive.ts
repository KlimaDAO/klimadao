import breakpoints from "@klimadao/lib/theme/breakpoints";
import { useMediaQuery } from "@mui/material";

/** Allows conditional JSX by listening to the `breakpoints.desktop` media query */
export const useResponsive = () => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  return { isDesktop, isMobile: !isDesktop };
};
