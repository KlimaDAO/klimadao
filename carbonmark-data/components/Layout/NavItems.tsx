
import { t } from "@lingui/macro";
import {
    OffVsOnIconPath,
    OverviewFilledIconPath,
    OverviewIconPath,
    RetirementTrendsIconPath,
    SupplyIconPath,
    TokenDetailsIconPath
} from "components/Graphics/Icons";

export interface NavItem {
    label: string;
    iconPath: JSX.Element;
    activeIconPath: JSX.Element;
    url: string;
}
export const navItems: Array<NavItem> = [
    {
        label: t`Overview`,
        iconPath: OverviewIconPath(),
        activeIconPath: OverviewFilledIconPath(),
        url: "/"
    },
    {
        label: "Off vs On-Chain",
        iconPath: OffVsOnIconPath(),
        activeIconPath: OffVsOnIconPath(),
        url: "/off_vs_on_chain"
    },
    {
        label: "Supply",
        iconPath: SupplyIconPath(),
        activeIconPath: SupplyIconPath(),
        url: "/supply"
    },
    {
        label: "Retirement Trends",
        iconPath: RetirementTrendsIconPath(),
        activeIconPath: RetirementTrendsIconPath(),
        url: "/retirement_trends"
    },
    {
        label: "Token Details",
        iconPath: TokenDetailsIconPath(),
        activeIconPath: RetirementTrendsIconPath(),
        url: "/token_details"
    },
];