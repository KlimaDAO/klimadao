import { REGISTRIES } from "@klimadao/lib/constants";
import { Category } from "components/Category";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { isCategoryName } from "lib/types/carbonmark.guard";
import { CategoryName, DetailedProject } from "lib/types/carbonmark.types";
import { notNil, selector } from "lib/utils/functional.utils";
import { compact, isEmpty } from "lodash";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  project: DetailedProject;
}

export const ProjectTags: FC<Props> = (props) => {
  const registry = Object.values(REGISTRIES).find(
    selector("id", props.project.registry)
  )?.title;
  const methodologies = compact(props.project.methodologies);
  const category = methodologies.at(0)?.category ?? "Other";
  const categories: CategoryName[] = !isEmpty(methodologies) ?
  Array.from(
    new Set(
      methodologies.map((methodology) => methodology.category as CategoryName)
    )
  )
  : ["Other"]
  if (!isCategoryName(category)) {
    console.error(`Invalid category name: ${category}`);
    return null;
  }


  return (
    <div className={styles.projectHeaderTags}>
      <Text t="body1" className={styles.projectHeaderSubText}>
        {props.project.registry}-{props.project.projectID}
      </Text>
      <Vintage vintage={props.project.vintage} />
      {       categories.map((category) => (
                <Category
                  key={category}
                  category={category}
                />
              ))
      }
      {notNil(registry) && <Text className={styles.tag}>{registry}</Text>}
    </div>
)
};
