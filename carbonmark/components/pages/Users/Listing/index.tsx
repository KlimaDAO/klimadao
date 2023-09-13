import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { CategoryName, Listing as ListingT } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import * as styles from "./styles";

type Props = {
  listing: ListingT;
  children: ReactNode;
};

export const Listing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const category = props.listing.project.category.id as CategoryName;
  return (
    <Card>
      <div className={styles.tags}>
        <Category category={category} />
        <Vintage vintage={props.listing.project.vintage} />
        <ProjectKey projectKey={props.listing.project.key} />
      </div>
      <Link href={createProjectLink(props.listing.project)}>
        <Text t="h4" className={styles.link}>
          {props.listing.project.name}
        </Text>
      </Link>
      <div className={styles.image}>
        <Link href={createProjectLink(props.listing.project)}>
          <ProjectImage category={category} />
        </Link>
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
