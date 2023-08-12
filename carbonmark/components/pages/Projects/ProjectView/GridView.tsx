import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { CategoryName, Methodology, Project } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import * as styles from "./styles";

type Props = {
  projects: Array<Project>;
};

export const GridView: React.FC<Props> = ({ projects }) => {
  const { locale } = useRouter();
  return (
    <>
      {projects?.map((project: Project, index: number) => (
        <Link
          passHref
          className={styles.card}
          key={`${project.key}-${index}`}
          href={createProjectLink(project)}
        >
          <div className={styles.cardImage}>
            <ProjectImage category={getCategoryFromProject(project)} />
          </div>
          <div className={styles.cardContent}>
            <Text t="h4">{formatToPrice(project.price, locale)}</Text>
            <Text t="h5">{project.name || "! MISSING PROJECT NAME !"}</Text>
            <Text t="body1" className={styles.cardDescription}>
              {project.short_description ||
                project.description ||
                t`No project description found`}
            </Text>
            <div className={styles.tags}>
              <Vintage vintage={project.vintage} />
              {project?.methodologies?.length > 1 ? (
                project.methodologies.map(
                  (methodology: Methodology, index: number) => (
                    <Category
                      key={`${methodology?.id}-${index}`}
                      category={methodology?.category as CategoryName}
                    />
                  )
                )
              ) : (
                <Category category={getCategoryFromProject(project)} />
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
