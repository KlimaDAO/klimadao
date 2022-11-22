import { FC } from "react";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { Activity } from "@klimadao/lib/types/marketplace";
import { useRouter } from "next/router";
import { concatAddress } from "@klimadao/lib/utils";

import * as styles from "./styles";

interface Props {
  activities: Activity[];
}

const activityTime = (params: { locale: string; timeStamp: number }) => {
  const seconds = new Date(params.timeStamp * 1000).getSeconds();
  // if less than 1 hour remaining, return minutes
  const rtf = new Intl.RelativeTimeFormat(params.locale);
  if (seconds < 3600) {
    return rtf.format(Math.floor(seconds / 60), "minutes");
  } else {
    return rtf.format(Number((seconds / 3600).toPrecision(2)), "hours");
  }
};

export const Activities: FC<Props> = (props) => {
  const { locale } = useRouter();
  const hasActivities = !!props.activities?.length;
  return (
    <div className={styles.card}>
      <Text t="h4">
        <Trans id="marketplace.user.activities.title">Activities</Trans>
      </Text>
      {!hasActivities && (
        <Text t="caption" color="lighter">
          <Trans id="marketplace.user.activities.empty_state">
            No activity to show
          </Trans>
        </Text>
      )}
      {hasActivities &&
        props.activities.map((activity) => (
          <div key={activity.id}>
            <Text>{activity.project.key}</Text>
            <Text>
              {activityTime({
                locale: locale || "en",
                timeStamp: activity.timeStamp,
              })}
            </Text>
            <Text>
              {concatAddress(activity.seller.id)} {activity.activityType}
            </Text>
            <Text>
              {activity.amount} at {activity.price}
            </Text>
          </div>
        ))}
    </div>
  );
};
