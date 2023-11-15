import { t } from "@lingui/macro";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";
import { PageLinks } from "lib/PageLinks";

export interface NavItem {
  label: string;
  icon: JSX.Element;
  url: string;
  path: string;
}

export const navItems = (): Array<NavItem> => {
  return [
    {
      label: t`Overview`,
      icon: <TokenOutlinedIcon />,
      url: PageLinks.Overview,
      path: "/overview",
    },
    {
      label: t`Off vs On-Chain`,
      icon: <LinkIcon />,
      url: PageLinks.OffChainVsOnChain,
      path: PageLinks.OffChainVsOnChain,
    },
    {
      label: t`Supply`,
      icon: <BarChartIcon />,
      url: PageLinks.Supply,
      path: PageLinks.Supply,
    },
    {
      label: t`Retirement Trends`,
      icon: <StackedLineChartIcon />,
      url: PageLinks.RetirementTrends,
      path: PageLinks.RetirementTrends,
    },
    {
      label: t`Token Details`,
      icon: <PaidOutlinedIcon />,
      url: PageLinks.TokenDetails,
      path: PageLinks.TokenDetails,
    },
  ];
};
