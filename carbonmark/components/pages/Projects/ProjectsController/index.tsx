import { t } from "@lingui/macro";
import AppsIcon from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/Public";
import { Dropdown } from "components/Dropdown";
import { LoginButton } from "components/LoginButton";
import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { Text } from "components/Text";
import { Toggle } from "components/Toggle";
import { useFetchProjects } from "hooks/useFetchProjects";
import {
  FilterValues,
  SortOption,
  useProjectsFilterParams,
} from "hooks/useProjectsFilterParams";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ProjectFilters } from "../ProjectFilters";
import { ProjectSearch } from "../ProjectSearch";
import * as styles from "../styles";

const ProjectsController = () => {
  const router = useRouter();
  const isMap = router.pathname.endsWith("/projects/map");
  const { defaultValues, sortValue, updateQueryParams } =
    useProjectsFilterParams();
  const [_, setShowFilterModal] = useState(false);
  const { projects } = useFetchProjects();
  const { control, setValue } = useForm<FilterValues>({ defaultValues });

  const sort = useWatch({ control, name: "sort" });

  const toggleModal = () => setShowFilterModal((prev) => !prev);

  useEffect(() => {
    if (!sortValue) return;
    setValue("sort", sortValue as SortOption);
  }, [sortValue]);

  useEffect(() => {
    if (!sort || !router.isReady) return;
    updateQueryParams({ ...router.query, sort });
  }, [sort]);
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
        <Dropdown
          key={sort}
          name="sort"
          initial={sort ?? "recently-updated"}
          className={styles.dropdown}
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
        {!!projects?.length && <Text t="h5">{projects.length} Results</Text>}
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
    </>
  );
};

export default ProjectsController;
