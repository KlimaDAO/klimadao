import { IS_STATIC_EXPORT } from "lib/constants";
import NextImage, { ImageLoader, ImageProps } from "next/image";

export const Image = (props: ImageProps) => {
  if (IS_STATIC_EXPORT) {
    // no image optimization for fleek
    const loader: ImageLoader = (params) => params.src;
    return <NextImage {...props} loader={loader} />;
  }
  return <NextImage {...props} />;
};

// FIXME: next/image doesn't export this interface so this is a temporary hack
// Currently located in this file: node_modules/next/image-types/global.d.ts
export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}
