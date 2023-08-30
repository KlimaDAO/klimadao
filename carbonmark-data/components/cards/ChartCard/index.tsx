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
export default function OverviewCard(props: {
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

  // Returns the chart to display given the chosen options
  // It is the chart that is referenced by the key :
  // `$t{topOptionKey}|$t{bottomOptionKey}` if both options are provided
  // topOptionKey if only topOptionKey is provided
  // bottomOptionKey if only bottom
  // if they are no options: Not implemented yet

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
        <h2 className={styles.cardHeaderTitle}>{props.title}</h2>
        {props.topOptions && (
          <div className={styles.cardHeaderSwitcher}>
            <OptionsSwitcher
              options={props.topOptions}
              onSelectionChange={setTopOptionKey}
            ></OptionsSwitcher>
          </div>
        )}
        {props.detailUrl && (
          <Link className={styles.cardHeaderDetailsLink} href={props.detailUrl}>
            Details{" "}
            <ArrowForward
              fontSize="small"
              className={styles.cardHeaderDetailsLinkArrow}
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
