import { AnyProps, PointFeature } from "supercluster";

export type CarbonmarkMapOpts = Omit<mapboxgl.MapboxOptions, "container"> & {
  points: PointFeature<AnyProps>[];
};
