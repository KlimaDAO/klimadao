import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { CategoryName, Listing as ListingT } from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import { Badge } from "../Badge";
import * as styles from "./styles";

type Props = {
  listing: ListingT;
  children: ReactNode;
};

export const Listing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const project = props.listing.project;
  const category = project?.category as CategoryName;
  const isExpired =
    Number(props.listing.expiration) <= Math.floor(Date.now() / 1000);
  const isInvalid = false; // TODO https://github.com/KlimaDAO/klimadao/issues/1586

  return (
    <Card>
      <div className={styles.tags}>
        <div>
          <Category category={category} />
          <Vintage vintage={project.vintage} />
          <ProjectKey projectKey={project.key} />
        </div>
        <div>
          {isInvalid && <Badge type="Invalid" />}
          {isExpired && <Badge type="Expired" />}
        </div>
      </div>
      <Link href={createProjectLink(project)}>
        <Text t="h4" className={styles.link}>
          {project.name || `${project.key}-${project.vintage}`}
        </Text>
      </Link>
      <div className={styles.image}>
        <Link href={createProjectLink(project)}>
          <ProjectImage category={category || "Other"} />
        </Link>
      </div>
      <div className={styles.amounts}>
        <Text t="h4">
          {formatToPrice(props.listing.singleUnitPrice, locale)}
        </Text>
        <Text t="body1">
          <Trans id="seller.listing.quantity_available">
            Quantity Available:
          </Trans>{" "}
          {formatToTonnes(props.listing.leftToSell, locale)}
        </Text>
      </div>
      {props.children}
    </Card>
  );
};
