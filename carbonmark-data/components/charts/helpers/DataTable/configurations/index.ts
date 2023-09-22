import KlimaRetirementsByBeneficiaryListConfiguration from "./KlimaRetirementsByBeneficiaryListConfiguration";
import KlimaRetirementsByChainListConfiguration from "./KlimaRetirementsByChainListConfiguration";
import KlimaRetirementsByPoolListConfiguration from "./KlimaRetirementsByPoolListConfiguration";
import KlimaRetirementsByPoolSummaryConfiguration from "./KlimaRetirementsByPoolSummaryConfiguration";
import KlimaRetirementsByTokenListConfiguration from "./KlimaRetirementsByTokenListConfiguration";
const configurations = {
  KlimaRetirementsByPoolSummary:
    new KlimaRetirementsByPoolSummaryConfiguration(),
  KlimaRetirementsByPoolList: new KlimaRetirementsByPoolListConfiguration(),
  KlimaRetirementsByTokenList: new KlimaRetirementsByTokenListConfiguration(),
  KlimaRetirementsByChainList: new KlimaRetirementsByChainListConfiguration(),
  KlimaRetirementsByBeneficiaryList:
    new KlimaRetirementsByBeneficiaryListConfiguration(),
};
export type ConfigurationKey = keyof typeof configurations;
function getConfiguration(key: ConfigurationKey) {
  const res = configurations[key];
  if (res) return res;
  throw `Unknown table configuration : ${key}`;
}
/** Fetches data given a table configuration*/
export function fetchData(key: ConfigurationKey, page: number) {
  return getConfiguration(key).fetchFunction(page);
}
/** Returns a JSX.Element that can render data items for desktop */
export function getDesktopRenderer(key: ConfigurationKey) {
  return getConfiguration(key).desktopRenderer;
}
/** Returns a JSX.Element that can render data items for mobile */
export function getMobileRenderer(key: ConfigurationKey) {
  return getConfiguration(key).mobileRenderer;
}
