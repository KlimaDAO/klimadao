import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { Dropdown } from "components/Dropdown";
import { Modal, ModalProps } from "components/shared/Modal";
// import Modal from "components/Modal";
import { omit } from "lodash";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { PROJECT_FILTERS, PROJECT_SORT_OPTIONS } from "./constants";
import * as styles from "./styles";

type ModalFieldValues = {
  countries: string[];
  categories: string[];
  vintages: string[];
  sort: SortOption;
};

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

const defaultValues: ModalFieldValues = {
  sort: "recently-updated",
  countries: [],
  categories: [],
  vintages: [],
};

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const { control, reset } = useForm<ModalFieldValues>({
    defaultValues,
  });

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <Dropdown
        name="sort"
        className="dropdown"
        default="recently-updated"
        control={control}
        options={Object.entries(PROJECT_SORT_OPTIONS).map(
          ([option, label]) => ({
            id: option,
            label: label,
            value: option,
          })
        )}
      />

      <Accordion label={t`Country`}>
        {/* @todo Extract available countries from projects data and add here */}
      </Accordion>
      <Accordion label={t`Category`}>
        <CheckboxGroup
          options={PROJECT_FILTERS.CATEGORIES}
          name="categories"
          control={control}
        />
      </Accordion>
      <Accordion label={t`Vintage`}>Content</Accordion>
      <ButtonPrimary className="action" label={t`Apply`} />
      <ButtonPrimary
        variant="transparent"
        className="action"
        label={t`Clear Filters`}
        onClick={() => reset(omit(defaultValues, "sort"))}
      />
    </Modal>
  );
};
