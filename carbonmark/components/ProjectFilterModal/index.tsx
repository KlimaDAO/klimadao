import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "components/Text";
import { Modal, ModalProps } from "components/shared/Modal";
import { useFetchProjects } from "hooks/useFetchProjects";
import {
  FilterValues,
  defaultParams,
  useProjectsParams,
} from "hooks/useProjectsFilterParams";
import { urls } from "lib/constants";
import { Country } from "lib/types/carbonmark.types";
import { sortBy } from "lib/utils/array.utils";
import { isString, pick } from "lodash";
import { filter, map, pipe } from "lodash/fp";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
import { getCategoryFilters } from "./constants";
import * as styles from "./styles";

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

type FilterKeys = Pick<FilterValues, "country" | "category" | "vintage">;
const keys = ["country", "category", "vintage"] as const;

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const router = useRouter();
  const { data: projects = [], isValidating } = useFetchProjects();
  const { params, updateQueryParams, resetQueryParams } = useProjectsParams();

  // Set the default values and override with any existing url params
  const { control, reset, setValue, getValues } = useForm<FilterKeys>({
    defaultValues: pick(params, keys),
  });

  const watchers = useWatch({
    control,
    name: keys,
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

  useEffect(() => {
    if (!router.isReady || !props.showModal) return;
    updateQueryParams({
      ...router.query,
      ...getValues(),
    });
  }, [watchers]);

  useEffect(() => {
    if (!router.query || !props.showModal) return;
    const { category = [], country = [], vintage = [] } = router.query;
    setValue("category", isString(category) ? [category] : category);
    setValue("country", isString(country) ? [country] : country);
    setValue("vintage", isString(vintage) ? [vintage] : vintage);
  }, [props.showModal]);

  const resetFilters = () => {
    resetQueryParams();
    reset(defaultParams);
    props.onToggleModal?.();
  };

  const getAccordionSubtitle = (index: number) => {
    const count = watchers?.[index]?.length;
    return count > 0 ? `${count} Selected` : "";
  };

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <form>
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
          type="button"
          className="action"
          label={t`View Results`}
          disabled={isValidating}
          onClick={() => props.onToggleModal?.()}
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
            ? `${projects.length} ${
                projects.length === 1 ? t`Result` : t`Results`
              }`
            : t`Compiling Results ...`}
        </Text>
      </form>
    </Modal>
  );
};
