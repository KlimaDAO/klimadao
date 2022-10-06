import React, { FC, useEffect, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import {
  Text,
  Section,
  ButtonPrimary,
  Spinner,
} from "@klimadao/lib/components";

import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";
import { InputField, Checkbox } from "components/Form";
import { SortyByDropDown } from "../SortyByDropDown";

import { fetchCMSContent } from "lib/fetchCMSContent";
import {
  mainTags,
  subTags,
  documentTypes,
  TagSlug,
  DocumentType,
  SortQuery,
} from "../lib/cmsDataMap";

import * as styles from "./styles";
import { Document } from "lib/queries";

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

const queryCMSWithParams = async (values: FormValues): Promise<Document[]> => {
  const { tags, types, sortedBy } = values;

  // groq queries don´t understand undefined values, make sure to always pass values to the query params
  const typesWithFallback = types?.length ? types : ["post", "podcast"];
  const orderWithFallback = sortedBy || "publishedAt desc";

  // query with selected tags
  if (tags?.length) {
    const filteredDocuments = await fetchCMSContent("filterDocumentsByTags", {
      documentTypes: typesWithFallback,
      referenceTags: tags,
      orderBy: orderWithFallback,
    });

    return filteredDocuments;
  }

  // if no selected tags, query with selected types and sortyBy only
  const filteredDocuments = await fetchCMSContent(
    "filterDocumentsWithoutTags",
    {
      documentTypes: typesWithFallback,
      orderBy: orderWithFallback,
    }
  );

  return filteredDocuments;
};

export const ResourcesList: FC<Props> = (props) => {
  const [visibleDocuments, setVisibleDocuments] = useState<Document[] | null>(
    props.documents
  );
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, reset, setValue, control, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const hasDocuments = !isLoading && !!visibleDocuments?.length;
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
      const searchResult = await fetchCMSContent("searchByText", {
        searchQuery: values.search,
      });

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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
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
      const filteredDocuments = await queryCMSWithParams(values);
      if (filteredDocuments.length) {
        setVisibleDocuments(filteredDocuments);
      } else {
        setVisibleDocuments(null);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // https://react-hook-form.com/api/useform/watch
    const subscription = watch((value, { name }) => {
      if (name !== "search") {
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
                inputProps={{
                  placeholder: t({
                    id: "resources.form.input.search.placeholder",
                    message: "Search",
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
              <ButtonPrimary
                variant="icon"
                type="submit"
                className={styles.searchInputSubmit}
                label={<SearchIcon fontSize="large" />}
                onClick={handleSubmit(onSearchSubmit)}
              />
            </div>
          </form>
          <div className={styles.sortbyContainer}>
            <Text>
              <Trans id="resources.form.input.sort_by.header">Sort by:</Trans>
            </Text>
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
            <SortyByDropDown control={control} setValue={setValue} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.filtersContainer}>
            <div className={styles.filtersContainerInner}>
              <div className={styles.filtersHeader}>
                <Text t="h3">
                  <Trans id="resources.form.categories.header">
                    Categories
                  </Trans>
                </Text>
                <Text t="caption">
                  <Trans id="resources.form.categories.subheader">
                    Select one or more
                  </Trans>
                </Text>
              </div>
              <div className={styles.filtersCheckboxGroup}>
                {mainTags.map((tag) => (
                  <Checkbox
                    key={tag.id}
                    label={tag.label}
                    inputProps={{
                      id: tag.id,
                      value: tag.slug,
                      ...register("tags"),
                    }}
                  />
                ))}
              </div>
              <div>
                <Text t="h4">
                  <Trans id="resources.form.sub_topics.header">
                    Sub-topics
                  </Trans>
                </Text>
              </div>
              <div className={styles.filtersCheckboxGroup}>
                {subTags.map((tag) => (
                  <Checkbox
                    key={tag.id}
                    label={tag.label}
                    inputProps={{
                      id: tag.id,
                      value: tag.slug,
                      ...register("tags"),
                    }}
                  />
                ))}
              </div>
              <div>
                <Text t="h4">
                  <Trans id="resources.form.medium.header">Medium</Trans>
                </Text>
              </div>
              <div className={styles.filtersCheckboxGroup}>
                {documentTypes.map((type) => (
                  <Checkbox
                    key={type.type}
                    label={type.label}
                    inputProps={{
                      id: type.type,
                      value: type.type,
                      ...register("types"),
                    }}
                  />
                ))}
              </div>
              <Text
                t="caption"
                align="center"
                role="button"
                onClick={() => {
                  onResetFields();
                  resetDocuments();
                }}
                style={{ cursor: "pointer" }}
              >
                X{" "}
                <Trans id="resources.form.filters.clear_all">
                  Clear all filters
                </Trans>
              </Text>
            </div>
          </div>
          <div className={styles.listContainer}>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            {isEmptyResult && (
              <>
                <Text t="h4">
                  <Trans id="resources.page.list.no_search_results.title">
                    Sorry. We coudn't find any matching results.
                  </Trans>
                </Text>
                {wasTextSearch ? (
                  <Text>
                    <Trans id="resources.page.list.search_submit.no_search_results">
                      Double check your search for any typos or spelling errors
                      - or try a different search term.
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
    </Section>
  );
};
