import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type CarbonprojectsBlock = {
  __typename?: 'Block';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  children: Maybe<Array<Maybe<CarbonprojectsSpan>>>;
  list: Maybe<Scalars['String']>;
  style: Maybe<Scalars['String']>;
};

export type CarbonprojectsBooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Boolean']>;
};

export type CarbonprojectsCrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _dataset: Maybe<Scalars['String']>;
  _key: Maybe<Scalars['String']>;
  _projectId: Maybe<Scalars['String']>;
  _ref: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  _weak: Maybe<Scalars['Boolean']>;
};

export type CarbonprojectsCrossDatasetReferenceFilter = {
  _dataset: InputMaybe<CarbonprojectsStringFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _projectId: InputMaybe<CarbonprojectsStringFilter>;
  _ref: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _weak: InputMaybe<CarbonprojectsBooleanFilter>;
};

export type CarbonprojectsCrossDatasetReferenceSorting = {
  _dataset: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _projectId: InputMaybe<CarbonprojectsSortOrder>;
  _ref: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _weak: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsDateFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Date']>;
};

export type CarbonprojectsDatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['DateTime']>;
};

/** A Sanity document */
export type CarbonprojectsDocument = {
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
};

export type CarbonprojectsDocumentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
};

export type CarbonprojectsDocumentSorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsFile = {
  __typename?: 'File';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<CarbonprojectsSanityFileAsset>;
};

export type CarbonprojectsFileFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  asset: InputMaybe<CarbonprojectsSanityFileAssetFilter>;
};

export type CarbonprojectsFileSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsFloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Float']>;
};

export type CarbonprojectsGeopoint = {
  __typename?: 'Geopoint';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  alt: Maybe<Scalars['Float']>;
  lat: Maybe<Scalars['Float']>;
  lng: Maybe<Scalars['Float']>;
};

export type CarbonprojectsGeopointFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  alt: InputMaybe<CarbonprojectsFloatFilter>;
  lat: InputMaybe<CarbonprojectsFloatFilter>;
  lng: InputMaybe<CarbonprojectsFloatFilter>;
};

export type CarbonprojectsGeopointSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  alt: InputMaybe<CarbonprojectsSortOrder>;
  lat: InputMaybe<CarbonprojectsSortOrder>;
  lng: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsIdFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<Scalars['ID']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['ID']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['ID']>;
  nin: InputMaybe<Array<Scalars['ID']>>;
};

export type CarbonprojectsImage = {
  __typename?: 'Image';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<CarbonprojectsSanityImageAsset>;
  crop: Maybe<CarbonprojectsSanityImageCrop>;
  hotspot: Maybe<CarbonprojectsSanityImageHotspot>;
};

export type CarbonprojectsImageFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  asset: InputMaybe<CarbonprojectsSanityImageAssetFilter>;
  crop: InputMaybe<CarbonprojectsSanityImageCropFilter>;
  hotspot: InputMaybe<CarbonprojectsSanityImageHotspotFilter>;
};

export type CarbonprojectsImageSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  crop: InputMaybe<CarbonprojectsSanityImageCropSorting>;
  hotspot: InputMaybe<CarbonprojectsSanityImageHotspotSorting>;
};

export type CarbonprojectsIntFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Int']>;
};

export type CarbonprojectsMethodology = CarbonprojectsDocument & {
  __typename?: 'Methodology';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  /** From our predefined ontology of categories */
  category: Maybe<Scalars['String']>;
  id: Maybe<CarbonprojectsSlug>;
  /** Link to the authoritative methodology webpage or PDF document */
  link: Maybe<Scalars['String']>;
  /** Methodology name. Use 'Title Case Capitalization'. No trailing period. No version number. */
  name: Maybe<Scalars['String']>;
};

export type CarbonprojectsMethodologyFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  category: InputMaybe<CarbonprojectsStringFilter>;
  id: InputMaybe<CarbonprojectsSlugFilter>;
  link: InputMaybe<CarbonprojectsStringFilter>;
  name: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsMethodologySorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
  category: InputMaybe<CarbonprojectsSortOrder>;
  id: InputMaybe<CarbonprojectsSlugSorting>;
  link: InputMaybe<CarbonprojectsSortOrder>;
  name: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsProject = CarbonprojectsDocument & {
  __typename?: 'Project';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  boundary: Maybe<CarbonprojectsFile>;
  ccbs: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Is this project CORSIA compliant? */
  corsia: Maybe<Scalars['Boolean']>;
  /** ISO-3166 English Short Name of the country where the project was implemented */
  country: Maybe<Scalars['String']>;
  /** Official project description as it appears in the originating registry */
  description: Maybe<Scalars['String']>;
  documents: Maybe<Array<Maybe<CarbonprojectsFile>>>;
  geolocation: Maybe<CarbonprojectsGeopoint>;
  id: Maybe<CarbonprojectsSlug>;
  methodologies: Maybe<Array<Maybe<CarbonprojectsMethodology>>>;
  /** Project name. Use 'Title Case Capitalization'. No trailing period */
  name: Maybe<Scalars['String']>;
  /** Region where the project was implemented */
  region: Maybe<Scalars['String']>;
  /** Verra, Gold Standard, or EcoRegistry */
  registry: Maybe<Scalars['String']>;
  /** Official identifier as it appears in the registry. Do not include a prefix. */
  registryProjectId: Maybe<Scalars['String']>;
  sdgs: Maybe<Array<Maybe<Scalars['String']>>>;
  /** (optional) state or territory where the project was implemented */
  state: Maybe<Scalars['String']>;
  /** Project website or resource url, if exists */
  url: Maybe<Scalars['String']>;
};

export type CarbonprojectsProjectContent = CarbonprojectsDocument & {
  __typename?: 'ProjectContent';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  coverImage: Maybe<CarbonprojectsImage>;
  images: Maybe<Array<Maybe<CarbonprojectsImage>>>;
  /** Longer description */
  longDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the long description was generated or procured, so that this work can be reproduced by others. */
  longDescriptionMeta: Maybe<Scalars['String']>;
  /** Use this space to document how this media was generated or procured, so that this work can be reproduced by others. */
  notes: Maybe<Scalars['String']>;
  /** The project this content is associated with */
  project: Maybe<CarbonprojectsProject>;
  /** Short description, e.g. for retirement PDFs. Ideally 300-600 chars, no newlines, no bullet points. */
  shortDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the short description was generated or procured, so that this work can be reproduced by others. */
  shortDescriptionMeta: Maybe<Scalars['String']>;
};

export type CarbonprojectsProjectContentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  coverImage: InputMaybe<CarbonprojectsImageFilter>;
  longDescription: InputMaybe<CarbonprojectsStringFilter>;
  longDescriptionMeta: InputMaybe<CarbonprojectsStringFilter>;
  notes: InputMaybe<CarbonprojectsStringFilter>;
  project: InputMaybe<CarbonprojectsProjectFilter>;
  shortDescription: InputMaybe<CarbonprojectsStringFilter>;
  shortDescriptionMeta: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsProjectContentSorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
  coverImage: InputMaybe<CarbonprojectsImageSorting>;
  longDescription: InputMaybe<CarbonprojectsSortOrder>;
  longDescriptionMeta: InputMaybe<CarbonprojectsSortOrder>;
  notes: InputMaybe<CarbonprojectsSortOrder>;
  shortDescription: InputMaybe<CarbonprojectsSortOrder>;
  shortDescriptionMeta: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsProjectFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  boundary: InputMaybe<CarbonprojectsFileFilter>;
  corsia: InputMaybe<CarbonprojectsBooleanFilter>;
  country: InputMaybe<CarbonprojectsStringFilter>;
  description: InputMaybe<CarbonprojectsStringFilter>;
  geolocation: InputMaybe<CarbonprojectsGeopointFilter>;
  id: InputMaybe<CarbonprojectsSlugFilter>;
  name: InputMaybe<CarbonprojectsStringFilter>;
  region: InputMaybe<CarbonprojectsStringFilter>;
  registry: InputMaybe<CarbonprojectsStringFilter>;
  registryProjectId: InputMaybe<CarbonprojectsStringFilter>;
  state: InputMaybe<CarbonprojectsStringFilter>;
  url: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsProjectSorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
  boundary: InputMaybe<CarbonprojectsFileSorting>;
  corsia: InputMaybe<CarbonprojectsSortOrder>;
  country: InputMaybe<CarbonprojectsSortOrder>;
  description: InputMaybe<CarbonprojectsSortOrder>;
  geolocation: InputMaybe<CarbonprojectsGeopointSorting>;
  id: InputMaybe<CarbonprojectsSlugSorting>;
  name: InputMaybe<CarbonprojectsSortOrder>;
  region: InputMaybe<CarbonprojectsSortOrder>;
  registry: InputMaybe<CarbonprojectsSortOrder>;
  registryProjectId: InputMaybe<CarbonprojectsSortOrder>;
  state: InputMaybe<CarbonprojectsSortOrder>;
  url: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsRootQuery = {
  __typename?: 'RootQuery';
  Document: Maybe<CarbonprojectsDocument>;
  Methodology: Maybe<CarbonprojectsMethodology>;
  Project: Maybe<CarbonprojectsProject>;
  ProjectContent: Maybe<CarbonprojectsProjectContent>;
  SanityFileAsset: Maybe<CarbonprojectsSanityFileAsset>;
  SanityImageAsset: Maybe<CarbonprojectsSanityImageAsset>;
  allDocument: Array<CarbonprojectsDocument>;
  allMethodology: Array<CarbonprojectsMethodology>;
  allProject: Array<CarbonprojectsProject>;
  allProjectContent: Array<CarbonprojectsProjectContent>;
  allSanityFileAsset: Array<CarbonprojectsSanityFileAsset>;
  allSanityImageAsset: Array<CarbonprojectsSanityImageAsset>;
};


export type CarbonprojectsRootQueryDocumentArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQueryMethodologyArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQueryProjectArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQueryProjectContentArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQuerySanityFileAssetArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQuerySanityImageAssetArgs = {
  id: Scalars['ID'];
};


export type CarbonprojectsRootQueryAllDocumentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsDocumentSorting>>;
  where: InputMaybe<CarbonprojectsDocumentFilter>;
};


export type CarbonprojectsRootQueryAllMethodologyArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsMethodologySorting>>;
  where: InputMaybe<CarbonprojectsMethodologyFilter>;
};


export type CarbonprojectsRootQueryAllProjectArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsProjectSorting>>;
  where: InputMaybe<CarbonprojectsProjectFilter>;
};


export type CarbonprojectsRootQueryAllProjectContentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsProjectContentSorting>>;
  where: InputMaybe<CarbonprojectsProjectContentFilter>;
};


export type CarbonprojectsRootQueryAllSanityFileAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsSanityFileAssetSorting>>;
  where: InputMaybe<CarbonprojectsSanityFileAssetFilter>;
};


export type CarbonprojectsRootQueryAllSanityImageAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CarbonprojectsSanityImageAssetSorting>>;
  where: InputMaybe<CarbonprojectsSanityImageAssetFilter>;
};

export type CarbonprojectsSanityAssetSourceData = {
  __typename?: 'SanityAssetSourceData';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id: Maybe<Scalars['String']>;
  /** A canonical name for the source this asset is originating from */
  name: Maybe<Scalars['String']>;
  /** A URL to find more information about this asset in the originating source */
  url: Maybe<Scalars['String']>;
};

export type CarbonprojectsSanityAssetSourceDataFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  id: InputMaybe<CarbonprojectsStringFilter>;
  name: InputMaybe<CarbonprojectsStringFilter>;
  url: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsSanityAssetSourceDataSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  id: InputMaybe<CarbonprojectsSortOrder>;
  name: InputMaybe<CarbonprojectsSortOrder>;
  url: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityFileAsset = CarbonprojectsDocument & {
  __typename?: 'SanityFileAsset';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  altText: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  extension: Maybe<Scalars['String']>;
  label: Maybe<Scalars['String']>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<CarbonprojectsSanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type CarbonprojectsSanityFileAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  altText: InputMaybe<CarbonprojectsStringFilter>;
  assetId: InputMaybe<CarbonprojectsStringFilter>;
  description: InputMaybe<CarbonprojectsStringFilter>;
  extension: InputMaybe<CarbonprojectsStringFilter>;
  label: InputMaybe<CarbonprojectsStringFilter>;
  mimeType: InputMaybe<CarbonprojectsStringFilter>;
  originalFilename: InputMaybe<CarbonprojectsStringFilter>;
  path: InputMaybe<CarbonprojectsStringFilter>;
  sha1hash: InputMaybe<CarbonprojectsStringFilter>;
  size: InputMaybe<CarbonprojectsFloatFilter>;
  source: InputMaybe<CarbonprojectsSanityAssetSourceDataFilter>;
  title: InputMaybe<CarbonprojectsStringFilter>;
  url: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsSanityFileAssetSorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
  altText: InputMaybe<CarbonprojectsSortOrder>;
  assetId: InputMaybe<CarbonprojectsSortOrder>;
  description: InputMaybe<CarbonprojectsSortOrder>;
  extension: InputMaybe<CarbonprojectsSortOrder>;
  label: InputMaybe<CarbonprojectsSortOrder>;
  mimeType: InputMaybe<CarbonprojectsSortOrder>;
  originalFilename: InputMaybe<CarbonprojectsSortOrder>;
  path: InputMaybe<CarbonprojectsSortOrder>;
  sha1hash: InputMaybe<CarbonprojectsSortOrder>;
  size: InputMaybe<CarbonprojectsSortOrder>;
  source: InputMaybe<CarbonprojectsSanityAssetSourceDataSorting>;
  title: InputMaybe<CarbonprojectsSortOrder>;
  url: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityImageAsset = CarbonprojectsDocument & {
  __typename?: 'SanityImageAsset';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  altText: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  extension: Maybe<Scalars['String']>;
  label: Maybe<Scalars['String']>;
  metadata: Maybe<CarbonprojectsSanityImageMetadata>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<CarbonprojectsSanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  uploadId: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type CarbonprojectsSanityImageAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CarbonprojectsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  _id: InputMaybe<CarbonprojectsIdFilter>;
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _rev: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  _updatedAt: InputMaybe<CarbonprojectsDatetimeFilter>;
  altText: InputMaybe<CarbonprojectsStringFilter>;
  assetId: InputMaybe<CarbonprojectsStringFilter>;
  description: InputMaybe<CarbonprojectsStringFilter>;
  extension: InputMaybe<CarbonprojectsStringFilter>;
  label: InputMaybe<CarbonprojectsStringFilter>;
  metadata: InputMaybe<CarbonprojectsSanityImageMetadataFilter>;
  mimeType: InputMaybe<CarbonprojectsStringFilter>;
  originalFilename: InputMaybe<CarbonprojectsStringFilter>;
  path: InputMaybe<CarbonprojectsStringFilter>;
  sha1hash: InputMaybe<CarbonprojectsStringFilter>;
  size: InputMaybe<CarbonprojectsFloatFilter>;
  source: InputMaybe<CarbonprojectsSanityAssetSourceDataFilter>;
  title: InputMaybe<CarbonprojectsStringFilter>;
  uploadId: InputMaybe<CarbonprojectsStringFilter>;
  url: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsSanityImageAssetSorting = {
  _createdAt: InputMaybe<CarbonprojectsSortOrder>;
  _id: InputMaybe<CarbonprojectsSortOrder>;
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _rev: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  _updatedAt: InputMaybe<CarbonprojectsSortOrder>;
  altText: InputMaybe<CarbonprojectsSortOrder>;
  assetId: InputMaybe<CarbonprojectsSortOrder>;
  description: InputMaybe<CarbonprojectsSortOrder>;
  extension: InputMaybe<CarbonprojectsSortOrder>;
  label: InputMaybe<CarbonprojectsSortOrder>;
  metadata: InputMaybe<CarbonprojectsSanityImageMetadataSorting>;
  mimeType: InputMaybe<CarbonprojectsSortOrder>;
  originalFilename: InputMaybe<CarbonprojectsSortOrder>;
  path: InputMaybe<CarbonprojectsSortOrder>;
  sha1hash: InputMaybe<CarbonprojectsSortOrder>;
  size: InputMaybe<CarbonprojectsSortOrder>;
  source: InputMaybe<CarbonprojectsSanityAssetSourceDataSorting>;
  title: InputMaybe<CarbonprojectsSortOrder>;
  uploadId: InputMaybe<CarbonprojectsSortOrder>;
  url: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  bottom: Maybe<Scalars['Float']>;
  left: Maybe<Scalars['Float']>;
  right: Maybe<Scalars['Float']>;
  top: Maybe<Scalars['Float']>;
};

export type CarbonprojectsSanityImageCropFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  bottom: InputMaybe<CarbonprojectsFloatFilter>;
  left: InputMaybe<CarbonprojectsFloatFilter>;
  right: InputMaybe<CarbonprojectsFloatFilter>;
  top: InputMaybe<CarbonprojectsFloatFilter>;
};

export type CarbonprojectsSanityImageCropSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  bottom: InputMaybe<CarbonprojectsSortOrder>;
  left: InputMaybe<CarbonprojectsSortOrder>;
  right: InputMaybe<CarbonprojectsSortOrder>;
  top: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
};

export type CarbonprojectsSanityImageDimensionsFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  aspectRatio: InputMaybe<CarbonprojectsFloatFilter>;
  height: InputMaybe<CarbonprojectsFloatFilter>;
  width: InputMaybe<CarbonprojectsFloatFilter>;
};

export type CarbonprojectsSanityImageDimensionsSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  aspectRatio: InputMaybe<CarbonprojectsSortOrder>;
  height: InputMaybe<CarbonprojectsSortOrder>;
  width: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
  x: Maybe<Scalars['Float']>;
  y: Maybe<Scalars['Float']>;
};

export type CarbonprojectsSanityImageHotspotFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  height: InputMaybe<CarbonprojectsFloatFilter>;
  width: InputMaybe<CarbonprojectsFloatFilter>;
  x: InputMaybe<CarbonprojectsFloatFilter>;
  y: InputMaybe<CarbonprojectsFloatFilter>;
};

export type CarbonprojectsSanityImageHotspotSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  height: InputMaybe<CarbonprojectsSortOrder>;
  width: InputMaybe<CarbonprojectsSortOrder>;
  x: InputMaybe<CarbonprojectsSortOrder>;
  y: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  blurHash: Maybe<Scalars['String']>;
  dimensions: Maybe<CarbonprojectsSanityImageDimensions>;
  hasAlpha: Maybe<Scalars['Boolean']>;
  isOpaque: Maybe<Scalars['Boolean']>;
  location: Maybe<CarbonprojectsGeopoint>;
  lqip: Maybe<Scalars['String']>;
  palette: Maybe<CarbonprojectsSanityImagePalette>;
};

export type CarbonprojectsSanityImageMetadataFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  blurHash: InputMaybe<CarbonprojectsStringFilter>;
  dimensions: InputMaybe<CarbonprojectsSanityImageDimensionsFilter>;
  hasAlpha: InputMaybe<CarbonprojectsBooleanFilter>;
  isOpaque: InputMaybe<CarbonprojectsBooleanFilter>;
  location: InputMaybe<CarbonprojectsGeopointFilter>;
  lqip: InputMaybe<CarbonprojectsStringFilter>;
  palette: InputMaybe<CarbonprojectsSanityImagePaletteFilter>;
};

export type CarbonprojectsSanityImageMetadataSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  blurHash: InputMaybe<CarbonprojectsSortOrder>;
  dimensions: InputMaybe<CarbonprojectsSanityImageDimensionsSorting>;
  hasAlpha: InputMaybe<CarbonprojectsSortOrder>;
  isOpaque: InputMaybe<CarbonprojectsSortOrder>;
  location: InputMaybe<CarbonprojectsGeopointSorting>;
  lqip: InputMaybe<CarbonprojectsSortOrder>;
  palette: InputMaybe<CarbonprojectsSanityImagePaletteSorting>;
};

export type CarbonprojectsSanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  darkMuted: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  darkVibrant: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  dominant: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  lightMuted: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  lightVibrant: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  muted: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
  vibrant: Maybe<CarbonprojectsSanityImagePaletteSwatch>;
};

export type CarbonprojectsSanityImagePaletteFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  darkMuted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  darkVibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  dominant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  lightMuted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  lightVibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  muted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
  vibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchFilter>;
};

export type CarbonprojectsSanityImagePaletteSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  darkMuted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  darkVibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  dominant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  lightMuted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  lightVibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  muted: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
  vibrant: InputMaybe<CarbonprojectsSanityImagePaletteSwatchSorting>;
};

export type CarbonprojectsSanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
  foreground: Maybe<Scalars['String']>;
  population: Maybe<Scalars['Float']>;
  title: Maybe<Scalars['String']>;
};

export type CarbonprojectsSanityImagePaletteSwatchFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  background: InputMaybe<CarbonprojectsStringFilter>;
  foreground: InputMaybe<CarbonprojectsStringFilter>;
  population: InputMaybe<CarbonprojectsFloatFilter>;
  title: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsSanityImagePaletteSwatchSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  background: InputMaybe<CarbonprojectsSortOrder>;
  foreground: InputMaybe<CarbonprojectsSortOrder>;
  population: InputMaybe<CarbonprojectsSortOrder>;
  title: InputMaybe<CarbonprojectsSortOrder>;
};

export type CarbonprojectsSanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft: InputMaybe<Scalars['Boolean']>;
  /** All documents referencing the given document ID. */
  references: InputMaybe<Scalars['ID']>;
};

export type CarbonprojectsSlug = {
  __typename?: 'Slug';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  current: Maybe<Scalars['String']>;
  source: Maybe<Scalars['String']>;
};

export type CarbonprojectsSlugFilter = {
  _key: InputMaybe<CarbonprojectsStringFilter>;
  _type: InputMaybe<CarbonprojectsStringFilter>;
  current: InputMaybe<CarbonprojectsStringFilter>;
  source: InputMaybe<CarbonprojectsStringFilter>;
};

export type CarbonprojectsSlugSorting = {
  _key: InputMaybe<CarbonprojectsSortOrder>;
  _type: InputMaybe<CarbonprojectsSortOrder>;
  current: InputMaybe<CarbonprojectsSortOrder>;
  source: InputMaybe<CarbonprojectsSortOrder>;
};

export enum CarbonprojectsSortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC'
}

export type CarbonprojectsSpan = {
  __typename?: 'Span';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  marks: Maybe<Array<Maybe<Scalars['String']>>>;
  text: Maybe<Scalars['String']>;
};

export type CarbonprojectsStringFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<Scalars['String']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['String']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['String']>;
  nin: InputMaybe<Array<Scalars['String']>>;
};

export type CarbonprojectsCarbonProjectFragmentFragment = { __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null };

export type CarbonprojectsCarbonProjectContentFragmentFragment = { __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null };

export type CarbonprojectsGetProjectQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type CarbonprojectsGetProjectQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null }> };

export type CarbonprojectsGetProjectContentQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type CarbonprojectsGetProjectContentQuery = { __typename?: 'RootQuery', allProjectContent: Array<{ __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null }> };

export type CarbonprojectsGetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarbonprojectsGetAllProjectsQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null }> };

export type CarbonprojectsGetAllProjectContentQueryVariables = Exact<{ [key: string]: never; }>;


export type CarbonprojectsGetAllProjectContentQuery = { __typename?: 'RootQuery', allProjectContent: Array<{ __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null }> };

export const CarbonProjectFragmentFragmentDoc = gql`
    fragment CarbonProjectFragment on Project {
  country
  description
  id: _id
  geolocation {
    lat
    lng
    alt
  }
  methodologies {
    id: _id
    category
    name
  }
  name
  region
  registry
  url
  registryProjectId
}
    `;
export const CarbonProjectContentFragmentFragmentDoc = gql`
    fragment CarbonProjectContentFragment on ProjectContent {
  project {
    registry
    registryProjectId
  }
  shortDescription
  longDescription
  coverImage {
    asset {
      url
    }
  }
  images {
    asset {
      url
      label
      title
      altText
    }
  }
}
    `;
export const GetProjectDocument = gql`
    query getProject($registry: String!, $registryProjectId: String!) {
  allProject(
    where: {registry: {eq: $registry}, registryProjectId: {eq: $registryProjectId}}
  ) {
    ...CarbonProjectFragment
  }
}
    ${CarbonProjectFragmentFragmentDoc}`;
export const GetProjectContentDocument = gql`
    query getProjectContent($registry: String!, $registryProjectId: String!) {
  allProjectContent(
    where: {project: {registryProjectId: {eq: $registryProjectId}, registry: {eq: $registry}}}
  ) {
    ...CarbonProjectContentFragment
  }
}
    ${CarbonProjectContentFragmentFragmentDoc}`;
export const GetAllProjectsDocument = gql`
    query getAllProjects {
  allProject {
    ...CarbonProjectFragment
  }
}
    ${CarbonProjectFragmentFragmentDoc}`;
export const GetAllProjectContentDocument = gql`
    query getAllProjectContent {
  allProjectContent {
    ...CarbonProjectContentFragment
  }
}
    ${CarbonProjectContentFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getProject(variables: CarbonprojectsGetProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CarbonprojectsGetProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CarbonprojectsGetProjectQuery>(GetProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProject', 'query');
    },
    getProjectContent(variables: CarbonprojectsGetProjectContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CarbonprojectsGetProjectContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CarbonprojectsGetProjectContentQuery>(GetProjectContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectContent', 'query');
    },
    getAllProjects(variables?: CarbonprojectsGetAllProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CarbonprojectsGetAllProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CarbonprojectsGetAllProjectsQuery>(GetAllProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProjects', 'query');
    },
    getAllProjectContent(variables?: CarbonprojectsGetAllProjectContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CarbonprojectsGetAllProjectContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CarbonprojectsGetAllProjectContentQuery>(GetAllProjectContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProjectContent', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;