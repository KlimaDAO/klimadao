"use client";

import { t } from "@lingui/macro";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import { MobileTabSelector } from "components/MobileTabSelector";
import ChartCard from "components/cards/ChartCard";
import DetailPage from "components/pages/DetailPage";
import { FC, ReactNode, useState } from "react";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

const tabs = ["byPool", "byToken", "byChain", "byBeneficiary"] as const;
type Tab = (typeof tabs)[number];

function assertUnreachable(tab: never): never {
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

export default function RetirementTrends() {
  const [activeTab, setActiveTab] = useState("byPool");

  const handleChange = (_: React.SyntheticEvent, newTab: string) => {
    setActiveTab(newTab);
  };

  return (
    <>
      <h1>{t`Retirement Trends`}</h1>
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
        <TabList
          value={activeTab}
          onChange={handleChange}
          className={styles.desktopOnly}
        >
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
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="KlimaDAO retirements by pool"
                />
              </div>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="KlimaDAO retirements by pool"
                />
              </div>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="Detailed list of KlimaDAO retirements"
                />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard
                isColumnCard={true}
                title="Carbon pool redemptions / retirements"
              />
            </div>
          </div>
        </TypedTabPanel>
        <TypedTabPanel tab="byToken" className={styles.noPadding}>
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="KlimaDAO retirements by token"
                />
              </div>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="Detailed list of KlimaDAO retirements"
                />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard isColumnCard={true} title="Carbon token retirements" />
            </div>
          </div>
        </TypedTabPanel>
        <TypedTabPanel tab="byChain" className={styles.noPadding}>
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Retirements by chain" />
              </div>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="Detailed list of KlimaDAO retirements"
                />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard
                isColumnCard={true}
                title="Carbon pool redemptions / retirements"
              />
            </div>
          </div>
        </TypedTabPanel>
        <TypedTabPanel tab="byBeneficiary" className={styles.noPadding}>
          <DetailPage
            card={
              <ChartCard
                isColumnCard={true}
                title="Carbon pool redemptions / retirements"
              />
            }
            overview={t`Lorem Ipsum`}
            insights={{
              content: t`Lorem Ipsum`,
              source: "ai",
            }}
          />
        </TypedTabPanel>
      </TabContext>
    </>
  );
}
