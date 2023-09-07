import { PaginatedResponse } from "lib/charts/types";
import klimaRetirementsTableConfiguration from "./klimaRetirementsTableConfiguration";
import { Columns } from "./types";

const configurations = {
  klimaRetirements: klimaRetirementsTableConfiguration,
};
export type ConfigurationKey = keyof typeof configurations;
export type Configuration<RI> = {
  fetchFunction: (page: number) => Promise<PaginatedResponse<RI>>;
  getColumns: (locale: string) => Columns<RI>;
};

export function fetchData(key: ConfigurationKey, page: number) {
  return configurations[key].fetchFunction(page);
}
export function getColumns(key: ConfigurationKey, locale: string) {
  return configurations[key].getColumns(locale);
}
export function getCardRenderer(key: ConfigurationKey, locale: string) {
  return configurations[key].cardRenderer;
}
