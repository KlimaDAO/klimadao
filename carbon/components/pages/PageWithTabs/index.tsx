"use client";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import { MobileTabSelector } from "components/MobileTabSelector";
import OptionsSwitcher from "components/OptionsSwitcher";
import { PageHeader } from "components/PageHeader/PageHeader";
import { useQueryParam } from "hooks/useQueryParam";
import { Options } from "lib/charts/options";
import { Key, ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";

type TabParam = {
  key: string;
  label: string;
  optionsList?: Array<Options<string>>;
  content?: ReactNode;
  contents?: Record<string, React.ReactNode>;
};
export type TabParams = Array<TabParam>;

export default function PageWithTabs(props: {
  title: string;
  tabs: TabParams;
}) {
  const [activeTab, setActiveTab] = useQueryParam<string>({
    key: "tab",
    defaultValue: props.tabs[0].key,
    readonly: false,
  });

  /** By default, the first option of each widget is selected */
  const getDetaultOptions = () => {
    return props.tabs.map((tab) =>
      tab.optionsList ? tab.optionsList.map((options) => options[0].value) : []
    );
  };
  /** Stores all options selections */
  const [optionKeys, setOptionKeys] = useState<Key[][]>(getDetaultOptions);

  /** Compute Dynamic Options Lists. Lists that contains only options that will lead to a valid content */
  function getTabsDynamicOptionsList() {
    // For each tab
    return props.tabs.map((tab, tabIndex) => {
      // For each option list
      if (tab.optionsList)
        return tab.optionsList.map((options, widgetIndex) => {
          // Check if there is content for that option
          const newOptions: Options<string> = [];
          options.forEach((option) => {
            const keys = [...optionKeys[tabIndex]];
            keys[widgetIndex] = option.value;
            const key = keys.join("|");
            if (tab.contents && tab.contents[key] !== undefined)
              newOptions.push(option);
          });
          return newOptions;
        });
      else return [];
    });
  }

  let tabsDynamicOptionsList: Options<string>[][] = getTabsDynamicOptionsList();

  useEffect(() => {
    tabsDynamicOptionsList = getTabsDynamicOptionsList();
  }, [optionKeys]);

  // Handle Options change
  function onOptionChange(tabIndex: number, widgetIndex: number) {
    return (value: Key) => {
      const newOptionKeys = [...optionKeys];
      newOptionKeys[tabIndex][widgetIndex] = value;
      setOptionKeys(newOptionKeys);
    };
  }

  /** Returns the tab to display given the chosen options
   If the chart attribute is filled, it is that chart.
   If the charts attribute if filled, it is the chart that is referenced by the key :
   `$t{topOptionKey}|$t{bottomOptionKey}` if both options are provided
   topOptionKey if only topOptionKey is provided
   bottomOptionKey if only bottom
   "default" if there are no charts for the given option
   empty component if everything fails
  */
  function displayedTab(tabIndex: number): React.ReactNode {
    const tab = props.tabs[tabIndex];
    if (tab?.content) return tab.content;

    if (tab?.contents) {
      const displayedKey = optionKeys[tabIndex].join("|");
      return tab.contents[displayedKey] || <></>;
    }
  }
  return (
    <>
      <PageHeader title={props.title} />
      <TabContext value={activeTab}>
        <div className={styles.tabRoot}>
          <div className={styles.mobileTabSelectorWrapper}>
            <MobileTabSelector
              value={activeTab}
              options={props.tabs.map((tab) => {
                return { label: tab.label, value: tab.key };
              })}
              onSelectionChanged={(key: string) => setActiveTab(key)}
            />
          </div>
          <TabList
            onChange={(_: React.SyntheticEvent, newTab: string) => {
              setActiveTab(newTab);
            }}
            className={`${styles.tabList}`}
          >
            {props.tabs.map((tab) => (
              <Tab
                key={tab.key}
                className={styles.tabButton}
                label={tab.label}
                value={tab.key}
              ></Tab>
            ))}
          </TabList>

          {props.tabs.map((tab, tabIndex) => (
            <TabPanel
              key={tabIndex}
              value={tab.key}
              className={styles.topPadding}
            >
              {tabsDynamicOptionsList[tabIndex].length > 0 && (
                <div className={styles.optionsSwitchers}>
                  {tabsDynamicOptionsList[tabIndex].map(
                    (options, widgetIndex) => (
                      <div
                        key={widgetIndex}
                        className={styles.optionsSwitcherWrapper}
                      >
                        <OptionsSwitcher
                          name={`option_${tab.key}_${widgetIndex}`}
                          options={options}
                          onSelectionChange={onOptionChange(
                            tabIndex,
                            widgetIndex
                          )}
                          value={optionKeys[tabIndex][widgetIndex]}
                          className={styles.optionsSwitcher}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
              {displayedTab(tabIndex)}
            </TabPanel>
          ))}
        </div>
      </TabContext>
    </>
  );
}
