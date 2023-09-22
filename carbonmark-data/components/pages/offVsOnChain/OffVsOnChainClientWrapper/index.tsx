"use client";
import OptionsSwitcher from "components/OptionsSwitcher";
import { getCreditsStatusOptions } from "lib/charts/options";
import { Status } from "lib/charts/types";
import { ReactNode, useState } from "react";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function OffVsOnChainClientWrapper(props: {
  retiredCreditsTab: ReactNode;
  issuedCreditsTab: ReactNode;
}) {
  const [optionKey, setOptionKey] = useState<Status>(
    getCreditsStatusOptions()[0].value
  );
  function displayedTab(): React.ReactNode {
    console.log(optionKey);
    return optionKey == "issued" ? (
      props.issuedCreditsTab
    ) : optionKey == "retired" ? (
      props.retiredCreditsTab
    ) : (
      <></>
    );
  }
  return (
    <>
      <OptionsSwitcher
        options={getCreditsStatusOptions()}
        onSelectionChange={setOptionKey}
      ></OptionsSwitcher>
      {displayedTab()}
    </>
  );
}
