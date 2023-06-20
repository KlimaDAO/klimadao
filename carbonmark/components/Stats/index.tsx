import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Listing, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { StatsBar } from "./StatsBar";
import { StatsListings } from "./StatsListings";
import * as styles from "./styles";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
  currentSupply?: Project["currentSupply"];
  totalRetired?: Project["totalRetired"];
  description: string;
  projectAddress?: string;
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

      {!!props.currentSupply &&
      !!props.totalRetired &&
      !!props.projectAddress ? (
        <StatsBar
          currentSupply={props.currentSupply}
          totalRetired={props.totalRetired}
          projectAddress={props.projectAddress}
        />
      ) : (
        <StatsListings
          activeListings={props.activeListings}
          allListings={props.allListings}
        />
      )}
    </Card>
  );
};
