
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
export const navItems = (): Array<NavItem> => {
    return [
        {
            label: t`Overview`,
            iconPath: OverviewIconPath(),
            activeIconPath: OverviewFilledIconPath(),
            url: "/"
        },
        {
            label: t`Off vs On-Chain`,
            iconPath: OffVsOnIconPath(),
            activeIconPath: OffVsOnIconPath(),
            url: "/off_vs_on_chain"
        },
        {
            label: t`Supply`,
            iconPath: SupplyIconPath(),
            activeIconPath: SupplyIconPath(),
            url: "/supply"
        },
        {
            label: t`Retirement Trends`,
            iconPath: RetirementTrendsIconPath(),
            activeIconPath: RetirementTrendsIconPath(),
            url: "/retirement_trends"
        },
        {
            label: t`Token Details`,
            iconPath: TokenDetailsIconPath(),
            activeIconPath: RetirementTrendsIconPath(),
            url: "/token_details"
        },
    ];
}