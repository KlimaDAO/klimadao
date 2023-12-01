import { cx } from "@emotion/css";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { asCategoryName, getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark.types";
import { get, pipe, uniq } from "lodash/fp";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  project: Project;
  className?: string;
  url?: string;
  price?: string; // Enables displaying another price than the project's best price
};

export const ProjectCard: FC<Props> = (props) => {
  const { locale } = useRouter();

  const methodologies = props.project?.methodologies?.map(
    pipe(get("category"), asCategoryName)
  );
  const price = props.price || props.project.price;
  return (
    <Link
      href={props.url || createProjectLink(props.project)}
      passHref
      className={cx(styles.card, props.className)}
    >
      <div className={styles.cardImage}>
        <ProjectImage category={getCategoryFromProject(props.project)} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.price}>
          <Text t="h4">{formatToPrice(price, locale)}</Text>
          {props.project.stats.totalSupply && (
            <div className={styles.supply}>
              <Text t="body2" color="lighter" align="end">
                <Trans>Available Tonnes:</Trans>
                <br />
                {trimWithLocale(
                  Number(props.project.stats.totalSupply),
                  2,
                  locale || "en"
                )}
              </Text>
            </div>
          )}
        </div>
        <Text t="h5" className={styles.cardTitle}>
          {props.project.name || "! MISSING PROJECT NAME !"}
        </Text>
        <Text t="body1" className={styles.cardDescription}>
          {props.project.short_description ||
            props.project.description ||
            t`No props.project description found`}
        </Text>
        <div className={styles.tags}>
          <Vintage vintage={props.project.vintage} />
          {uniq(methodologies)?.map((methodology) => (
            <Category key={methodology} category={methodology} />
          ))}
        </div>
      </div>
    </Link>
  );
};
