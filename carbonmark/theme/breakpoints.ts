/* em units inside media queries take browser default (16px) */

export const breakpoints = {
  /** 23.5em, 376px */
  small: 376,
  /** 36em, 576px */
  medium: 576,
  /**  48em, 768px */
  large: 768,
  /** 62em, 992px */
  desktop: 992,
  /** 75em, 1200px */
  desktopLarge: 1200,
};

export const deviceSizes = [376, 576, 768, 992, 1200, 1920, 2048, 3840];

// eslint-disable-next-line import/no-anonymous-default-export
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
