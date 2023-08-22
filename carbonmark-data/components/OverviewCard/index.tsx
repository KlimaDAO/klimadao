"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "components/Link";
import OptionsSwitcher from "components/OptionsSwitcher";
import Skeleton from "components/Skeleton";
import { Options } from "lib/charts/options";
import { Key, Suspense, useState } from "react";
import styles from "./styles.module.css";

/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 */
export default function OverviewCard<T>(props: {
  charts: Record<string, React.ReactNode>;
  title: string;
  detailUrl?: string;
  topOptions?: Options;
}) {
  const [topOptionKey, setTopOptionKey] = useState<Key>(
    props.topOptions ? props.topOptions[0].value : "",
  );

  function displayedChart(): React.ReactNode {
    var keyItems = [];
    if (props.topOptions) keyItems.push(topOptionKey);
    const displayedKey = keyItems.join("|");
    return props.charts[displayedKey];
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2>{props.title}</h2>
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
    </div>
  );
}
