import { cx } from "@emotion/css";
import TuneIcon from "@mui/icons-material/Tune";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { SearchInput } from "components/SearchInput";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useState } from "react";
import * as styles from "./styles";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement>;

export const ProjectsController: FC<ProjectControllerProps> = (props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

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

  const toggleModal = () => setModalOpen((prev) => !prev);
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
        label={<span>Filters</span>}
      />
      <ProjectFilterModal
        showModal={modalOpen}
        onToggleModal={toggleModal}
        closeOnBackgroundClick
      />
    </div>
  );
};
