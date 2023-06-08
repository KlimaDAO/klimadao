import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { Text } from "components/Text";
import { Listing, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { Price } from "./Price";
import * as styles from "./styles";

export interface Props {
  project: Project;
  seller?: Listing["seller"];
  singleUnitPrice: string;
}

export const InactivePurchase: FC<Props> = (props) => {
  return (
    <Card>
      <ProjectHeader project={props.project} seller={props.seller} />
      <div className={styles.inactivePurchase}>
        <Price price={props.singleUnitPrice} />

        <Text>
          <Trans>This offer no longer exists.</Trans>
        </Text>
      </div>
    </Card>
  );
};
