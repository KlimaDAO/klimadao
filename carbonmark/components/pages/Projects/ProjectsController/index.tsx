import { cx } from "@emotion/css";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { Toggle } from "components/Toggle";
import { ProjectsProps } from "hooks/useFetchProjects";
import { FilterValues, useProjectsParams } from "hooks/useProjectsFilterParams";
import { useResponsive } from "hooks/useResponsive";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ProjectFilters } from "../ProjectFilters";
import { ProjectSearch } from "../ProjectSearch";
import { ProjectSort } from "../ProjectSort";
import * as styles from "./styles";

const ProjectsController: FC<ProjectsProps> = (props) => {
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { params, updateQueryParams } = useProjectsParams();
  const [showFilterModal, setShowFilterModal] = useState(false);

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
    <div>
      <div>
        <div className={cx(styles.controller)}>
          <div>
            <ProjectSearch onFiltersClick={toggleModal} />
          </div>
          {/* {!isEmpty(props.projects) && !isMap && (
        <Text t="h5">{props.projects.length} Results</Text>
      )} */}
          <div className={styles.displayOptions}>
            {/* Hide the sort on MapView */}
            {!isMap && <ProjectSort />}
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
            {...props}
            showModal={showFilterModal}
            onToggleModal={toggleModal}
            closeOnBackgroundClick
          />
        </div>
        <ProjectFilters defaultValues={params} onMoreTextClick={toggleModal} />
      </div>
    </div>
  );
};

export default ProjectsController;
