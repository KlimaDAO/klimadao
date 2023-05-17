import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Listing, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { Price } from "./Price";
import { ProjectHeader } from "./ProjectHeader";
import * as styles from "./styles";

export interface Props {
  project: Project;
  listing: Listing;
}

export const InactivePurchase: FC<Props> = (props) => {
  return (
    <Card>
      <ProjectHeader project={props.project} listing={props.listing} />
      <div className={styles.inactivePurchase}>
        <Price price={props.listing.singleUnitPrice} />

        <Text>
          <Trans>This offer no longer exists.</Trans>
        </Text>
      </div>
    </Card>
  );
};
