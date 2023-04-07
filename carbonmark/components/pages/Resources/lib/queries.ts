import { getSanityClient } from "lib/fetchCMSContent";
import { Document, hideFromProduction } from "lib/queries";
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
    *[_type in ${params.types} && count((tags[]->tag.current)[@ in ${params.tags} ]) > 0 && ${hideFromProduction} && domain=="carbonmark"] | order(${params.sortedBy}) {
      "type": _type,
      publishedAt, 
      title, 
      summary, 
      "slug": slug.current, 
      author->,
      "imageUrl": mainImage.asset->url,
      "embed": embedCode,
      "tags": tags[]->label_en
    }
  `;

/** fetch posts and podcasts filtered by types and order */
const filterDocumentsWithoutTags = (params: QueryParams) => /* groq */ `
  *[_type in ${params.types} && ${hideFromProduction} && domain=="carbonmark"] | order(${params.sortedBy}) {
    "type": _type,
    publishedAt, 
    title, 
    summary, 
    "slug": slug.current, 
    author->,
    "imageUrl": mainImage.asset->url,
    "embed": embedCode,
    "tags": tags[]->label_en
  }
`;

export const queryFilteredDocuments = async (
  values: FormValues
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

  const filteredDocuments = await getSanityClient().fetch(query);
  return filteredDocuments;
};

/** fetch posts and podcasts scored by matching search text */
export const searchByText = (searchQuery: string) => /* groq */ `
  *[_type in ${JSON.stringify(
    defaultParams.types
  )} && ${hideFromProduction} && domain=="carbonmark"]
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
      "embed": embedCode,
      "tags": tags[]->label_en
    }
    [ _score > 0]
  `;

export const searchDocumentsByText = async (
  searchQuery: string
): Promise<Document[]> => {
  const query = searchByText(JSON.stringify(searchQuery));
  const result = await getSanityClient().fetch(query);
  return result;
};
