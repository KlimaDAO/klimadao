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
] as const;

export type TagSlug = typeof tagSlugs[number];
type FilterTag = {
  slug: TagSlug; // slug value from CMS
  id: string; // ID from CMS
  label: string;
};

export const documentTypeNames = ["post", "podcast"] as const;
export type DocumentType = typeof documentTypeNames[number];
type FilterDocumentType = {
  type: DocumentType; // document type in CMS
  label: string;
};

export const sortQueryNames = ["publishedAt desc", "publishedAt asc"] as const;
export type SortQuery = typeof sortQueryNames[number];
type SortedByQueries = {
  label: string;
  id: string;
  value: SortQuery;
};

export const mainTags: FilterTag[] = [
  {
    slug: "klima-overview",
    id: "e448b05c-86e1-4354-946b-e4f54f246c48",
    label: t({
      id: "resources.list.filter.tag.klima_overview",
      message: "Klima Overview",
    }),
  },
  {
    slug: "klima-infinity",
    id: "266fd446-34e6-46c6-bb5d-26425e667423",
    label: t({
      id: "resources.list.filter.tag.klima_infinity",
      message: "Klima Infinity",
    }),
  },
  {
    slug: "partnerships",
    id: "c3f29fc2-b763-4db3-a529-70fae8bd0d36",
    label: t({
      id: "resources.list.filter.tag.partnerships",
      message: "Partnerships",
    }),
  },
];

export const subTags: FilterTag[] = [
  {
    slug: "basics",
    id: "d424ffeb-d0f7-4e1a-83b5-691d122fe5e8",
    label: t({
      id: "resources.list.filter.tag.basics",
      message: "Basics",
    }),
  },
  {
    slug: "deep-dives",
    id: "e1211d9a-7bb8-46b5-ac36-1bcea905a529",
    label: t({
      id: "resources.list.filter.tag.deep_dives",
      message: "Deep Dives",
    }),
  },
  {
    slug: "user-guides",
    id: "42507335-b1b7-434c-871e-b83ec43295c6",
    label: t({
      id: "resources.list.filter.tag.user_guides",
      message: "User Guides",
    }),
  },
  {
    slug: "press-releases",
    id: "70cc04d9-e4e0-4957-b1e1-b1f3c183b398",
    label: t({
      id: "resources.list.filter.tag.press_releases",
      message: "Press Releases",
    }),
  },
  {
    slug: "policy",
    id: "ebad9808-941a-42ef-b459-9bd1dad442ec",
    label: t({
      id: "resources.list.filter.tag.policy",
      message: "Policy",
    }),
  },
  {
    slug: "carbon-footprint",
    id: "e047189f-e11f-4777-ac59-58162ee4c8c2",
    label: t({
      id: "resources.list.filter.tag.carbon_footprint",
      message: "Carbon Footprint",
    }),
  },
];

export const documentTypes: FilterDocumentType[] = [
  {
    type: "post",
    label: t({
      id: "resources.list.filter.type.blog",
      message: "Blog",
    }),
  },
  {
    type: "podcast",
    label: t({
      id: "resources.list.filter.type.podcast",
      message: "Podcast",
    }),
  },
];

export const sortedByQueries: SortedByQueries[] = [
  {
    label: t({
      id: "resources.list.sort_by.latest_first",
      message: "Latest First",
    }),
    id: "latest-first",
    value: "publishedAt desc",
  },
  {
    label: t({
      id: "resources.list.sort_by.oldest_first",
      message: "Oldest First",
    }),
    id: "oldest-first",
    value: "publishedAt asc",
  },
];
