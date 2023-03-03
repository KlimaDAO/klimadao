import { t } from "@lingui/macro";

export const tagSlugs = [
  "klima-overview",
  "klima-infinity",
  "partnerships",
  "basics",
  "deep-dives",
  "user-guides",
  "press-releases",
  "policy",
  "carbon-footprint",
  "digital-carbon",
  "carbonmark-overview",
] as const;

export type TagSlug = (typeof tagSlugs)[number];

export const documentTypeNames = ["post", "podcast"] as const;
export type DocumentType = (typeof documentTypeNames)[number];
export type CheckboxOption = {
  value: DocumentType | TagSlug; // document type in CMS or slug value from CMS
  label: string;
  id: string;
};

// need to match the sanity GROQ order API
// https://www.sanity.io/docs/query-cheat-sheet#b5aec96cf56c
export const sortQueryNames = [
  "publishedAt desc",
  "publishedAt asc",
  "lower(title) desc",
  "lower(title) asc",
] as const;
export type SortQuery = (typeof sortQueryNames)[number];
type SortedByQueries = {
  label: string;
  id: string;
  value: SortQuery;
};

export const getMainTags = (): CheckboxOption[] => [
  {
    value: "carbonmark-overview",
    id: "carbonmark-overview",
    label: t`Carbonmark Overview`,
  },
  {
    value: "digital-carbon",
    id: "digital-carbon",
    label: t`Digital Carbon`,
  },
  {
    value: "press-releases",
    id: "press-releases",
    label: t`Press Releases`,
  },
  {
    value: "user-guides",
    id: "user-guides",
    label: t`User Guides`,
  },
];

export const getSortedByQueries = (): SortedByQueries[] => [
  {
    label: t`Latest First`,
    id: "latest-first",
    value: "publishedAt desc",
  },
  {
    label: t`Oldest First`,
    id: "oldest-first",
    value: "publishedAt asc",
  },
  {
    label: t`A-Z`,
    id: "a-z",
    value: "lower(title) asc",
  },
  {
    label: t`Z-A`,
    id: "z-a",
    value: "lower(title) desc",
  },
];
