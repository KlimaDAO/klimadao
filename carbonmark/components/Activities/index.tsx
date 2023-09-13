import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Spinner } from "components/shared/Spinner";
import { Activity as ActivityT } from "lib/types/carbonmark.types";
import { FC } from "react";
import { Activity } from "./Activity";
import * as styles from "./styles";

interface Props {
  activities: ActivityT[];
  isLoading?: boolean;
}

export const Activities: FC<Props> = (props) => {
  const activities = props.activities || [];
  const sortedActivities = activities
    .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
    .slice(0, 5);

  return (
    <Card>
      <Text t="h4" color="lighter">
        <Trans>Activity</Trans>
      </Text>
      {!sortedActivities.length && (
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
      {sortedActivities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </Card>
  );
};
