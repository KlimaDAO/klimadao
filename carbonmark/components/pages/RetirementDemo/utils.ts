import { RADIUS_OF_EARTH_IN_KMS } from "./constants";

type Point = { lat: number; lng: number };

/**
 * Computes the distance between two geocoordinates in kilometers
 * Implementation of https://en.wikipedia.org/wiki/Haversine_formula
 * */
export function haversine(p1: Point, p2: Point) {
  const { lat: lat1, lng: lon1 } = p1;
  const { lat: lat2, lng: lon2 } = p2;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = RADIUS_OF_EARTH_IN_KMS * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
