import { getSanityClient } from "lib/fetchCMSContent";
import { baseFilters, Document } from "lib/queries";
import { FormValues } from "../ResourcesList";

const defaultParams = {
  types: ["post", "podcast"],
  sortedBy: "publishedAt desc",
};

type QueryParams = {
  tags: string;
  types: string;
  sortedBy: string;
};

/** fetch posts and podcasts filtered by specific tag slugs, types and order */
const filterDocumentsByTags = (params: QueryParams) => /* groq */ `
    *[_type in ${params.types} && count((tags[]->tag.current)[@ in ${params.tags} ]) > 0 && ${baseFilters}] | order(${params.sortedBy}) {
      "type": _type,
      publishedAt, 
      title, 
      summary, 
      "slug": slug.current, 
      author->,
      "imageUrl": mainImage.asset->url,
      rssId,
      "tags": tags[]->label_en
    }
  `;

/** fetch posts and podcasts filtered by types and order */
const filterDocumentsWithoutTags = (params: QueryParams) => /* groq */ `
  *[_type in ${params.types} && ${baseFilters}] | order(${params.sortedBy}) {
    "type": _type,
    publishedAt, 
    title, 
    summary, 
    "slug": slug.current, 
    author->,
    "imageUrl": mainImage.asset->url,
    rssId,
    "tags": tags[]->label_en
  }
`;

export const queryFilteredDocuments = async (
  values: FormValues,
  locale: string
): Promise<Document[]> => {
  const { tags } = values;

  const withTags = !!tags?.length;

  const valuesWithFallback = {
    tags: JSON.stringify(values.tags),
    types: JSON.stringify(
      values.types?.length ? values.types : defaultParams.types
    ),
    sortedBy: values.sortedBy || defaultParams.sortedBy,
  };

  const query = withTags
    ? filterDocumentsByTags(valuesWithFallback)
    : filterDocumentsWithoutTags(valuesWithFallback);

  const filteredDocuments = await getSanityClient().fetch(query, { locale });
  return filteredDocuments;
};

/** fetch posts and podcasts scored by matching search text */
export const searchByText = (searchQuery: string) => /* groq */ `
  *[_type in ${JSON.stringify(defaultParams.types)} && ${baseFilters}]
    | score(
      title match ${searchQuery} + "*"
      || summary match ${searchQuery} + "*"
      || pt::text(body) match ${searchQuery}
      || boost(pt::text(body) match ${searchQuery} + "*", 0.5)
    )
      | order(score desc)
    {
      _score,
      "type": _type,
      publishedAt, 
      title, 
      summary, 
      "slug": slug.current, 
      author->,
      "imageUrl": mainImage.asset->url,
      rssId,
      "tags": tags[]->label_en
    }
    [ _score > 0]
  `;

export const searchDocumentsByText = async (
  searchQuery: string,
  locale: string
): Promise<Document[]> => {
  const query = searchByText(JSON.stringify(searchQuery));
  const result = await getSanityClient().fetch(query, { locale });
  return result;
};
