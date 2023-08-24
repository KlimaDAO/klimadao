import { t } from "@lingui/macro";
import {
  BarChart,
  Link,
  PaidOutlined,
  StackedLineChart,
  TokenOutlined,
} from "@mui/icons-material";

export interface NavItem {
  label: string;
  icon: JSX.Element;
  url: string;
}

export const navItems = (): Array<NavItem> => {
  return [
    {
      label: t`Overview`,
      icon: <TokenOutlined />,
      url: "/",
    },
    {
      label: t`Off vs On-Chain`,
      icon: <Link />,
      url: "/off_vs_on_chain",
    },
    {
      label: t`Supply`,
      icon: <BarChart />,
      url: "/supply",
    },
    {
      label: t`Retirement Trends`,
      icon: <StackedLineChart />,
      url: "/retirement_trends",
    },
    {
      label: t`Token Details`,
      icon: <PaidOutlined />,
      url: "/token_details",
    },
  ];
};
