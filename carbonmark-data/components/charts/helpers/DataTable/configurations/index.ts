import KlimaRetirementsTableConfiguration from "./KlimaRetirementsTableConfiguration";

const configurations = {
  klimaRetirements: new KlimaRetirementsTableConfiguration(),
};
export type ConfigurationKey = keyof typeof configurations;

/** Fetches data given a table configuration*/
export function fetchData(key: ConfigurationKey, page: number) {
  return configurations[key].fetchFunction(page);
}
/** Returns the columns (layout) of a table configuration */
export function getColumns(key: ConfigurationKey, locale: string) {
  return configurations[key].getColumns(locale);
}
/** Returns a JSX.Element that can render data items as cards for a table configuraton */
export function getCardRenderer(key: ConfigurationKey) {
  return configurations[key].cardRenderer;
}
