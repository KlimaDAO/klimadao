import { ImageLoaderProps } from "next/image";

export const sanityImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${
    quality ?? 60
  }&auto=format&fit=max`;
  // fit max - do not scale up images
};
