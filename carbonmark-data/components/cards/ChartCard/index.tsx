"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "components/Link";
import OptionsSwitcher from "components/OptionsSwitcher";
import Skeleton from "components/Skeleton";
import { Options } from "lib/charts/options";
import React, { Key, Suspense, useState } from "react";
import styles from "./styles.module.scss";

export type DetailUrlPosition = "top" | "bottom" | "none";
export type CardProps = {
  isDetailPage?: boolean;
};
/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 * charts: A dictionnary contaning the possible charts to be displayed
 * chart: A single chart if the card has no options
 * title: Title of the chart
 * detailUrl: Url of the detailPage
 * detailUrlPosition: Position of the detail URL (top or bottom)
 * isDetailPage: Is this card displayed on a detail page
 * topOptions: Options to be displayed at the top of the card
 * bottomOptions: Options to be displayed at the bottom of the card
 * isColumnCard: Is this card used in a column? In this case there will be no constraint on the card height.
 */
export default function ChartCard<T extends Key, B extends Key>(props: {
  charts?: Record<string, React.ReactNode>;
  chart?: React.ReactNode;
  title: string;
  detailUrl?: string;
  detailUrlPosition?: DetailUrlPosition;
  isDetailPage?: boolean;
  topOptions?: Options<T>;
  bottomOptions?: Options<B>;
  // Todo: It would be nice if the component could detect it was inside a 'ChartRow'
  isColumnCard?: boolean;
}) {
  const [topOptionKey, setTopOptionKey] = useState<T | undefined>(
    props.topOptions ? props.topOptions[0].value : undefined
  );
  const [bottomOptionKey, setBottomOptionKey] = useState<B | undefined>(
    props.bottomOptions ? props.bottomOptions[0].value : undefined
  );
  const isDetailPage = props.isDetailPage || false;
  const detailUrlPosition = props.detailUrlPosition || "top";
  let detailUrlComponent = <></>;
  if (props.detailUrl && !isDetailPage) {
    detailUrlComponent = (
      <Link className={styles.cardHeaderDetailsLink} href={props.detailUrl}>
        Details <ArrowForward fontSize="small" />
      </Link>
    );
  } else {
    detailUrlComponent = <div className={styles.cardHeaderDetailsLink}></div>;
  }
  const topDetailUrlComponent =
    detailUrlPosition == "top" ? detailUrlComponent : <></>;
  const bottomDetailUrlComponent =
    detailUrlPosition == "bottom" ? detailUrlComponent : <></>;

  /** Returns the chart to display given the chosen options
   If the the chart attribute is filled, it is that chart.
   If the charts attribute if filled, it is the chart that is referenced by the key :
   `$t{topOptionKey}|$t{bottomOptionKey}` if both options are provided
   topOptionKey if only topOptionKey is provided
   bottomOptionKey if only bottom
   "default" if there are no charts for the given option
   empty component if everything fails
  */
  function displayedChart(): React.ReactNode {
    if (props.chart) return props.chart;
    if (props.charts) {
      const keyItems = [];
      if (props.topOptions) keyItems.push(topOptionKey);
      if (props.bottomOptions) keyItems.push(bottomOptionKey);
      const displayedKey = keyItems.join("|");
      return props.charts[displayedKey] || props.charts["default"] || <></>;
    }
  }
  let className = styles.cardContainer;
  if (props.isColumnCard) {
  } else {
    className = `${className} ${styles.rowCardContainer}`;
  }

  return (
    <div className={className}>
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
        {topDetailUrlComponent}
      </div>
      <div className={styles.cardContent}>
        <Suspense fallback={<Skeleton />}>{displayedChart()}</Suspense>
      </div>
      <div className={styles.cardFooter}>
        {props.topOptions && (
          <div className={styles.cardFooterSwitcher}>
            <OptionsSwitcher
              options={props.topOptions}
              onSelectionChange={setTopOptionKey}
            ></OptionsSwitcher>
          </div>
        )}
        {props.bottomOptions && (
          <OptionsSwitcher
            options={props.bottomOptions}
            onSelectionChange={setBottomOptionKey}
          />
        )}
      </div>
      {bottomDetailUrlComponent}
    </div>
  );
}
