import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createSellerLink } from "lib/createUrls";
import { getCategoryFromProject } from "lib/projectGetter";
import { Listing, Project } from "lib/types/carbonmark";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  project: Project;
  seller?: Listing["seller"];
}

export const ProjectHeader: FC<Props> = (props) => {
  return (
    <div className={styles.projectHeader}>
      <ProjectImage category={getCategoryFromProject(props.project)} />
      <div className={styles.imageGradient}></div>
      <div className="stack">
        {!!props.seller && (
          <div className="stack">
            <Text t="h5" className={styles.projectHeaderText}>
              <Link href={createSellerLink(props.seller.handle)}>
                @{props.seller.handle}
              </Link>
            </Text>
          </div>
        )}
        <Text t="h3" className={styles.projectHeaderText}>
          {props.project.name}
        </Text>
        <div className={styles.projectHeaderTags}>
          <Text t="body1" className={styles.projectHeaderText}>
            {props.project.registry}-{props.project.projectID}
          </Text>
          <Vintage vintage={props.project.vintage} />
          <Category category={getCategoryFromProject(props.project)} />
        </div>
      </div>
    </div>
  );
};
