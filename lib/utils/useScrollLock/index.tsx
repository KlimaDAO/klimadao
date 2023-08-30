"use client";
import { useEffect } from "react";

/**
 * Accepts boolean argument `shouldLockScroll`
 * In lib/theme/globals.css we reference .scroll-lock to hide overflow on the body element
 * This hook automatically adds/removes that class to the body element
 */
export const useScrollLock = (shouldLockScroll: boolean) => {
  useEffect(() => {
    if (shouldLockScroll) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [shouldLockScroll]);
};
