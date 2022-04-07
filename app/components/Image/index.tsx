import NextImage, { ImageLoader, ImageProps } from "next/image";

export const Image = (props: ImageProps) => {
  if (process.env.IS_STATIC_EXPORT) {
    // no image optimization for fleek
    const loader: ImageLoader = (params) => params.src;
    return <NextImage {...props} loader={loader} />;
  }
  return <NextImage {...props} />;
};
