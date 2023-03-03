import { Trans } from "@lingui/macro";
import ClearIcon from "@mui/icons-material/ClearRounded";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { Text } from "components/Text";
import { FC } from "react";
import { Control } from "react-hook-form";
import { getMainTags } from "../lib/cmsDataMap";
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
        <Text t="h4">
          <Trans id="resources.form.categories.header">Categories</Trans>
        </Text>
        <Text t="body2">
          <Trans id="resources.form.categories.subheader">
            Select one or more
          </Trans>
        </Text>
      </div>
      <div className={styles.filtersCheckboxGroup}>
        <CheckboxGroup<FormValues>
          options={getMainTags()}
          name="tags"
          control={props.control}
        />
      </div>
      <ButtonPrimary
        icon={<ClearIcon />}
        label={<Trans id="resources.form.filters.clear_all">Clear All</Trans>}
        onClick={props.onResetFilters}
        className={styles.clearAllButton}
      />
    </div>
  );
};
