"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "components/Link";
import OptionsSwitcher from "components/OptionsSwitcher";
import Skeleton from "components/Skeleton";
import { Options } from "lib/charts/options";
import { Key, Suspense, useState } from "react";
import * as styles from "./styles";

/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 */
export default function OverviewCard<T>(props: {
  charts: Record<string, React.ReactNode>;
  title: string;
  detailUrl?: string;
  topOptions?: Options;
  bottomOptions?: Options;
}) {
  const [topOptionKey, setTopOptionKey] = useState<Key>(
    props.topOptions ? props.topOptions[0].value : ""
  );
  const [bottomOptionKey, setBottomOptionKey] = useState<Key>(
    props.bottomOptions ? props.bottomOptions[0].value : ""
  );

  // Returns the chart to display given the options
  function displayedChart(): React.ReactNode {
    const keyItems = [];
    if (props.topOptions) keyItems.push(topOptionKey);
    if (props.bottomOptions) keyItems.push(bottomOptionKey);
    const displayedKey = keyItems.join("|");
    return props.charts[displayedKey];
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardHeaderItem}>{props.title}</h2>
        {props.topOptions && (
          <OptionsSwitcher
            options={props.topOptions}
            onSelectionChange={setTopOptionKey}
          ></OptionsSwitcher>
        )}
        {props.detailUrl && (
          <Link className={styles.detailsLink} href={props.detailUrl}>
            Details{" "}
            <ArrowForward
              fontSize="small"
              className={styles.detailsLinkArrow}
            />
          </Link>
        )}
      </div>
      <div className={styles.cardContent}>
        <Suspense fallback={<Skeleton />}>{displayedChart()}</Suspense>
      </div>
      <div className={styles.cardFooter}>
        {props.bottomOptions && (
          <OptionsSwitcher
            options={props.bottomOptions}
            onSelectionChange={setBottomOptionKey}
          ></OptionsSwitcher>
        )}
      </div>
    </div>
  );
}
