import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Modal, ModalProps } from "components/shared/Modal";
import { Text } from "components/Text";
import { useFetchProjects } from "hooks/useFetchProjects";
import { urls } from "lib/constants";
import { Country } from "lib/types/carbonmark";
import { sortBy } from "lib/utils/array.utils";
import { isString } from "lodash";
import { filter, map, pipe } from "lodash/fp";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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

  const { projects, isValidating } = useFetchProjects();

  // Set the default values and override with any existing url params
  const defaultValues = { ...DEFAULTS, ...router.query };

  const { control, reset, handleSubmit, setValue } = useForm<ModalFieldValues>({
    defaultValues,
  });

  const watchers = useWatch({
    control,
    name: ["country", "category", "vintage"],
  });

  /**
   * Because we're prefilling these queries in getStaticProps
   * the cache will return us the server fetched values
   * We're also disabling revalidation since the data doesn't change much
   */
  const { data: vintages = [], isLoading: vintagesLoading } = useSWRImmutable<
    string[]
  >(urls.api.vintages);
  const { data: countries = [], isLoading: countriesLoading } = useSWRImmutable<
    Country[]
  >(urls.api.countries);
  const { data: categories = [], isLoading: categoriesLoading } =
    useSWRImmutable<{ id: string }[]>(urls.api.categories);

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
    const query = search
      ? { ...values, search, sort: router.query.sort }
      : { ...values, sort: router.query.sort };
    router.replace(
      { query },
      undefined,
      { shallow: true } // don't refetch props nor reload page
    );
    if (!isValidating) {
      props.onToggleModal?.();
    }
  };

  const resetFilters = () => {
    reset(DEFAULTS);
    router.replace(
      { query: DEFAULTS },
      undefined,
      { shallow: true } // don't refetch props nor reload page
    );
    if (!isValidating) {
      props.onToggleModal?.();
    }
  };

  useEffect(() => {
    if (!router.query) return;
    const { category = [], country = [], vintage = [] } = router.query;
    setValue("category", isString(category) ? [category] : category);
    setValue("country", isString(country) ? [country] : country);
    setValue("vintage", isString(vintage) ? [vintage] : vintage);
  }, [router.query]);

  const getAccordionSubtitle = (index: number) => {
    const count = watchers?.[index]?.length;
    return count > 0 ? `${count} Selected` : "";
  };

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Disabled until data can be provided by APIs */}
        <Accordion
          label={t`Country`}
          subtitle={getAccordionSubtitle(0)}
          loading={countriesLoading}
        >
          <CheckboxGroup
            options={countryOptions}
            name="country"
            control={control}
          />
        </Accordion>
        <Accordion
          label={t`Category`}
          subtitle={getAccordionSubtitle(1)}
          loading={categoriesLoading}
        >
          <CheckboxGroup
            options={categoryOptions}
            name="category"
            control={control}
          />
        </Accordion>
        <Accordion
          label={t`Vintage`}
          subtitle={getAccordionSubtitle(2)}
          loading={vintagesLoading}
        >
          <CheckboxGroup
            options={vintageOptions}
            name="vintage"
            control={control}
          />
        </Accordion>
        <ButtonPrimary
          className="action"
          label={t`Apply`}
          type="submit"
          disabled={isValidating}
        />
        <ButtonSecondary
          variant="transparent"
          className="action"
          type="button"
          label={t`Clear Filters`}
          onClick={resetFilters}
        />
        <Text t="h5" align="center">
          {!isValidating
            ? `${projects.length} Results`
            : t`Compiling Results ...`}
        </Text>
      </form>
    </Modal>
  );
};
