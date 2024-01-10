import { REGISTRIES } from "@klimadao/lib/constants";
import { Category } from "components/Category";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { getCategoriesFromProject } from "lib/projectGetter";
import { CategoryName, Project } from "lib/types/carbonmark.types";
import { notNil, selector } from "lib/utils/functional.utils";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  project: Project;
}

export const ProjectTags: FC<Props> = (props) => {
  const registry = Object.values(REGISTRIES).find(
    selector("id", props.project.registry)
  )?.title;
  const categories: CategoryName[] = getCategoriesFromProject(props.project);

  return (
    <div className={styles.projectHeaderTags}>
      <Text t="body1" className={styles.projectHeaderSubText}>
        {props.project.registry}-{props.project.projectID}
      </Text>
      <Vintage vintage={props.project.vintage} />
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
      {notNil(registry) && <Text className={styles.tag}>{registry}</Text>}
    </div>
  );
};
