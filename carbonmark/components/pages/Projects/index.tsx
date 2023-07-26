import { cx } from "@emotion/css";
import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { GridViewOutlined, ListOutlined } from "@mui/icons-material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Dropdown } from "components/Dropdown";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectsController } from "components/pages/Project/ProjectsController";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import {
  PROJECT_SORT_FNS,
  PROJECT_SORT_OPTIONS,
} from "components/ProjectFilterModal/constants";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { useFetchProjects } from "hooks/useFetchProjects";
import {
  FilterValues,
  SortOption,
  useProjectsFilterParams,
} from "hooks/useProjectsFilterParams";
import { urls } from "lib/constants";
import { get, identity, isEmpty } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { SWRConfig } from "swr";
import { ProjectFilters } from "../Project/ProjectFilters";
import { GridView } from "../Project/ProjectView/GridView";
import { ListView } from "../Project/ProjectView/ListView";
import * as styles from "./styles";

const Page: NextPage = () => {
  const router = useRouter();
  const [toggleViewMode, setToggleViewMode] = useState("grid");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { sortValue, updateQueryParams, defaultValues } =
    useProjectsFilterParams();
  const { projects, isLoading, isValidating } = useFetchProjects();
  const { control, setValue } = useForm<FilterValues>({ defaultValues });

  const sort = useWatch({ control, name: "sort" });
  const sortFn = get(PROJECT_SORT_FNS, sort) ?? identity;
  const sortedProjects = sortFn(projects);

  const toggleModal = () => setShowFilterModal((prev) => !prev);

  // only show the spinner when there are no cached results to show
  // when re-doing a search with cached results, this will be false -> results are shown, and the query runs in the background
  const showLoadingProjectsSpinner =
    isEmpty(sortedProjects) && (isLoading || isValidating);

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
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout>
        <div className={styles.projectsControls}>
          <ProjectsController onFiltersClick={toggleModal} />
          <LoginButton className="desktopLogin" />
        </div>
        <ProjectFilters
          defaultValues={defaultValues}
          onMoreTextClick={toggleModal}
        />
        <div className={styles.row}>
          <div className={styles.sortOptions}>
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
            {!!projects?.length && (
              <Text t="h5">{projects.length} Results</Text>
            )}
          </div>
          <div className={styles.viewToggle}>
            <TextInfoTooltip tooltip={t`Grid view`}>
              <div>
                <ButtonPrimary
                  icon={<GridViewOutlined />}
                  onClick={() => setToggleViewMode("grid")}
                  className={cx({ selected: toggleViewMode === "grid" })}
                />
              </div>
            </TextInfoTooltip>
            <TextInfoTooltip tooltip={t`List view`}>
              <div>
                <ButtonPrimary
                  icon={<ListOutlined />}
                  onClick={() => setToggleViewMode("list")}
                  className={cx({ selected: toggleViewMode === "list" })}
                />
              </div>
            </TextInfoTooltip>
          </div>
        </div>
        <div className={styles.projectsList}>
          {!sortedProjects?.length && !isValidating && !isLoading && (
            <Text>No projects found from Carbonmark API</Text>
          )}
          {showLoadingProjectsSpinner && <SpinnerWithLabel />}
          {toggleViewMode === "grid" ? (
            <GridView projects={sortedProjects} />
          ) : (
            <ListView projects={sortedProjects} />
          )}
        </div>
        <ProjectFilterModal
          showModal={showFilterModal}
          onToggleModal={toggleModal}
          closeOnBackgroundClick
        />
      </Layout>
    </>
  );
};

export const Projects: NextPage<ProjectsPageStaticProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      // Prefill our API responses with server side fetched data
      // see: https://swr.vercel.app/docs/with-nextjs#pre-rendering-with-default-data
      fallback: {
        [urls.api.projects]: props.projects,
        [urls.api.vintages]: props.vintages,
        [urls.api.categories]: props.categories,
        [urls.api.countries]: props.countries,
      },
    }}
  >
    <Page />
  </SWRConfig>
);
