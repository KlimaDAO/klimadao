import { urls } from "@klimadao/lib/constants";

/*
Returns an appropriate url for og media image tag
*/
export const getOgImageSrc = (imageSrc: string | undefined) => {
  // Return default image if none is provided
  if (imageSrc === undefined || imageSrc.length == 0) return urls.mediaImage;
  // Returned a URL to a resized version of the image if it is coming from the CDN
  if (imageSrc.indexOf("cdn.sanity.io") >= 0) return `${imageSrc}?h=1000`;
  // Return the URL as is in other cases
  return imageSrc;
};
