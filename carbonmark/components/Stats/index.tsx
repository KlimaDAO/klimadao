import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Listing, Project, UserActivity } from "lib/types/carbonmark";
import { FC } from "react";
import { StatsBar } from "./StatsBar";
import { StatsListings } from "./StatsListings";
import * as styles from "./styles";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
  totalSupply?: Project["stats"]["totalSupply"];
  totalRetired?: Project["stats"]["totalRetired"];
  description: string;
  activities?: UserActivity[];
}

export const Stats: FC<Props> = (props) => {
  return (
    <Card>
      <div className={styles.titles}>
        <Text t="h4" color="lighter">
          <Trans>Stats</Trans>
        </Text>
        <Text t="body1" color="lighter">
          {props.description}
        </Text>
      </div>

      {!!props.totalSupply && !!props.totalRetired ? (
        <StatsBar
          totalSupply={props.totalSupply}
          totalRetired={props.totalRetired}
        />
      ) : (
        <StatsListings
          activeListings={props.activeListings}
          allListings={props.allListings}
          activities={props.activities}
        />
      )}
    </Card>
  );
};
