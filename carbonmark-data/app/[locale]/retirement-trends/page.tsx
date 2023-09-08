"use client";

import { t } from "@lingui/macro";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import ChartCard from "components/cards/ChartCard";
import DetailPage from "components/pages/DetailPage";
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
        </TabPanel>
        <TabPanel value="byToken">
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
        </TabPanel>
        <TabPanel value="byChain">
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
        </TabPanel>
        <TabPanel value="byBeneficiary">
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
        </TabPanel>
      </TabContext>
    </>
  );
}
