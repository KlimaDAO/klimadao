import KlimaRetirementsByBeneficiaryListConfiguration from "./KlimaRetirementsByBeneficiaryListConfiguration";
import KlimaRetirementsByChainListConfiguration from "./KlimaRetirementsByChainListConfiguration";
import KlimaRetirementsByPoolListConfiguration from "./KlimaRetirementsByPoolListConfiguration";
import KlimaRetirementsByPoolSummaryConfiguration from "./KlimaRetirementsByPoolSummaryConfiguration";
import KlimaRetirementsByTokenListConfiguration from "./KlimaRetirementsByTokenListConfiguration";
import {
  default as TokenOriginsListConfiguration,
  default as VerraCreditsOriginsListConfiguration,
} from "./VerraCreditsOriginsListConfiguration";
const configurations = {
  KlimaRetirementsByPoolSummary:
    new KlimaRetirementsByPoolSummaryConfiguration(),
  KlimaRetirementsByPoolList: new KlimaRetirementsByPoolListConfiguration(),
  KlimaRetirementsByTokenList: new KlimaRetirementsByTokenListConfiguration(),
  KlimaRetirementsByChainList: new KlimaRetirementsByChainListConfiguration(),
  KlimaRetirementsByBeneficiaryList:
    new KlimaRetirementsByBeneficiaryListConfiguration(),
  TokenOriginsList: new TokenOriginsListConfiguration(),
  VerraCreditsOriginsList: new VerraCreditsOriginsListConfiguration(),
};
export type ConfigurationKey = keyof typeof configurations;
function getConfiguration(key: ConfigurationKey) {
  const res = configurations[key];
  if (res) return res;
  throw `Unknown table configuration : ${key}`;
}
/** Fetches data given a table configuration*/
export function fetchData(
  key: ConfigurationKey,
  page: number,
  params?: object
) {
  return getConfiguration(key).fetchFunction(page, params);
}
/** Returns a JSX.Element that can render data items for desktop */
export function getDesktopRenderer(key: ConfigurationKey) {
  return getConfiguration(key).desktopRenderer;
}
/** Returns a JSX.Element that can render data items for mobile */
export function getMobileRenderer(key: ConfigurationKey) {
  return getConfiguration(key).mobileRenderer;
}
