import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { ActivityType } from "lib/types/carbonmark";
import { FC } from "react";
import { Activity } from "./Activity";
import * as styles from "./styles";

interface Props {
  activities: ActivityType[];
  isLoading?: boolean;
}

export const Activities: FC<Props> = (props) => {
  const hasActivities = !!props.activities?.length;
  const sortedActivities =
    (hasActivities &&
      props.activities
        .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
        .slice(0, 5)) ||
    [];

  return (
    <Card>
      <Text t="h4">
        <Trans>Activity</Trans>
      </Text>
      {!hasActivities && (
        <Text t="body1" color="lighter">
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
      {!!sortedActivities.length && sortedActivities.map(Activity)}
    </Card>
  );
};
