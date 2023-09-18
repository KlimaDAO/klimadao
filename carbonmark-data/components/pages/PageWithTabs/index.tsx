"use client";

import { t } from "@lingui/macro";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import { MobileTabSelector } from "components/MobileTabSelector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

type TabParam = {
  key: string;
  label: string;
  content: ReactNode;
};
export type TabParams = Array<TabParam>;

function TypedTabPanel(props: {
  tab: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <TabPanel value={props.tab} className={props.className}>
      {props.children}
    </TabPanel>
  );
}
export default function PageWithTabs(props: { tabs: TabParams }) {
  const queryParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    queryParams.get("tab") || props.tabs[0].key
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (_: React.SyntheticEvent, newTab: string) => {
    router.push(`${pathname}?tab=${newTab}`);
    setActiveTab(newTab);
  };

  useEffect(() => {
    const queryKey = queryParams.get("tab");
    if (queryKey != null && props.tabs.some((tab) => tab.key == queryKey)) {
      setActiveTab(queryKey);
    }
  }, []);

  return (
    <>
      <h1>{t`Retirement trends`}</h1>
      <TabContext value={activeTab}>
        <MobileTabSelector
          value={activeTab}
          options={props.tabs.map((tab) => {
            return { label: tab.label, value: tab.key };
          })}
          onSelectionChanged={(key: string) => setActiveTab(key)}
          className={`${styles.mobileOnly} ${styles.mobileTabSelector}`}
        />
        <TabList onChange={handleChange} className={layout.desktopOnly}>
          {props.tabs.map((tab) => (
            <Tab
              className={styles.tabButton}
              label={tab.label}
              value={tab.key}
            ></Tab>
          ))}
        </TabList>
        {props.tabs.map((tab) => (
          <TypedTabPanel tab={tab.key} className={styles.noPadding}>
            {tab.content}
          </TypedTabPanel>
        ))}
      </TabContext>
    </>
  );
}
