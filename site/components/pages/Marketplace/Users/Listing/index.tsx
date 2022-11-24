import { FC } from "react";
import { Listing as ListingType } from "@klimadao/lib/types/marketplace";
import { Text } from "@klimadao/lib/components";

import { Card } from "components/pages/Marketplace/shared/Card";
import { Category } from "components/pages/Marketplace/shared/Category";
import { ProjectImage } from "components/pages/Marketplace/shared/ProjectImage";
import { Year } from "components/pages/Marketplace/shared/Year";

import * as styles from "./styles";

type Props = {
  listing: ListingType;
};

export const Listing: FC<Props> = (props) => {
  return (
    <Card>
      <div className={styles.tags}>
        <Category category={props.listing.project.category || "AM0052"} />
        <Year year="Year ???" />
      </div>
      <Text>{props.listing.project.name}</Text>
      <ProjectImage category={props.listing.project.category || "AM0052"} />
    </Card>
  );
};
