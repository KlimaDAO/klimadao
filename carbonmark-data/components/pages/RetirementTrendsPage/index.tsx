"use client";

import { t } from "@lingui/macro";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import { MobileTabSelector } from "components/MobileTabSelector";
import { PageHeader } from "components/PageHeader/PageHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

const tabs = ["byPool", "byToken", "byChain", "byBeneficiary"] as const;
type Tab = (typeof tabs)[number];

function assertUnreachable(_: never): never {
  throw new Error("Unreachable code");
}

const TypedTabPanel: FC<{
  tab: Tab;
  children: ReactNode;
  className: string;
}> = ({ tab, children, className }) => {
  switch (tab) {
    case "byPool":
    case "byToken":
    case "byChain":
    case "byBeneficiary":
      return (
        <TabPanel value={tab} className={className}>
          {children}
        </TabPanel>
      );
  }
  return assertUnreachable(tab);
};
export default function RetirementTrendsPage(props: {
  RetirementTrendsByPoolTab: JSX.Element;
  RetirementTrendsByChainTab: JSX.Element;
  RetirementTrendsByTokenTab: JSX.Element;
  RetirementTrendsByBeneficiaryTab: JSX.Element;
}) {
  const queryParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    queryParams.get("tab") || "byPool"
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (_: React.SyntheticEvent, newTab: string) => {
    router.push(`${pathname}?tab=${newTab}`);
    setActiveTab(newTab);
  };

  useEffect(() => {
    const tab = queryParams.get("tab");
    if (tab != null && tabs.some((value) => value == tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <>
      <PageHeader title={t`Retirement Trends`} />
      <TabContext value={activeTab}>
        <MobileTabSelector<Tab>
          value={activeTab}
          options={tabs.map((tab) => {
            switch (tab) {
              case "byPool":
                return { label: t`By Pool`, value: tab };
              case "byToken":
                return { label: t`By Token`, value: tab };
              case "byChain":
                return { label: t`By Chain`, value: tab };
              case "byBeneficiary":
                return { label: t`By Beneficiary`, value: tab };
            }
            return assertUnreachable(tab);
          })}
          onSelectionChanged={(tab: string) => setActiveTab(tab)}
          className={`${styles.mobileOnly} ${styles.mobileTabSelector}`}
        />
        <TabList onChange={handleChange} className={layout.desktopOnly}>
          <Tab
            className={styles.tabButton}
            label={t`By Pool`}
            value="byPool"
          ></Tab>
          <Tab
            className={styles.tabButton}
            label={t`By Token`}
            value="byToken"
          ></Tab>
          <Tab
            className={styles.tabButton}
            label={t`By Chain`}
            value="byChain"
          ></Tab>
          <Tab
            className={styles.tabButton}
            label={t`By Beneficiary`}
            value="byBeneficiary"
          ></Tab>
        </TabList>
        <TypedTabPanel tab="byPool" className={styles.noPadding}>
          {props.RetirementTrendsByPoolTab}
        </TypedTabPanel>
        <TypedTabPanel tab="byToken" className={styles.noPadding}>
          {props.RetirementTrendsByTokenTab}
        </TypedTabPanel>
        <TypedTabPanel tab="byChain" className={styles.noPadding}>
          {props.RetirementTrendsByChainTab}
        </TypedTabPanel>
        <TypedTabPanel tab="byBeneficiary" className={styles.noPadding}>
          {props.RetirementTrendsByBeneficiaryTab}
        </TypedTabPanel>
      </TabContext>
    </>
  );
}
