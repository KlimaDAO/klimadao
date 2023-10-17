import AbstractTableConfiguration from "./AbstractTableConfiguration";
import KlimaRetirementsByBeneficiaryListConfiguration from "./KlimaRetirementsByBeneficiaryListConfiguration";
import KlimaRetirementsByChainListConfiguration from "./KlimaRetirementsByChainListConfiguration";
import KlimaRetirementsByPoolListConfiguration from "./KlimaRetirementsByPoolListConfiguration";
import KlimaRetirementsByPoolSummaryConfiguration from "./KlimaRetirementsByPoolSummaryConfiguration";
import KlimaRetirementsByTokenListConfiguration from "./KlimaRetirementsByTokenListConfiguration";
import TokenOriginsListConfiguration from "./TokenOriginsListConfiguration";
import VerraCreditsOriginsListConfiguration from "./VerraCreditsOriginsListConfiguration";
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
function getConfiguration<RI, P>(key: ConfigurationKey) {
  const res = configurations[key] as unknown as AbstractTableConfiguration<
    RI,
    P
  >;
  if (res) return res;
  throw `Unknown table configuration : ${key}`;
}
/** Fetches data given a table configuration*/
export function fetchData<RI, P>(
  key: ConfigurationKey,
  page: number,
  params?: P
) {
  return getConfiguration<RI, P>(key).fetchFunction(page, params);
}
/** Returns a JSX.Element that can render data items for desktop */
export function getDesktopRenderer<RI, P>(key: ConfigurationKey) {
  return getConfiguration<RI, P>(key).desktopRenderer;
}
/** Returns a JSX.Element that can render data items for mobile */
export function getMobileRenderer<RI, P>(key: ConfigurationKey) {
  return getConfiguration<RI, P>(key).mobileRenderer;
}
