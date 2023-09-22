import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { DetailedProject, Listing } from "lib/types/carbonmark.types";
import { FC } from "react";
import { StatsBar } from "./StatsBar";
import { StatsListings } from "./StatsListings";
import * as styles from "./styles";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
  totalSupply?: DetailedProject["stats"]["totalSupply"];
  totalRetired?: DetailedProject["stats"]["totalRetired"];
  description: string;
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
        />
      )}
    </Card>
  );
};
