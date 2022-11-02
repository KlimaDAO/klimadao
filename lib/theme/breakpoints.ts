/* em units inside media queries take browser default (16px) */

export const breakpointsInEm = {
  /** 23.5em, 376px */
  small: 23.5,
  /** 36em, 576px */
  medium: 36,
  /**  48em, 768px */
  large: 48,
  /** 62em, 992px */
  desktop: 62,
  /** 75em, 1200px */
  desktopLarge: 75,
};

export default {
  /** 23.5em, 376px */
  small: "@media (min-width: 23.5em)",
  /** 36em, 576px */
  medium: "@media (min-width: 36em)",
  /**  48em, 768px */
  large: "@media (min-width: 48em)",
  /** 62em, 992px */
  desktop: "@media (min-width: 62em)",
  /** 75em, 1200px */
  desktopLarge: "@media (min-width: 75em)",
};
