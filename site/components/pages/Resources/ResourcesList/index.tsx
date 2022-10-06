import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";

import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";
import { InputField } from "components/Form";

import { fetchCMSContent } from "lib/fetchCMSContent";

import * as styles from "./styles";
import { Document } from "lib/queries";

export interface Props {
  documents: Document[];
}

type FormValues = {
  search: string;
};

export const ResourcesList: FC<Props> = (props) => {
  const [visibleDocuments, setVisibleDocuments] = useState<Document[] | null>(
    props.documents
  );

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    // reset list to default documents on empty string
    if (!values.search) {
      setVisibleDocuments(props.documents);
      return;
    }

    try {
      const searchResult = await fetchCMSContent("searchByText", {
        searchQuery: values.search,
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

  return (
    <Section variant="gray">
      <div className={styles.listContainer}>
        <Text t="h2">
          <Trans id="resources.page.list.header">Explore All</Trans>
        </Text>
        <form
          className={styles.inputsContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              ...register("search", {
                required: {
                  value: false,
                  message: "resources.form.input.search.error.required",
                },
              }),
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
        </form>
        {!visibleDocuments && (
          <>
            <Text t="h4">
              <Trans id="resources.page.list.no_search_results.title">
                Sorry. We coudn't find any matching results.
              </Trans>
            </Text>
            <Text>
              <Trans id="resources.page.list.no_search_results.subline">
                Double check your search for any typos or spelling errors - or
                try a different search term.
              </Trans>
            </Text>
          </>
        )}
        <div className={styles.list}>
          {!!visibleDocuments?.length &&
            visibleDocuments.map((doc) => {
              if (doc.type === "post") {
                return <Card key={doc.slug} post={doc} />;
              }
              return <PodcastCard podcast={doc} key={doc.slug} />;
            })}
        </div>
      </div>
    </Section>
  );
};
