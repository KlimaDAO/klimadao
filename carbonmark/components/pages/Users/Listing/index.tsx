import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import { Text } from "@klimadao/lib/components";
import { Listing as ListingType } from "@klimadao/lib/types/carbonmark";

import { ProjectImage } from "@klimadao/carbonmark/components/pages/Project/ProjectImage";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { Vintage } from "components/Vintage";

import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";

import * as styles from "./styles";

type Props = {
  listing: ListingType;
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
      <Text>{props.listing.project.name}</Text>
      <div className={styles.image}>
        <ProjectImage category={props.listing.project.category.id} />
      </div>
      <div className={styles.amounts}>
        <Text t="body4">
          {formatBigToPrice(props.listing.singleUnitPrice, locale)}
        </Text>
        <Text t="body6">
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
