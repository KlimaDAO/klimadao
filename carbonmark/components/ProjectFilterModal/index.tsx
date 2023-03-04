import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Dropdown } from "components/Dropdown";
import { Modal, ModalProps } from "components/shared/Modal";
import { Country } from "lib/types/carbonmark";
import { sortBy } from "lib/utils/array.utils";
import { omit } from "lodash";
import { filter, map, pipe } from "lodash/fp";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
import { getCategoryFilters, PROJECT_SORT_OPTIONS } from "./constants";
import * as styles from "./styles";

type ModalFieldValues = {
  country: string[];
  category: string[];
  vintage: string[];
  sort: SortOption;
};

const DEFAULTS: ModalFieldValues = {
  sort: "recently-updated",
  country: [],
  category: [],
  vintage: [],
};

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const router = useRouter();

  //Set the default values and override with any existing url params
  const defaultValues = { ...DEFAULTS, ...router.query };

  const { control, reset, handleSubmit } = useForm<ModalFieldValues>({
    defaultValues,
  });

  /**
   * Because we're prefilling these queries in getStaticProps
   * the cache will return us the server fetched values
   * We're also disabling revalidation since the data doesn't change much
   */
  const { data: vintages = [], isLoading: vintagesLoading } =
    useSWRImmutable<string[]>("/api/vintages");
  const { data: countries = [], isLoading: countriesLoading } =
    useSWRImmutable<Country[]>("/api/countries");
  const { data: categories = [], isLoading: categoriesLoading } =
    useSWRImmutable<{ id: string }[]>("/api/categories");

  /**
   * @todo Not great. We need end to end typing to ensure that if the key values
   * change server side then our build fails
   */
  const categoryOptions = pipe(
    sortBy<CheckboxOption>("value"),
    /** @note because the API is returning trailing empty spaces on some categories, trim them here */
    filter((cat) => categories.map(({ id }) => id.trim()).includes(cat.value))
  )(getCategoryFilters().CATEGORIES);

  const countryOptions: CheckboxOption[] = pipe(
    sortBy<Country>("id"),
    map(({ id }) => ({
      label: id,
      value: id,
      id,
    }))
  )(countries);

  const vintageOptions: CheckboxOption[] = vintages.sort().map((vintage) => ({
    label: vintage,
    id: vintage,
    value: vintage,
  }));

  const onSubmit = (values: ModalFieldValues) => {
    const { search } = router.query;
    // Maintain any search value
    const query = search ? { search, ...values } : values;
    router.replace(
      { query },
      undefined,
      { shallow: true } // don't refetch props nor reload page
    );
    //Close the modal on submit
    props.onToggleModal?.();
  };

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown
          name="sort"
          className="dropdown"
          aria-label={t`Toggle sort menu`}
          renderLabel={(selected) => `Sort By: ${selected?.label}`}
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
        <Accordion label={t`Country`} loading={countriesLoading}>
          <CheckboxGroup
            options={countryOptions}
            name="country"
            control={control}
          />
        </Accordion>
        <Accordion label={t`Category`} loading={categoriesLoading}>
          <CheckboxGroup
            options={categoryOptions}
            name="category"
            control={control}
          />
        </Accordion>
        <Accordion label={t`Vintage`} loading={vintagesLoading}>
          <CheckboxGroup
            options={vintageOptions}
            name="vintage"
            control={control}
          />
        </Accordion>
        <ButtonPrimary className="action" label={t`Apply`} type="submit" />
        <ButtonSecondary
          variant="transparent"
          className="action"
          type="submit"
          label={t`Clear Filters`}
          onClick={() => reset(omit(DEFAULTS, "sort"))}
        />
      </form>
    </Modal>
  );
};
