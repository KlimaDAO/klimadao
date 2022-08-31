import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";

import { Card } from "components/Card";
import { PodcastCard } from "components/PodcastCard";
import { InputField } from "components/Form";
import { getResourcesListErrorMap } from "../lib/getResourcesListErrorTranslations";

import { fetchCMSContent } from "lib/fetchCMSContent";

import * as styles from "./styles";
import { Document } from "lib/queries";

export interface Props {
  documents: Document[];
}

type FormValues = {
  search: string;
};

export const ResourcesList: FC<Props> = ({ documents }) => {
  const [visibleDocuments, setVisibleDocuments] =
    useState<Document[]>(documents);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResult, setNoResult] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    setSearchTerm(values.search);

    try {
      const searchResult = await fetchCMSContent("searchByText", {
        searchQuery: values.search,
      });

      if (searchResult.length) {
        setVisibleDocuments(searchResult);
      } else {
        setNoResult(true);
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
            label={t({
              id: "resources.form.input.search.label",
              message: "Search",
            })}
            placeholder={t({
              id: "resources.form.input.search.placeholder",
              message: "Search",
            })}
            type="search"
            autoComplete="off"
            hideLabel
            className={styles.searchInput}
            errors={errors.search}
            errorMessageMap={getResourcesListErrorMap}
            {...register("search", {
              onChange: () => setNoResult(false),
              required: {
                value: true,
                message: "resources.form.input.search.error.required",
              },
            })}
          />
          <ButtonPrimary
            variant="icon"
            type="submit"
            className={styles.searchInputSubmit}
            label={<SearchIcon fontSize="large" />}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
        {noResult && (
          <Text t="h4">
            <Trans id="resources.page.list.no_search_results">
              Sorry. We coudn't find any matches for: {searchTerm}
            </Trans>
          </Text>
        )}
        <div className={styles.list}>
          {visibleDocuments.map((doc) => {
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
