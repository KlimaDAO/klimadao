import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Vintage } from "components/Vintage";
import { Registry } from "components/Registry";

import { FC } from "react";

import { CategoryName } from "lib/types/carbonmark";
import * as styles from "../styles";

type Props = {
  projectName?: string;
  projectKey: string;
  vintage: string;
  category: CategoryName;
};

export const RetirementBanner: FC<Props> = (props) => {
  const { category, vintage, projectKey, projectName } = props;
  console.log('projectKey', projectKey)
  return (
    <div className={styles.offsetCard_header}>
      <div className={styles.bannerImageContainer}>
        <ProjectImage category={category} />
        <div className={styles.info}>
          <h3 className={styles.projectName}>{projectName}</h3>
          <div className={styles.details}>
            <h4 className={styles.projectKeyStyle}>{projectKey}</h4>
            <Vintage vintage={vintage} />
            <Category category={category} />
            <Registry projectKey={projectKey}/>
          </div>
        </div>
      </div>
    </div>
  );
};
