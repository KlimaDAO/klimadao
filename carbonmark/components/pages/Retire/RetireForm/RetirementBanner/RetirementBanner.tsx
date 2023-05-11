import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { ProjectKey } from "components/ProjectKey";
import { Vintage } from "components/Vintage";
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
  const { category, vintage, projectKey } = props;

  return (
    <div className={styles.offsetCard_header}>
      <div
        className={styles.bannerImageContainer}
        style={{ position: "relative" }}
      >
        <div>
          <ProjectImage category={category} />
          <div
            className={styles.tags}
            style={{ position: "absolute", bottom: "0", left: "0" }}
          >
            <Category category={category} />
            <Vintage vintage={vintage} />
            <ProjectKey projectKey={projectKey} />
          </div>
        </div>
      </div>
    </div>
  );
};
