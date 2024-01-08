import { concatAddress } from "@klimadao/lib/utils";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { createSellerLink } from "lib/createUrls";
import { getCategoryFromProject } from "lib/projectGetter";
import { DetailedProject, Listing } from "lib/types/carbonmark.types";
import Link from "next/link";
import { FC } from "react";
import { ProjectTags } from "../ProjectTags";
import * as styles from "./styles";

export interface Props {
  project: DetailedProject;
  seller?: Listing["seller"];
}

export const ProjectHeader: FC<Props> = (props) => {
  return (
    <div className={styles.projectHeader}>
      <ProjectImage category={getCategoryFromProject(props.project)} />
      <div className={styles.imageGradient}></div>
      <div className="stack">
        {!!props.seller?.handle && (
          <div className="stack">
            <Link
              className={styles.sellerLink}
              href={createSellerLink(props.seller?.handle || props.seller?.id)}
            >
              @{props.seller?.handle || concatAddress(props.seller.id)}
            </Link>
          </div>
        )}
        <Text t="h3" className={styles.projectHeaderText}>
          {props.project.name}
        </Text>
        <ProjectTags project={props.project} />
      </div>
    </div>
  );
};
