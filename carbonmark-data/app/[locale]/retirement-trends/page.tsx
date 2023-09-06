"use client";

import { t } from "@lingui/macro";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import ChartCard from "components/cards/ChartCard";
import { useState } from "react";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

export default function RetirementTrends() {
  const [activeTab, setActiveTab] = useState("byPool");

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setActiveTab(newTab);
  };

  return (
    <>
      <h1>{t`Retirement Trends`}</h1>
      <TabContext value={activeTab}>
        <TabList value={activeTab} onChange={handleChange}>
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
        <TabPanel value="byPool">
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Some card by pool" />
              </div>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Another card by pool" />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard isColumnCard={true} title="Stacked card by pool" />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="byToken">
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Some card by token" />
              </div>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Another card by token" />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard isColumnCard={true} title="Stacked card by token" />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="byChain">
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Some card by chain" />
              </div>
              <div className={layout.cardRow}>
                <ChartCard isColumnCard={true} title="Another card by chain" />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard isColumnCard={true} title="Stacked card by chain" />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="byBeneficiary">
          <div className={layout.twoColumns}>
            <div className={layout.cardStackedRows}>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="Some card by beneficiary"
                />
              </div>
              <div className={layout.cardRow}>
                <ChartCard
                  isColumnCard={true}
                  title="Another card by beneficiary"
                />
              </div>
            </div>
            <div className={layout.cardStackedRows}>
              <ChartCard
                isColumnCard={true}
                title="Stacked card by beneficiary"
              />
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </>
  );
}
