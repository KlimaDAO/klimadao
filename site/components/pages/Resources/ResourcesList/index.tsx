import {
  ButtonPrimary,
  Section,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Card } from "components/Card";
import { InputField } from "components/Form";
import { Modal } from "components/Modal";
import { PodcastCard } from "components/PodcastCard";
import { ResourcesFilters } from "../ResourcesFilters";
import { SortByButton } from "../SortByButton";
import { SortyByDropDown } from "../SortyByDropDown";

import {
  DocumentType,
  sortedByQueries,
  SortQuery,
  TagSlug,
} from "../lib/cmsDataMap";
import { queryFilteredDocuments, searchDocumentsByText } from "../lib/queries";

import { Document } from "lib/queries";
import * as styles from "./styles";

export interface Props {
  documents: Document[];
}

export type FormValues = {
  search: string;
  tags: TagSlug[];
  types: DocumentType[];
  sortedBy: SortQuery | "";
};

const defaultValues: FormValues = {
  search: "",
  tags: [],
  types: [],
  sortedBy: "",
};

export const ResourcesList: FC<Props> = (props) => {
  const [visibleDocuments, setVisibleDocuments] = useState<Document[] | null>(
    props.documents
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const { register, handleSubmit, watch, reset, setValue, control, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const hasError = !isLoading && isError;
  const hasDocuments = !isLoading && !hasError && !!visibleDocuments?.length;
  const isEmptyResult = !isLoading && !visibleDocuments;
  const wasTextSearch = !!getValues().search;

  const onResetFields = (fields = defaultValues as Partial<FormValues>) => {
    reset({ ...fields });
  };

  const resetDocuments = () => setVisibleDocuments(props.documents);

  const onSearchSubmit: SubmitHandler<FormValues> = async (
    values: FormValues
  ) => {
    // reset list to default documents on empty string
    if (!values.search) {
      resetDocuments();
      // remove all field values
      onResetFields();
      return;
    }

    try {
      setIsLoading(true);

      const searchResult = await searchDocumentsByText(values.search);

      // remove all filters and sortBy as search results do not take filters into account and are sorted by relevance
      // but don't delete current search term in input field
      onResetFields({
        tags: defaultValues.tags,
        types: defaultValues.types,
        sortedBy: defaultValues.sortedBy,
      });

      if (searchResult.length) {
        setVisibleDocuments(searchResult);
      } else {
        setVisibleDocuments(null);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  const filterDocuments = async (values: FormValues) => {
    const { tags, types, sortedBy } = values;

    const isInputReset = !tags?.length && !types?.length && !sortedBy;

    // all tags and sortedBy values have been unchecked
    // let's reset the view to initial state
    if (isInputReset) {
      resetDocuments();
      return;
    }

    setIsLoading(true);

    // query with input values
    try {
      const filteredDocuments = await queryFilteredDocuments(values);
      if (filteredDocuments.length) {
        setVisibleDocuments(filteredDocuments);
      } else {
        setVisibleDocuments(null);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // https://react-hook-form.com/api/useform/watch
    const subscription = watch((value, { name }) => {
      setIsError(false);

      if (!!name && name !== "search") {
        // reset text in search input as it is not taken into account for filterable documents
        !!value.search && reset({ search: defaultValues.search });
        filterDocuments(value as FormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Section variant="gray">
      <div className={styles.resourcesListContainer}>
        <Text t="h2">
          <Trans id="resources.page.list.header">Explore All</Trans>
        </Text>
        <div className={styles.inputsContainer}>
          <form onSubmit={handleSubmit(onSearchSubmit)}>
            <div className={styles.searchInputContainer}>
              <InputField
                id="search"
                icon={<SearchIcon fontSize="large" />}
                inputProps={{
                  placeholder: t({
                    id: "resources.form.input.search.placeholder",
                    message: "Search...",
                  }),
                  type: "search",
                  autoComplete: "off",
                  className: styles.searchInput,
                  ...register("search"),
                }}
                label={t({
                  id: "resources.form.input.search.label",
                  message: "Search",
                })}
                hideLabel
              />
            </div>
          </form>
          <div className={styles.sortbyContainer}>
            <ButtonPrimary
              type="submit"
              variant="gray"
              className={styles.toggleMobileModalButton}
              icon={<FormatListBulletedIcon fontSize="large" />}
              onClick={() => setShowMobileModal(true)}
            />

            <div className={styles.sortBySelectContainer}>
              <InputField
                id="sortedBy"
                inputProps={{
                  type: "hidden",
                  ...register("sortedBy"),
                }}
                hideLabel
                label={t({
                  id: "resources.form.input.sort_by.label",
                  message: "Sort by",
                })}
              />
              <Text t="body4">
                <Trans id="shared.resources.sort_by.header">Sort by:</Trans>
              </Text>
              <SortyByDropDown control={control} setValue={setValue} />
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.filtersContainer}>
            <ResourcesFilters
              control={control}
              onResetFilters={() => {
                resetDocuments();
                onResetFields();
              }}
            />
          </div>
          <div className={styles.listContainer}>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            {hasError && (
              <Text t="h4">
                <Trans id="resources.page.list.on_fetch_error">
                  Sorry! Something went wrong.
                </Trans>
              </Text>
            )}
            {isEmptyResult && (
              <>
                <Text t="h4">
                  <Trans id="resources.page.list.no_search_results.title">
                    Sorry. We couldn't find any matching results.
                  </Trans>
                </Text>
                {wasTextSearch ? (
                  <Text>
                    <Trans id="resources.page.list.search_submit.no_search_results">
                      Check your search for typos or try a different search
                      term.
                    </Trans>
                  </Text>
                ) : (
                  <Text>
                    <Trans id="resources.page.list.search_submit.no_filter_results">
                      Please use a different filter combination.
                    </Trans>
                  </Text>
                )}
              </>
            )}
            {hasDocuments && (
              <div className={styles.list}>
                {visibleDocuments.map((doc) => {
                  if (doc.type === "post") {
                    return <Card key={doc.slug} post={doc} />;
                  }
                  return <PodcastCard podcast={doc} key={doc.slug} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={t({
          id: "resources.mobile_modal.title",
          message: "Sort By",
        })}
        showModal={showMobileModal}
        onToggleModal={() => setShowMobileModal((prev) => !prev)}
      >
        <div className={styles.sortByButtons}>
          {sortedByQueries.map((option) => (
            <SortByButton
              key={option.id}
              label={option.label}
              onClick={() => setValue("sortedBy", option.value)}
              active={getValues().sortedBy === option.value}
            />
          ))}
        </div>
        <ResourcesFilters
          control={control}
          onResetFilters={() => {
            resetDocuments();
            onResetFields();
          }}
        />
        <ButtonPrimary
          className={styles.showResultsButton}
          label={
            <Trans id="resources.mobile_modal.button.show_results">
              Show Results
            </Trans>
          }
          onClick={() => setShowMobileModal(false)}
        />
      </Modal>
    </Section>
  );
};
