import { cx } from "@emotion/css";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { CategoryName, Methodology, Project } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  project: Project;
  className?: string;
  url?: string;
};

export const ProjectCard: FC<Props> = (props) => {
  const { locale } = useRouter();

  const { project } = props;

  return (
    <Link
      href={props.url || createProjectLink(project)}
      passHref
      className={cx(styles.card, props.className)}
    >
      <div className={styles.cardImage}>
        <ProjectImage category={getCategoryFromProject(project)} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.price}>
          <Text t="h4">{formatBigToPrice(project.price, locale)}</Text>
          {project.currentSupply && (
            <div className={styles.supply}>
              <Text t="body2" color="lighter" align="end">
                <Trans>Available Tonnes:</Trans>
                <br />
                {trimWithLocale(
                  Number(project.currentSupply),
                  2,
                  locale || "en"
                )}
              </Text>
            </div>
          )}
        </div>
        <Text t="h5">{project.name || "! MISSING PROJECT NAME !"}</Text>
        <Text t="body1" className={styles.cardDescription}>
          {project.short_description ||
            project.description ||
            t`No project description found`}
        </Text>
        <div className={styles.tags}>
          <Vintage vintage={project.vintage} />
          {project?.methodologies?.length > 1 ? (
            project.methodologies.map((methodology: Methodology, index) => (
              <Category
                key={`${methodology?.id}-${index}`}
                category={methodology?.category as CategoryName}
              />
            ))
          ) : (
            <Category category={getCategoryFromProject(project)} />
          )}
        </div>
      </div>
    </Link>
  );
};
