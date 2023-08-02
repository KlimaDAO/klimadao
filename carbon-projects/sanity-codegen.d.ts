/// <reference types="@sanity-codegen/types" />

export namespace Sanity.Default.Client {
  type Config = {};
}
export namespace Sanity.Default.Schema {
  type Geopoint =
    | {
        alt?: number;
        lat?: number;
        lng?: number;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type Methodology =
    | {
        _id: string;
        _type: "methodology";
        category?: string;
        id?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        link?: string;
        name?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type Project =
    | {
        _id: string;
        _type: "project";
        boundary?: {
          asset: Sanity.Reference<unknown>;
        };
        ccbs?: string[];
        corsia?: boolean;
        country?: string;
        description?: string;
        documents?: {
          asset: Sanity.Reference<unknown>;
          description?: string;
        }[];
        geolocation?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        id?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        methodologies?: Sanity.Reference<Sanity.Ref.Ref_37djWd7ZlpuOu7OV>[];
        name?: string;
        region?: string;
        registry?: string;
        registryProjectId?: string;
        sdgs?: string[];
        state?: string;
        url?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type ProjectContent =
    | {
        _id: string;
        _type: "projectContent";
        coverImage?: {
          asset: Sanity.Reference<{
            _type: "sanity.imageAsset";
            assetId: string;
            extension: string;
            metadata: {
              _type: "sanity.imageMetadata";
              dimensions: {
                _type: "sanity.imageDimensions";
                aspectRatio: number;
                height: number;
                width: number;
              };
              hasAlpha: boolean;
              isOpaque: boolean;
              lqip: string;
              palette: {
                _type: "sanity.imagePalette";
                darkMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                darkVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                dominant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                muted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                vibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
              };
            };
            mimeType: string;
            originalFilename: string;
            path: string;
            sha1hash: string;
            size: number;
            uploadId: string;
            url: string;
          }>;
          caption?: string;
          crop?: {
            _type: "sanity.imageCrop";
            bottom: number;
            left: number;
            right: number;
            top: number;
          };
          hotspot?: {
            _type: "sanity.imageHotspot";
            height: number;
            width: number;
            x: number;
            y: number;
          };
        };
        images?: {
          asset: Sanity.Reference<{
            _type: "sanity.imageAsset";
            assetId: string;
            extension: string;
            metadata: {
              _type: "sanity.imageMetadata";
              dimensions: {
                _type: "sanity.imageDimensions";
                aspectRatio: number;
                height: number;
                width: number;
              };
              hasAlpha: boolean;
              isOpaque: boolean;
              lqip: string;
              palette: {
                _type: "sanity.imagePalette";
                darkMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                darkVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                dominant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                muted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                vibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
              };
            };
            mimeType: string;
            originalFilename: string;
            path: string;
            sha1hash: string;
            size: number;
            uploadId: string;
            url: string;
          }>;
          caption?: string;
          crop?: {
            _type: "sanity.imageCrop";
            bottom: number;
            left: number;
            right: number;
            top: number;
          };
          hotspot?: {
            _type: "sanity.imageHotspot";
            height: number;
            width: number;
            x: number;
            y: number;
          };
        }[];
        longDescription?: string;
        longDescriptionMeta?: string;
        notes?: string;
        project?: Sanity.Reference<Sanity.Ref.Ref_nTfS0ce1x599hFMb>;
        shortDescription?: string;
        shortDescriptionMeta?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityAssetSourceData =
    | {
        id?: string;
        name?: string;
        url?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityFileAsset =
    | {
        _id: string;
        _type: "sanity.fileAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_iyuOkyOGSCXfblmj;
        title?: string;
        url?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImageAsset =
    | {
        _id: string;
        _type: "sanity.imageAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        metadata?: Sanity.Ref.Ref_oK3lGCpzX0pz5PCx;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_iyuOkyOGSCXfblmj;
        title?: string;
        uploadId?: string;
        url?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImageCrop =
    | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImageDimensions =
    | {
        aspectRatio?: number;
        height?: number;
        width?: number;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImageHotspot =
    | {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImageMetadata =
    | {
        blurHash?: string;
        dimensions?: Sanity.Ref.Ref_I9ikpsLjhc8U5n0j;
        hasAlpha?: boolean;
        isOpaque?: boolean;
        location?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        lqip?: string;
        palette?: Sanity.Ref.Ref_X5msBnwbOuWzHtXl;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImagePalette =
    | {
        darkMuted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        darkVibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        dominant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        lightMuted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        lightVibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        muted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
        vibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type SanityImagePaletteSwatch =
    | {
        background?: string;
        foreground?: string;
        population?: number;
        title?: string;
      }
    | undefined;
}
export namespace Sanity.Default.Schema {
  type Slug =
    | {
        current?: string;
        source?: string;
      }
    | undefined;
}
export namespace Sanity.Ref {
  type Ref_37djWd7ZlpuOu7OV =
    | {
        _id: string;
        _type: "methodology";
        category?: string;
        id?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        link?: string;
        name?: string;
      }
    | undefined;
}
export namespace Sanity.Ref {
  type Ref_I9ikpsLjhc8U5n0j = {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };
}
export namespace Sanity.Ref {
  type Ref_iyuOkyOGSCXfblmj = {
    id?: string;
    name?: string;
    url?: string;
  };
}
export namespace Sanity.Ref {
  type Ref_nTfS0ce1x599hFMb =
    | {
        _id: string;
        _type: "project";
        boundary?: {
          asset: Sanity.Reference<unknown>;
        };
        ccbs?: string[];
        corsia?: boolean;
        country?: string;
        description?: string;
        documents?: {
          asset: Sanity.Reference<unknown>;
          description?: string;
        }[];
        geolocation?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        id?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        methodologies?: Sanity.Reference<Sanity.Ref.Ref_37djWd7ZlpuOu7OV>[];
        name?: string;
        region?: string;
        registry?: string;
        registryProjectId?: string;
        sdgs?: string[];
        state?: string;
        url?: string;
      }
    | undefined;
}
export namespace Sanity.Ref {
  type Ref_oK3lGCpzX0pz5PCx = {
    blurHash?: string;
    dimensions?: Sanity.Ref.Ref_I9ikpsLjhc8U5n0j;
    hasAlpha?: boolean;
    isOpaque?: boolean;
    location?: {
      _type: "geopoint";
      alt: number;
      lat: number;
      lng: number;
    };
    lqip?: string;
    palette?: Sanity.Ref.Ref_X5msBnwbOuWzHtXl;
  };
}
export namespace Sanity.Ref {
  type Ref_RS2VIzRguGVA5Slj = {
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
  };
}
export namespace Sanity.Ref {
  type Ref_X5msBnwbOuWzHtXl = {
    darkMuted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    darkVibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    dominant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    lightMuted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    lightVibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    muted?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
    vibrant?: Sanity.Ref.Ref_RS2VIzRguGVA5Slj;
  };
}
