import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import TuneIcon from "@mui/icons-material/Tune";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { SearchInput } from "components/SearchInput";
import { defaultFilterProps } from "hooks/useProjectsFilterParams";
import { flatMap, omit } from "lodash";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import * as styles from "./styles";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement> & {
  onFiltersClick: () => void;
};

export const ProjectsController: FC<ProjectControllerProps> = (props) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    setFilterCount(flatMap(omit(router.query, ["search", "sort"]))?.length);
  }, [router.query]);

  const handleSubmitSearch = (str: string | null) => {
    const { search: _oldSearch, ...otherParams } = router.query;
    // If the search box is cleared, remove the param entirely
    const query = str ? { ...otherParams, search: str } : otherParams;
    router.replace(
      { query },
      undefined,
      { shallow: true } // don't refetch props nor reload page
    );
  };

  const handleResetFilters = () => {
    router.replace({ query: defaultFilterProps }, undefined, { shallow: true });
  };

  return (
    <div className={cx(styles.projectsController, props.className)}>
      <SearchInput
        id="projects-search-input"
        label="project search"
        placeholder="Search for a project"
        onSubmit={handleSubmitSearch}
        initialValue={
          typeof router.query.search === "string" && !!router.query.search
            ? router.query.search
            : undefined
        }
      />
      <ButtonPrimary
        onClick={props.onFiltersClick}
        className={styles.filterButton}
        icon={<TuneIcon />}
        label={
          <span>
            <Trans>Filters</Trans> {filterCount > 0 ? `(${filterCount})` : ""}
          </span>
        }
      />
      {filterCount > 0 && (
        <ButtonSecondary
          variant="lightGray"
          label={t`Clear Filters`}
          onClick={handleResetFilters}
          className={styles.resetFilterButton}
        />
      )}
    </div>
  );
};
