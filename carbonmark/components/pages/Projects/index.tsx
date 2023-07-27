import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Dropdown } from "components/Dropdown";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectFilterModal } from "components/ProjectFilterModal";
import {
  PROJECT_SORT_FNS,
  PROJECT_SORT_OPTIONS,
} from "components/ProjectFilterModal/constants";
import { ProjectImage } from "components/ProjectImage";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { useFetchProjects } from "hooks/useFetchProjects";
import {
  FilterValues,
  SortOption,
  useProjectsFilterParams,
} from "hooks/useProjectsFilterParams";
import { urls } from "lib/constants";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { CategoryName, Methodology } from "lib/types/carbonmark";
import { get, identity, isEmpty } from "lodash";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { SWRConfig } from "swr";
import { ProjectFilters } from "../Project/ProjectFilters";
import { ProjectsController } from "../Project/ProjectsController";
import * as styles from "./styles";

const Page: NextPage = () => {
  const router = useRouter();
  const { sortValue, updateQueryParams, defaultValues } =
    useProjectsFilterParams();
  const [showFilterModal, setShowFilterModal] = useState(false);
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
          {!!projects?.length && <Text t="h5">{projects.length} Results</Text>}
        </div>
        <div className={styles.projectsList}>
          {!sortedProjects?.length && !isValidating && !isLoading && (
            <Text>No projects found from Carbonmark API</Text>
          )}
          {showLoadingProjectsSpinner && <SpinnerWithLabel />}
          {sortedProjects?.map((project, index) => (
            <Link
              key={project.key + "-" + index}
              href={createProjectLink(project)}
              passHref
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <ProjectImage category={getCategoryFromProject(project)} />
              </div>
              <div className={styles.cardContent}>
                <Text t="h4">
                  {formatToPrice(project.price, router.locale)}
                </Text>
                <Text t="h5">{project.name || "! MISSING PROJECT NAME !"}</Text>
                <Text t="body1" className={styles.cardDescription}>
                  {project.short_description ||
                    project.description ||
                    t`No project description found`}
                </Text>
                <div className={styles.tags}>
                  <Vintage vintage={project.vintage} />
                  {project?.methodologies?.length > 1 ? (
                    project.methodologies.map(
                      (methodology: Methodology, index) => (
                        <Category
                          key={`${methodology?.id}-${index}`}
                          category={methodology?.category as CategoryName}
                        />
                      )
                    )
                  ) : (
                    <Category category={getCategoryFromProject(project)} />
                  )}
                </div>
              </div>
            </Link>
          ))}
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
