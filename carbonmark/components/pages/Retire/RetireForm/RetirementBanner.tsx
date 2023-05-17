import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Registry } from "components/Registry";
import { Vintage } from "components/Vintage";

import { FC } from "react";

import { CategoryName } from "lib/types/carbonmark";
import * as styles from "./styles";

type Props = {
  projectName?: string;
  projectKey: string;
  vintageYear: string;
  category: CategoryName;
};

export const RetirementBanner: FC<Props> = (props) => {
  const { category, vintageYear, projectKey, projectName } = props;

  return (
    <div className={styles.offsetCard_header}>
      <div className={styles.bannerImageContainer}>
        <div className={styles.projectImageWrapper}>
          <ProjectImage category={category} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.projectName}>{projectName}</h3>
          <div className={styles.details}>
            <h4 className={styles.projectKeyStyle}>{projectKey}</h4>
            <Vintage vintage={vintageYear} />
            <Category category={category} />
            <Registry projectKey={projectKey} />
          </div>
        </div>
      </div>
    </div>
  );
};
