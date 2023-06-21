import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import TuneIcon from "@mui/icons-material/Tune";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import { DEFAULTS } from "components/pages/Projects";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { SearchInput } from "components/SearchInput";
import { flatMap, omit } from "lodash";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import * as styles from "./styles";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement> & {
  selectedFilters?: (filters: Array<string>) => void;
};

export const ProjectsController: FC<ProjectControllerProps> = ({
  selectedFilters,
  ...props
}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    console.log("router.query", router.query);
    setSelectedCount(flatMap(omit(router.query, "sort"))?.length);
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
    router.replace({ query: DEFAULTS }, undefined, { shallow: true });
  };

  const toggleModal = () => setModalOpen((prev) => !prev);

  const onSelected = (filters: Array<Array<string>>) => {
    selectedFilters?.(filters.flat());
    setSelectedCount(
      filters.reduce(
        (count: number, current: Array<string>) => count + current.length,
        0
      )
    );
  };

  return (
    <div {...props} className={cx(styles.projectsController, props.className)}>
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
        className={styles.filterButton}
        icon={<TuneIcon />}
        onClick={toggleModal}
        label={
          <span>Filters {selectedCount > 0 ? `(${selectedCount})` : ""}</span>
        }
      />
      <ButtonSecondary
        variant="lightGray"
        label={t`Clear Filters`}
        onClick={handleResetFilters}
        className={styles.resetFilterButton}
      />
      <ProjectFilterModal
        showModal={modalOpen}
        onToggleModal={toggleModal}
        selectedFilters={onSelected}
        closeOnBackgroundClick
      />
    </div>
  );
};
