import React, { FC, useEffect, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";

import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";
import { InputField, Checkbox } from "components/Form";

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

type FormValues = {
  search: string;
  tags: TagSlug[] | [];
  types: DocumentType[] | [];
  sortedBy: SortQuery | string;
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

  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues,
  });

  const selectedTags = watch("tags");
  const selectedTypes = watch("types");
  const selectedSortedBy = watch("sortedBy");

  const onReset = (fields = defaultValues as Partial<FormValues>) => {
    reset({ ...fields });
  };

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    // reset list to default documents on empty string
    if (!values.search) {
      setVisibleDocuments(props.documents);
      // remove all field values
      onReset();
      return;
    }

    try {
      const searchResult = await fetchCMSContent("searchByText", {
        searchQuery: values.search,
      });

      // remove all filters and sortBy as search results do not take filters into account and are sorted by relevance
      // but keep current search term
      onReset({
        tags: [],
        types: [],
        sortedBy: "",
      });

      if (searchResult.length) {
        setVisibleDocuments(searchResult);
      } else {
        setVisibleDocuments(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterDocuments = async () => {
    const types = selectedTypes.length ? selectedTypes : ["post", "podcast"];
    const orderSelect = selectedSortedBy || "publishedAt desc";

    if (selectedTags?.length) {
      try {
        const filteredDocuments = await fetchCMSContent(
          "filterDocumentsByTags",
          {
            documentTypes: types,
            referenceTags: selectedTags,
            orderBy: orderSelect,
          }
        );
        if (filteredDocuments.length) {
          setVisibleDocuments(filteredDocuments);
        } else {
          setVisibleDocuments(null);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const filteredDocuments = await fetchCMSContent(
          "filterDocumentsWithoutTags",
          {
            documentTypes: types,
            orderBy: orderSelect,
          }
        );
        if (filteredDocuments.length) {
          setVisibleDocuments(filteredDocuments);
        } else {
          setVisibleDocuments(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (selectedTags?.length || selectedTypes?.length || selectedSortedBy) {
      filterDocuments();
    }
  }, [selectedTags, selectedTypes, selectedSortedBy]);

  return (
    <Section variant="gray">
      <div className={styles.resourcesListContainer}>
        <Text t="h2">
          <Trans id="resources.page.list.header">Explore All</Trans>
        </Text>
        <div className={styles.inputsContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
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
                onClick={() => onReset()}
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
            {!visibleDocuments && (
              <>
                <Text t="h4">
                  <Trans id="resources.page.list.no_search_results.title">
                    Sorry. We coudn't find any matching results.
                  </Trans>
                </Text>
                <Text>
                  <Trans id="resources.page.list.no_search_results.subline">
                    Double check your search for any typos or spelling errors -
                    or try a different search term.
                  </Trans>
                </Text>
              </>
            )}
            {!!visibleDocuments?.length && (
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
