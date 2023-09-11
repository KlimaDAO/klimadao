import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { ProjectHeader } from "components/pages/Project/ProjectHeader";
import { DetailedProject, Listing } from "lib/types/carbonmark";
import { FC } from "react";
import { Price } from "./Listing/Price";
import * as styles from "./styles";

export interface Props {
  project: DetailedProject;
  seller?: Listing["seller"];
  singleUnitPrice?: Listing["singleUnitPrice"];
}

export const InactivePurchase: FC<Props> = (props) => {
  return (
    <Card>
      <ProjectHeader project={props.project} seller={props.seller} />
      <div className={styles.inactivePurchase}>
        {props.singleUnitPrice && <Price price={props.singleUnitPrice} />}

        <Text>
          <Trans>This offer no longer exists.</Trans>
        </Text>
      </div>
    </Card>
  );
};
