import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import TuneIcon from "@mui/icons-material/Tune";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { SearchInput } from "components/SearchInput";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import * as styles from "./styles";

type ProjectSearchProps = HTMLAttributes<HTMLDivElement> & {
  onFiltersClick: () => void;
};

export const ProjectSearch: FC<ProjectSearchProps> = (props) => {
  const router = useRouter();
  const { filterCount, updateQueryParams, resetQueryParams } =
    useProjectsParams();

  const handleSubmitSearch = (search: string | null) => {
    const { search: _oldSearch, ...otherParams } = router.query;
    updateQueryParams(search ? { ...otherParams, search } : otherParams);
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
            <Trans>Filters {filterCount > 0 ? `(${filterCount})` : ""}</Trans>
          </span>
        }
      />
      {filterCount > 0 && (
        <ButtonSecondary
          variant="lightGray"
          label={t`Clear Filters`}
          onClick={resetQueryParams}
          className={styles.resetFilterButton}
        />
      )}
    </div>
  );
};
