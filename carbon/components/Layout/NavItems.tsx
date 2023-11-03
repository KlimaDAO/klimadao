import { t } from "@lingui/macro";
import {
  BarChart,
  Link,
  PaidOutlined,
  StackedLineChart,
  TokenOutlined,
} from "@mui/icons-material";
import { PageLinks } from "lib/PageLinks";

export interface NavItem {
  label: string;
  icon: JSX.Element;
  url: string;
  path?: string;
}

export const navItems = (): Array<NavItem> => {
  return [
    {
      label: t`Overview`,
      icon: <TokenOutlined />,
      url: PageLinks.Overview,
      path: "/overview",
    },
    {
      label: t`Off vs On-Chain`,
      icon: <Link />,
      url: PageLinks.OffChainVsOnChain,
    },
    {
      label: t`Supply`,
      icon: <BarChart />,
      url: PageLinks.Supply,
    },
    {
      label: t`Retirement Trends`,
      icon: <StackedLineChart />,
      url: PageLinks.RetirementTrends,
    },
    {
      label: t`Token Details`,
      icon: <PaidOutlined />,
      url: PageLinks.TokenDetails,
    },
  ];
};
