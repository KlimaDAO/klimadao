import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Dropdown } from "components/Dropdown";
import { Modal, ModalProps } from "components/shared/Modal";
import { omit } from "lodash";
import { FC } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
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
type FetchArgs = [input: RequestInfo | URL, init?: RequestInit];
const fetcher = (...args: FetchArgs) =>
  fetch(...args).then((res) => res.json());

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const { control, reset } = useForm<ModalFieldValues>({
    defaultValues,
  });

  const { data: vintages = [], isLoading: vintagesLoading } = useSWR<string[]>(
    "/api/vintages",
    fetcher
  );

  const { data: categories = [], isLoading: categoriesLoading } = useSWR<
    {
      id: string;
    }[]
  >("/api/categories", fetcher);

  /** @todo Not great. We need end to end typing to ensure that if the key values change server side then our build fails  */
  const categoryOptions = PROJECT_FILTERS.CATEGORIES.filter((cat) =>
    categories.map(({ id }) => id).includes(cat.value)
  );

  const vintageOptions: CheckboxOption[] = vintages.map((vintage) => ({
    label: vintage,
    id: vintage,
    value: vintage,
  }));

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
      {/* Disabled until data can be provided by APIs */}
      {/* <Accordion label={t`Country`}>
          <CheckboxGroup
            options={countryOptions}
            name="countries"
            control={control}
          />
      </Accordion> */}
      <Accordion label={t`Category`} loading={categoriesLoading}>
        <CheckboxGroup
          options={categoryOptions}
          name="categories"
          control={control}
        />
      </Accordion>
      <Accordion label={t`Vintage`} loading={vintagesLoading}>
        <CheckboxGroup
          options={vintageOptions}
          name="vintages"
          control={control}
        />
      </Accordion>
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
