import { cx } from "@emotion/css";
import { GridViewOutlined, ListOutlined } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import { LoginButton } from "components/LoginButton";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import { Text } from "components/Text";
import { Toggle } from "components/Toggle";
import { useFetchProjects } from "hooks/useFetchProjects";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectFilters } from "../ProjectFilters";
import { ProjectSearch } from "../ProjectSearch";
import { ProjectSort } from "../ProjectSort";
import * as styles from "./styles";

const ProjectsController = () => {
  const router = useRouter();
  const { params, updateQueryParams } = useProjectsParams();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { projects } = useFetchProjects();

  const toggleModal = () => setShowFilterModal((prev) => !prev);
  const isMap = params.layout === "map";

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
        <div className={styles.displayToggle}>
          <Toggle
            selected={params.layout}
            onChange={(val) => {
              updateQueryParams({ ...router.query, layout: val });
            }}
            options={[
              // @todo add tooltips
              // <TextInfoTooltip tooltip={t`Grid view`}>
              // </TextInfoTooltip>
              {
                content: <GridViewOutlined />,
                value: "grid",
              },
              {
                content: <ListOutlined />,
                value: "list",
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
    </div>
  );
};

export default ProjectsController;