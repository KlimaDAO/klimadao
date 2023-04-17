import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { ListingWithProject } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import * as styles from "./styles";

type Props = {
  listing: ListingWithProject;
  children: ReactNode;
};

export const Listing: FC<Props> = (props) => {
  const { locale } = useRouter();
  return (
    <Card>
      <div className={styles.tags}>
        <Category category={props.listing.project.category.id} />
        <Vintage vintage={props.listing.project.vintage} />
      </div>
      <Text t="h4">{props.listing.project.name}</Text>
      <div className={styles.image}>
        <ProjectImage category={props.listing.project.category.id} />
      </div>
      <div className={styles.amounts}>
        <Text t="h4">
          {formatBigToPrice(props.listing.singleUnitPrice, locale)}
        </Text>
        <Text t="body1">
          <Trans id="seller.listing.quantity_available">
            Quantity Available:
          </Trans>{" "}
          {formatBigToTonnes(props.listing.leftToSell, locale)}
        </Text>
      </div>
      {props.children}
    </Card>
  );
};
