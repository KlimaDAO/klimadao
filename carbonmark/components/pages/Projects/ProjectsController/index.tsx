import { cx } from "@emotion/css";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useGetProjects } from "carbonmark-api-sdk";
import { LoginButton } from "components/LoginButton";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { Text } from "components/Text";
import { Toggle } from "components/Toggle";
import { FilterValues, useProjectsParams } from "hooks/useProjectsFilterParams";
import { useResponsive } from "hooks/useResponsive";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectFilters } from "../ProjectFilters";
import { ProjectSearch } from "../ProjectSearch";
import { ProjectSort } from "../ProjectSort";
import * as styles from "./styles";

const ProjectsController = () => {
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { params, updateQueryParams } = useProjectsParams();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { data: projects = [] } = useGetProjects();

  const toggleModal = () => setShowFilterModal((prev) => !prev);
  const isMap = params.layout === "map";

  const viewOptions = [
    {
      content: <GridViewOutlinedIcon />,
      value: "grid",
      tooltip: "Grid view",
    },
    {
      content: <MapOutlinedIcon />,
      value: "map",
      tooltip: "Map view",
    },
  ];

  // If we're on desktop let the user select the list view
  if (isDesktop)
    viewOptions.splice(1, 0, {
      content: <ListOutlinedIcon />,
      value: "list",
      tooltip: "List view",
    });

  return (
    <div className={cx(styles.controller, { [styles.absolute]: isMap })}>
      <div className={styles.projectsControls}>
        <ProjectSearch onFiltersClick={toggleModal} />
        <LoginButton className="desktopLogin" />
      </div>
      <ProjectFilters defaultValues={params} onMoreTextClick={toggleModal} />
      <div className={styles.displayOptions}>
        {/* Hide the sort on MapView */}
        {!isMap && <ProjectSort />}

        {!isEmpty(projects) && !isMap && (
          <Text t="h5">{projects.length} Results</Text>
        )}
        <Toggle
          className={styles.toggle}
          selected={params.layout}
          onChange={(val) => {
            updateQueryParams({
              ...router.query,
              layout: val as FilterValues["layout"],
            });
          }}
          options={viewOptions}
        />
      </div>
      <ProjectFilterModal
        showModal={showFilterModal}
        onToggleModal={toggleModal}
        closeOnBackgroundClick
      />
    </div>
  );
};

export default ProjectsController;
