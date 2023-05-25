import { t } from "@lingui/macro";
import { Dropdown } from "components/Dropdown";
import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { Text } from "components/Text";
import { useFetchProjects } from "hooks/useFetchProjects";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as styles from "./styles";

type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

type ModalFieldValues = {
  sort: SortOption;
};

const DEFAULTS: ModalFieldValues = {
  sort: "recently-updated",
};

export const SortOptions = () => {
  const router = useRouter();
  const { projects } = useFetchProjects();
  const initialSort = router.query.sort ? String(router.query.sort) : undefined;

  const defaultValues = { ...DEFAULTS, ...router.query };
  const { control, getValues } = useForm<ModalFieldValues>({
    defaultValues,
  });

  const onSubmit = () => {
    const values = getValues();
    const { search } = router.query;
    const query = search ? { search, ...values } : values;
    router.replace(
      { query },
      undefined,
      { shallow: true } // don't refetch props nor reload page
    );
  };

  return (
    <>
      <Dropdown
        name="sort"
        initial={initialSort ?? "recently-updated"}
        className={styles.dropdown}
        onChange={onSubmit}
        aria-label={t`Toggle sort menu`}
        renderLabel={(selected) => `Sort: ${selected?.label}`}
        control={control}
        options={Object.entries(PROJECT_SORT_OPTIONS).map(
          ([option, label]) => ({
            id: option,
            label: label,
            value: option,
          })
        )}
      />
      <Text t="h5">{projects.length} Results</Text>
    </>
  );
};
