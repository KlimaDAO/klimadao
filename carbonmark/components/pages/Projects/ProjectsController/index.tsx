import AppsIcon from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/Public";
import { LoginButton } from "components/LoginButton";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { Text } from "components/Text";
import { Toggle } from "components/Toggle";
import { useFetchProjects } from "hooks/useFetchProjects";
import { useProjectsFilterParams } from "hooks/useProjectsFilterParams";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectFilters } from "../ProjectFilters";
import { ProjectSearch } from "../ProjectSearch";
import { ProjectSort } from "../ProjectSort";
import * as styles from "../styles";

const ProjectsController = () => {
  const router = useRouter();
  const isMap = router.pathname.endsWith("/projects/map");
  const { defaultValues } = useProjectsFilterParams();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { projects } = useFetchProjects();

  const toggleModal = () => setShowFilterModal((prev) => !prev);

  return (
    <>
      <div className={styles.projectsControls}>
        <ProjectSearch onFiltersClick={toggleModal} />
        <LoginButton className="desktopLogin" />
      </div>
      <ProjectFilters
        defaultValues={defaultValues}
        onMoreTextClick={toggleModal}
      />
      <div className={styles.displayOptions}>
        {/* Hide the sort on MapView */}
        {!isMap && <ProjectSort />}

        {!!projects?.length && !isMap && (
          <Text t="h5">{projects.length} Results</Text>
        )}
        <div className={styles.displayToggle}>
          <Toggle
            selected={isMap ? "map" : "grid"}
            onChange={(val) => {
              if (val === "map")
                router.push({
                  pathname: "/projects/map",
                  query: router.query,
                });
              else if (val === "grid")
                router.push({
                  pathname: "/projects",
                  query: router.query,
                });
            }}
            options={[
              {
                content: <AppsIcon />,
                value: "grid",
              },
              {
                content: <PublicIcon />,
                value: "map",
              },
            ]}
          />
        </div>
      </div>
      <ProjectFilterModal
        showModal={showFilterModal}
        onToggleModal={toggleModal}
        closeOnBackgroundClick
      />
    </>
  );
};

export default ProjectsController;
