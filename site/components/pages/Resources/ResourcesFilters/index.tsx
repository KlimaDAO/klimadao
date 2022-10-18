import React, { FC } from "react";
import { Trans } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import { Control } from "react-hook-form";

import { CheckboxGroup } from "./CheckboxGroup";

import { mainTags, subTags, documentTypes } from "../lib/cmsDataMap";
import { FormValues } from "../ResourcesList";

import * as styles from "./styles";

export interface Props {
  control: Control<FormValues>;
  onResetFilters: () => void;
}

export const ResourcesFilters: FC<Props> = (props) => {
  return (
    <div className={styles.filtersContainerInner}>
      <div className={styles.filtersHeader}>
        <Text t="h3">
          <Trans id="resources.form.categories.header">Categories</Trans>
        </Text>
        <Text t="caption">
          <Trans id="resources.form.categories.subheader">
            Select one or more
          </Trans>
        </Text>
      </div>
      <div className={styles.filtersCheckboxGroup}>
        <CheckboxGroup
          options={mainTags}
          formName="tags"
          control={props.control}
        />
      </div>
      <div>
        <Text t="h4">
          <Trans id="resources.form.sub_topics.header">Sub-topics</Trans>
        </Text>
      </div>
      <div className={styles.filtersCheckboxGroup}>
        <CheckboxGroup
          options={subTags}
          formName="tags"
          control={props.control}
        />
      </div>
      <div>
        <Text t="h4">
          <Trans id="resources.form.medium.header">Medium</Trans>
        </Text>
      </div>
      <div className={styles.filtersCheckboxGroup}>
        <CheckboxGroup
          options={documentTypes}
          formName="types"
          control={props.control}
        />
      </div>
      <Text
        t="caption"
        align="center"
        role="button"
        onClick={props.onResetFilters}
        style={{ cursor: "pointer" }}
      >
        X <Trans id="resources.form.filters.clear_all">Clear all filters</Trans>
      </Text>
    </div>
  );
};
