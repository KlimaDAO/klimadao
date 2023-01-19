import { Spinner, Text } from "@klimadao/lib/components";
import { Activity } from "@klimadao/lib/types/carbonmark";
import { Trans } from "@lingui/macro";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { getSellerAddress } from "lib/sellerGetter";
import { useRouter } from "next/router";
import { FC } from "react";

import { Card } from "components/Card";

import * as styles from "./styles";

interface Props {
  activities: Activity[];
  connectedAddress?: string;
  isLoading?: boolean;
}

const activityTime = (params: { locale: string; timeStamp: number }) => {
  const now = Date.now();
  const elapsedSeconds = Math.abs((params.timeStamp * 1000 - now) / 1000);

  const rtf = new Intl.RelativeTimeFormat(params.locale, {
    numeric: "auto",
    style: "long",
  });

  if (elapsedSeconds < 3600) {
    return rtf.format(Math.floor(-elapsedSeconds / 60), "minutes");
  } else if (elapsedSeconds < 86400) {
    return rtf.format(Number((-elapsedSeconds / 3600).toPrecision(2)), "hours");
  } else if (elapsedSeconds < 604800) {
    return rtf.format(Number((-elapsedSeconds / 86400).toPrecision(1)), "day");
  } else {
    return rtf.format(
      Number((-elapsedSeconds / 604800).toPrecision(1)),
      "week"
    );
  }
};

export const Activities: FC<Props> = (props) => {
  const { locale } = useRouter();
  const hasActivities = !!props.activities?.length;
  const sortedActivities =
    (hasActivities &&
      props.activities.sort(
        (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
      )) ||
    [];

  return (
    <Card>
      <Text t="h4">
        <Trans id="user.activities.title">Activities</Trans>
      </Text>
      {!hasActivities && (
        <Text t="caption" color="lighter">
          <i>
            <Trans id="user.activities.empty_state">No activity to show</Trans>
          </i>
        </Text>
      )}
      {props.isLoading && (
        <div className={styles.activity}>
          <Spinner />
        </div>
      )}
      {!!sortedActivities.length &&
        sortedActivities.map((activity) => (
          <div key={activity.id} className={styles.activity}>
            <Text t="caption">{activity.project?.name || "unknown"}</Text>
            <Text t="caption" color="lighter">
              <i>
                {activityTime({
                  locale: locale || "en",
                  timeStamp: Number(activity.timeStamp),
                })}
              </i>
            </Text>
            <Text t="caption">
              <span className="seller">
                {getSellerAddress(activity.seller.id, props.connectedAddress)}
              </span>
              {activity.activityType}
            </Text>
            {!!activity.amount && activity.price && (
              <Text t="caption">
                <span className="number">
                  {formatBigToTonnes(activity.amount, locale)}
                  <Trans id="tonnes.short">t</Trans>
                </span>{" "}
                at
                <span className="number">
                  {formatBigToPrice(activity.price, locale)}
                </span>
              </Text>
            )}
          </div>
        ))}
    </Card>
  );
};
