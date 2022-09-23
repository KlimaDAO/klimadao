// Returns a string to be used in the sizes property of the Image component
// This function assumes that the image layout property equals fill
// and that the image fills the viewport only if it is width is lower than 768px
export const getImageSizes = (desktop_width: number) => {
  const mobile_widths = [256, 384, 640, 768];
  const mobile_sizes = mobile_widths
    .map((w) => {
      return `(max-width: ${widthWithResolution(w)}px) ${w}px`;
    })
    .join(", ");
  return `
        ${mobile_sizes},
        ${widthWithResolution(desktop_width)}px
    `;
};

const widthWithResolution = (width: number) => {
  return typeof window !== "undefined"
    ? Math.round(width * window.devicePixelRatio)
    : width;
};
