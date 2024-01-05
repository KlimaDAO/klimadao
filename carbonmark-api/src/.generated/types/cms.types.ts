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

export type CmsBlock = {
  __typename?: 'Block';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  children: Maybe<Array<Maybe<CmsSpan>>>;
  list: Maybe<Scalars['String']>;
  style: Maybe<Scalars['String']>;
};

export type CmsBooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Boolean']>;
};

export type CmsCrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _dataset: Maybe<Scalars['String']>;
  _key: Maybe<Scalars['String']>;
  _projectId: Maybe<Scalars['String']>;
  _ref: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  _weak: Maybe<Scalars['Boolean']>;
};

export type CmsCrossDatasetReferenceFilter = {
  _dataset: InputMaybe<CmsStringFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _projectId: InputMaybe<CmsStringFilter>;
  _ref: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _weak: InputMaybe<CmsBooleanFilter>;
};

export type CmsCrossDatasetReferenceSorting = {
  _dataset: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _projectId: InputMaybe<CmsSortOrder>;
  _ref: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _weak: InputMaybe<CmsSortOrder>;
};

export type CmsDateFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Date']>;
};

export type CmsDatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['DateTime']>;
};

/** A Sanity document */
export type CmsDocument = {
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

export type CmsDocumentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
};

export type CmsDocumentSorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
};

export type CmsExternalFile = {
  __typename?: 'ExternalFile';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  filename: Maybe<Scalars['String']>;
  mimetype: Maybe<Scalars['String']>;
  uri: Maybe<Scalars['String']>;
};

export type CmsExternalFileFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  description: InputMaybe<CmsStringFilter>;
  filename: InputMaybe<CmsStringFilter>;
  mimetype: InputMaybe<CmsStringFilter>;
  uri: InputMaybe<CmsStringFilter>;
};

export type CmsExternalFileSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  description: InputMaybe<CmsSortOrder>;
  filename: InputMaybe<CmsSortOrder>;
  mimetype: InputMaybe<CmsSortOrder>;
  uri: InputMaybe<CmsSortOrder>;
};

export type CmsFile = {
  __typename?: 'File';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<CmsSanityFileAsset>;
};

export type CmsFileFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  asset: InputMaybe<CmsSanityFileAssetFilter>;
};

export type CmsFileSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
};

export type CmsFloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Float']>;
};

export type CmsGeopoint = {
  __typename?: 'Geopoint';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  alt: Maybe<Scalars['Float']>;
  lat: Maybe<Scalars['Float']>;
  lng: Maybe<Scalars['Float']>;
};

export type CmsGeopointFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  alt: InputMaybe<CmsFloatFilter>;
  lat: InputMaybe<CmsFloatFilter>;
  lng: InputMaybe<CmsFloatFilter>;
};

export type CmsGeopointSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  alt: InputMaybe<CmsSortOrder>;
  lat: InputMaybe<CmsSortOrder>;
  lng: InputMaybe<CmsSortOrder>;
};

export type CmsIdFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<Scalars['ID']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['ID']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['ID']>;
  nin: InputMaybe<Array<Scalars['ID']>>;
};

export type CmsImage = {
  __typename?: 'Image';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<CmsSanityImageAsset>;
  crop: Maybe<CmsSanityImageCrop>;
  hotspot: Maybe<CmsSanityImageHotspot>;
};

export type CmsImageFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  asset: InputMaybe<CmsSanityImageAssetFilter>;
  crop: InputMaybe<CmsSanityImageCropFilter>;
  hotspot: InputMaybe<CmsSanityImageHotspotFilter>;
};

export type CmsImageSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  crop: InputMaybe<CmsSanityImageCropSorting>;
  hotspot: InputMaybe<CmsSanityImageHotspotSorting>;
};

export type CmsIntFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Int']>;
};

export type CmsMethodology = CmsDocument & {
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
  id: Maybe<CmsSlug>;
  /** Link to the authoritative methodology webpage or PDF document */
  link: Maybe<Scalars['String']>;
  /** Methodology name. Use 'Title Case Capitalization'. No trailing period. No version number. */
  name: Maybe<Scalars['String']>;
};

export type CmsMethodologyFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
  category: InputMaybe<CmsStringFilter>;
  id: InputMaybe<CmsSlugFilter>;
  link: InputMaybe<CmsStringFilter>;
  name: InputMaybe<CmsStringFilter>;
};

export type CmsMethodologySorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
  category: InputMaybe<CmsSortOrder>;
  id: InputMaybe<CmsSlugSorting>;
  link: InputMaybe<CmsSortOrder>;
  name: InputMaybe<CmsSortOrder>;
};

export type CmsProject = CmsDocument & {
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
  boundary: Maybe<CmsFile>;
  ccbs: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Is this project CORSIA compliant? */
  corsia: Maybe<Scalars['Boolean']>;
  /** ISO-3166 English Short Name of the country where the project was implemented */
  country: Maybe<Scalars['String']>;
  /** Official project description as it appears in the originating registry */
  description: Maybe<Scalars['String']>;
  externalDocuments: Maybe<Array<Maybe<CmsExternalFile>>>;
  externalMedia: Maybe<Array<Maybe<CmsExternalFile>>>;
  geolocation: Maybe<CmsGeopoint>;
  id: Maybe<CmsSlug>;
  methodologies: Maybe<Array<Maybe<CmsMethodology>>>;
  /** Project name. Use 'Title Case Capitalization'. No trailing period */
  name: Maybe<Scalars['String']>;
  /** External project website, if exists */
  projectWebsite: Maybe<Scalars['String']>;
  /** Region where the project was implemented */
  region: Maybe<Scalars['String']>;
  /** Verra, Gold Standard, or EcoRegistry */
  registry: Maybe<Scalars['String']>;
  /** Official identifier as it appears in the registry. Do not include a prefix. */
  registryProjectId: Maybe<Scalars['String']>;
  sdgs: Maybe<Array<Maybe<Scalars['String']>>>;
  /** (optional) state or territory where the project was implemented */
  state: Maybe<Scalars['String']>;
  /** From our predefined ontology of subcategories */
  subcategory: Maybe<Scalars['String']>;
  /** Project's website or resource url on the registry, if exists */
  url: Maybe<Scalars['String']>;
};

export type CmsProjectContent = CmsDocument & {
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
  coverImage: Maybe<CmsImage>;
  images: Maybe<Array<Maybe<CmsImage>>>;
  /** Longer description */
  longDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the long description was generated or procured, so that this work can be reproduced by others. */
  longDescriptionMeta: Maybe<Scalars['String']>;
  /** Use this space to document how this media was generated or procured, so that this work can be reproduced by others. */
  notes: Maybe<Scalars['String']>;
  /** The project this content is associated with */
  project: Maybe<CmsProject>;
  /** Short description, e.g. for retirement PDFs. Ideally 300-600 chars, no newlines, no bullet points. */
  shortDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the short description was generated or procured, so that this work can be reproduced by others. */
  shortDescriptionMeta: Maybe<Scalars['String']>;
};

export type CmsProjectContentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
  coverImage: InputMaybe<CmsImageFilter>;
  longDescription: InputMaybe<CmsStringFilter>;
  longDescriptionMeta: InputMaybe<CmsStringFilter>;
  notes: InputMaybe<CmsStringFilter>;
  project: InputMaybe<CmsProjectFilter>;
  shortDescription: InputMaybe<CmsStringFilter>;
  shortDescriptionMeta: InputMaybe<CmsStringFilter>;
};

export type CmsProjectContentSorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
  coverImage: InputMaybe<CmsImageSorting>;
  longDescription: InputMaybe<CmsSortOrder>;
  longDescriptionMeta: InputMaybe<CmsSortOrder>;
  notes: InputMaybe<CmsSortOrder>;
  shortDescription: InputMaybe<CmsSortOrder>;
  shortDescriptionMeta: InputMaybe<CmsSortOrder>;
};

export type CmsProjectFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
  boundary: InputMaybe<CmsFileFilter>;
  corsia: InputMaybe<CmsBooleanFilter>;
  country: InputMaybe<CmsStringFilter>;
  description: InputMaybe<CmsStringFilter>;
  geolocation: InputMaybe<CmsGeopointFilter>;
  id: InputMaybe<CmsSlugFilter>;
  name: InputMaybe<CmsStringFilter>;
  projectWebsite: InputMaybe<CmsStringFilter>;
  region: InputMaybe<CmsStringFilter>;
  registry: InputMaybe<CmsStringFilter>;
  registryProjectId: InputMaybe<CmsStringFilter>;
  state: InputMaybe<CmsStringFilter>;
  subcategory: InputMaybe<CmsStringFilter>;
  url: InputMaybe<CmsStringFilter>;
};

export type CmsProjectSorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
  boundary: InputMaybe<CmsFileSorting>;
  corsia: InputMaybe<CmsSortOrder>;
  country: InputMaybe<CmsSortOrder>;
  description: InputMaybe<CmsSortOrder>;
  geolocation: InputMaybe<CmsGeopointSorting>;
  id: InputMaybe<CmsSlugSorting>;
  name: InputMaybe<CmsSortOrder>;
  projectWebsite: InputMaybe<CmsSortOrder>;
  region: InputMaybe<CmsSortOrder>;
  registry: InputMaybe<CmsSortOrder>;
  registryProjectId: InputMaybe<CmsSortOrder>;
  state: InputMaybe<CmsSortOrder>;
  subcategory: InputMaybe<CmsSortOrder>;
  url: InputMaybe<CmsSortOrder>;
};

export type CmsRootQuery = {
  __typename?: 'RootQuery';
  Document: Maybe<CmsDocument>;
  Methodology: Maybe<CmsMethodology>;
  Project: Maybe<CmsProject>;
  ProjectContent: Maybe<CmsProjectContent>;
  SanityFileAsset: Maybe<CmsSanityFileAsset>;
  SanityImageAsset: Maybe<CmsSanityImageAsset>;
  allDocument: Array<CmsDocument>;
  allMethodology: Array<CmsMethodology>;
  allProject: Array<CmsProject>;
  allProjectContent: Array<CmsProjectContent>;
  allSanityFileAsset: Array<CmsSanityFileAsset>;
  allSanityImageAsset: Array<CmsSanityImageAsset>;
};


export type CmsRootQueryDocumentArgs = {
  id: Scalars['ID'];
};


export type CmsRootQueryMethodologyArgs = {
  id: Scalars['ID'];
};


export type CmsRootQueryProjectArgs = {
  id: Scalars['ID'];
};


export type CmsRootQueryProjectContentArgs = {
  id: Scalars['ID'];
};


export type CmsRootQuerySanityFileAssetArgs = {
  id: Scalars['ID'];
};


export type CmsRootQuerySanityImageAssetArgs = {
  id: Scalars['ID'];
};


export type CmsRootQueryAllDocumentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsDocumentSorting>>;
  where: InputMaybe<CmsDocumentFilter>;
};


export type CmsRootQueryAllMethodologyArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsMethodologySorting>>;
  where: InputMaybe<CmsMethodologyFilter>;
};


export type CmsRootQueryAllProjectArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsProjectSorting>>;
  where: InputMaybe<CmsProjectFilter>;
};


export type CmsRootQueryAllProjectContentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsProjectContentSorting>>;
  where: InputMaybe<CmsProjectContentFilter>;
};


export type CmsRootQueryAllSanityFileAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsSanityFileAssetSorting>>;
  where: InputMaybe<CmsSanityFileAssetFilter>;
};


export type CmsRootQueryAllSanityImageAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<CmsSanityImageAssetSorting>>;
  where: InputMaybe<CmsSanityImageAssetFilter>;
};

export type CmsSanityAssetSourceData = {
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

export type CmsSanityAssetSourceDataFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  id: InputMaybe<CmsStringFilter>;
  name: InputMaybe<CmsStringFilter>;
  url: InputMaybe<CmsStringFilter>;
};

export type CmsSanityAssetSourceDataSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  id: InputMaybe<CmsSortOrder>;
  name: InputMaybe<CmsSortOrder>;
  url: InputMaybe<CmsSortOrder>;
};

export type CmsSanityFileAsset = CmsDocument & {
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
  source: Maybe<CmsSanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type CmsSanityFileAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
  altText: InputMaybe<CmsStringFilter>;
  assetId: InputMaybe<CmsStringFilter>;
  description: InputMaybe<CmsStringFilter>;
  extension: InputMaybe<CmsStringFilter>;
  label: InputMaybe<CmsStringFilter>;
  mimeType: InputMaybe<CmsStringFilter>;
  originalFilename: InputMaybe<CmsStringFilter>;
  path: InputMaybe<CmsStringFilter>;
  sha1hash: InputMaybe<CmsStringFilter>;
  size: InputMaybe<CmsFloatFilter>;
  source: InputMaybe<CmsSanityAssetSourceDataFilter>;
  title: InputMaybe<CmsStringFilter>;
  url: InputMaybe<CmsStringFilter>;
};

export type CmsSanityFileAssetSorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
  altText: InputMaybe<CmsSortOrder>;
  assetId: InputMaybe<CmsSortOrder>;
  description: InputMaybe<CmsSortOrder>;
  extension: InputMaybe<CmsSortOrder>;
  label: InputMaybe<CmsSortOrder>;
  mimeType: InputMaybe<CmsSortOrder>;
  originalFilename: InputMaybe<CmsSortOrder>;
  path: InputMaybe<CmsSortOrder>;
  sha1hash: InputMaybe<CmsSortOrder>;
  size: InputMaybe<CmsSortOrder>;
  source: InputMaybe<CmsSanityAssetSourceDataSorting>;
  title: InputMaybe<CmsSortOrder>;
  url: InputMaybe<CmsSortOrder>;
};

export type CmsSanityImageAsset = CmsDocument & {
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
  metadata: Maybe<CmsSanityImageMetadata>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<CmsSanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  uploadId: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type CmsSanityImageAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<CmsSanity_DocumentFilter>;
  _createdAt: InputMaybe<CmsDatetimeFilter>;
  _id: InputMaybe<CmsIdFilter>;
  _key: InputMaybe<CmsStringFilter>;
  _rev: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  _updatedAt: InputMaybe<CmsDatetimeFilter>;
  altText: InputMaybe<CmsStringFilter>;
  assetId: InputMaybe<CmsStringFilter>;
  description: InputMaybe<CmsStringFilter>;
  extension: InputMaybe<CmsStringFilter>;
  label: InputMaybe<CmsStringFilter>;
  metadata: InputMaybe<CmsSanityImageMetadataFilter>;
  mimeType: InputMaybe<CmsStringFilter>;
  originalFilename: InputMaybe<CmsStringFilter>;
  path: InputMaybe<CmsStringFilter>;
  sha1hash: InputMaybe<CmsStringFilter>;
  size: InputMaybe<CmsFloatFilter>;
  source: InputMaybe<CmsSanityAssetSourceDataFilter>;
  title: InputMaybe<CmsStringFilter>;
  uploadId: InputMaybe<CmsStringFilter>;
  url: InputMaybe<CmsStringFilter>;
};

export type CmsSanityImageAssetSorting = {
  _createdAt: InputMaybe<CmsSortOrder>;
  _id: InputMaybe<CmsSortOrder>;
  _key: InputMaybe<CmsSortOrder>;
  _rev: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  _updatedAt: InputMaybe<CmsSortOrder>;
  altText: InputMaybe<CmsSortOrder>;
  assetId: InputMaybe<CmsSortOrder>;
  description: InputMaybe<CmsSortOrder>;
  extension: InputMaybe<CmsSortOrder>;
  label: InputMaybe<CmsSortOrder>;
  metadata: InputMaybe<CmsSanityImageMetadataSorting>;
  mimeType: InputMaybe<CmsSortOrder>;
  originalFilename: InputMaybe<CmsSortOrder>;
  path: InputMaybe<CmsSortOrder>;
  sha1hash: InputMaybe<CmsSortOrder>;
  size: InputMaybe<CmsSortOrder>;
  source: InputMaybe<CmsSanityAssetSourceDataSorting>;
  title: InputMaybe<CmsSortOrder>;
  uploadId: InputMaybe<CmsSortOrder>;
  url: InputMaybe<CmsSortOrder>;
};

export type CmsSanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  bottom: Maybe<Scalars['Float']>;
  left: Maybe<Scalars['Float']>;
  right: Maybe<Scalars['Float']>;
  top: Maybe<Scalars['Float']>;
};

export type CmsSanityImageCropFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  bottom: InputMaybe<CmsFloatFilter>;
  left: InputMaybe<CmsFloatFilter>;
  right: InputMaybe<CmsFloatFilter>;
  top: InputMaybe<CmsFloatFilter>;
};

export type CmsSanityImageCropSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  bottom: InputMaybe<CmsSortOrder>;
  left: InputMaybe<CmsSortOrder>;
  right: InputMaybe<CmsSortOrder>;
  top: InputMaybe<CmsSortOrder>;
};

export type CmsSanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
};

export type CmsSanityImageDimensionsFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  aspectRatio: InputMaybe<CmsFloatFilter>;
  height: InputMaybe<CmsFloatFilter>;
  width: InputMaybe<CmsFloatFilter>;
};

export type CmsSanityImageDimensionsSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  aspectRatio: InputMaybe<CmsSortOrder>;
  height: InputMaybe<CmsSortOrder>;
  width: InputMaybe<CmsSortOrder>;
};

export type CmsSanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
  x: Maybe<Scalars['Float']>;
  y: Maybe<Scalars['Float']>;
};

export type CmsSanityImageHotspotFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  height: InputMaybe<CmsFloatFilter>;
  width: InputMaybe<CmsFloatFilter>;
  x: InputMaybe<CmsFloatFilter>;
  y: InputMaybe<CmsFloatFilter>;
};

export type CmsSanityImageHotspotSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  height: InputMaybe<CmsSortOrder>;
  width: InputMaybe<CmsSortOrder>;
  x: InputMaybe<CmsSortOrder>;
  y: InputMaybe<CmsSortOrder>;
};

export type CmsSanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  blurHash: Maybe<Scalars['String']>;
  dimensions: Maybe<CmsSanityImageDimensions>;
  hasAlpha: Maybe<Scalars['Boolean']>;
  isOpaque: Maybe<Scalars['Boolean']>;
  location: Maybe<CmsGeopoint>;
  lqip: Maybe<Scalars['String']>;
  palette: Maybe<CmsSanityImagePalette>;
};

export type CmsSanityImageMetadataFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  blurHash: InputMaybe<CmsStringFilter>;
  dimensions: InputMaybe<CmsSanityImageDimensionsFilter>;
  hasAlpha: InputMaybe<CmsBooleanFilter>;
  isOpaque: InputMaybe<CmsBooleanFilter>;
  location: InputMaybe<CmsGeopointFilter>;
  lqip: InputMaybe<CmsStringFilter>;
  palette: InputMaybe<CmsSanityImagePaletteFilter>;
};

export type CmsSanityImageMetadataSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  blurHash: InputMaybe<CmsSortOrder>;
  dimensions: InputMaybe<CmsSanityImageDimensionsSorting>;
  hasAlpha: InputMaybe<CmsSortOrder>;
  isOpaque: InputMaybe<CmsSortOrder>;
  location: InputMaybe<CmsGeopointSorting>;
  lqip: InputMaybe<CmsSortOrder>;
  palette: InputMaybe<CmsSanityImagePaletteSorting>;
};

export type CmsSanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  darkMuted: Maybe<CmsSanityImagePaletteSwatch>;
  darkVibrant: Maybe<CmsSanityImagePaletteSwatch>;
  dominant: Maybe<CmsSanityImagePaletteSwatch>;
  lightMuted: Maybe<CmsSanityImagePaletteSwatch>;
  lightVibrant: Maybe<CmsSanityImagePaletteSwatch>;
  muted: Maybe<CmsSanityImagePaletteSwatch>;
  vibrant: Maybe<CmsSanityImagePaletteSwatch>;
};

export type CmsSanityImagePaletteFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  darkMuted: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  darkVibrant: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  dominant: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  lightMuted: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  lightVibrant: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  muted: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
  vibrant: InputMaybe<CmsSanityImagePaletteSwatchFilter>;
};

export type CmsSanityImagePaletteSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  darkMuted: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  darkVibrant: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  dominant: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  lightMuted: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  lightVibrant: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  muted: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
  vibrant: InputMaybe<CmsSanityImagePaletteSwatchSorting>;
};

export type CmsSanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
  foreground: Maybe<Scalars['String']>;
  population: Maybe<Scalars['Float']>;
  title: Maybe<Scalars['String']>;
};

export type CmsSanityImagePaletteSwatchFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  background: InputMaybe<CmsStringFilter>;
  foreground: InputMaybe<CmsStringFilter>;
  population: InputMaybe<CmsFloatFilter>;
  title: InputMaybe<CmsStringFilter>;
};

export type CmsSanityImagePaletteSwatchSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  background: InputMaybe<CmsSortOrder>;
  foreground: InputMaybe<CmsSortOrder>;
  population: InputMaybe<CmsSortOrder>;
  title: InputMaybe<CmsSortOrder>;
};

export type CmsSanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft: InputMaybe<Scalars['Boolean']>;
  /** All documents referencing the given document ID. */
  references: InputMaybe<Scalars['ID']>;
};

export type CmsSlug = {
  __typename?: 'Slug';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  current: Maybe<Scalars['String']>;
  source: Maybe<Scalars['String']>;
};

export type CmsSlugFilter = {
  _key: InputMaybe<CmsStringFilter>;
  _type: InputMaybe<CmsStringFilter>;
  current: InputMaybe<CmsStringFilter>;
  source: InputMaybe<CmsStringFilter>;
};

export type CmsSlugSorting = {
  _key: InputMaybe<CmsSortOrder>;
  _type: InputMaybe<CmsSortOrder>;
  current: InputMaybe<CmsSortOrder>;
  source: InputMaybe<CmsSortOrder>;
};

export enum CmsSortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC'
}

export type CmsSpan = {
  __typename?: 'Span';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  marks: Maybe<Array<Maybe<Scalars['String']>>>;
  text: Maybe<Scalars['String']>;
};

export type CmsStringFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<Scalars['String']>>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['String']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['String']>;
  nin: InputMaybe<Array<Scalars['String']>>;
};

export type CmsProjectFragmentFragment = { __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null };

export type CmsProjectContentFragmentFragment = { __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null };

export type GetCmsProjectQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type GetCmsProjectQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null }> };

export type GetCmsProjectContentQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type GetCmsProjectContentQuery = { __typename?: 'RootQuery', allProjectContent: Array<{ __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null }> };

export type GetAllCmsProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCmsProjectsQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null }> };

export type GetAllCmsProjectContentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCmsProjectContentQuery = { __typename?: 'RootQuery', allProjectContent: Array<{ __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null }> };

export const CmsProjectFragmentFragmentDoc = gql`
    fragment CMSProjectFragment on Project {
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
export const CmsProjectContentFragmentFragmentDoc = gql`
    fragment CMSProjectContentFragment on ProjectContent {
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
export const GetCmsProjectDocument = gql`
    query getCMSProject($registry: String!, $registryProjectId: String!) {
  allProject(
    where: {registry: {eq: $registry}, registryProjectId: {eq: $registryProjectId}}
  ) {
    ...CMSProjectFragment
  }
}
    ${CmsProjectFragmentFragmentDoc}`;
export const GetCmsProjectContentDocument = gql`
    query getCMSProjectContent($registry: String!, $registryProjectId: String!) {
  allProjectContent(
    where: {project: {registryProjectId: {eq: $registryProjectId}, registry: {eq: $registry}}}
  ) {
    ...CMSProjectContentFragment
  }
}
    ${CmsProjectContentFragmentFragmentDoc}`;
export const GetAllCmsProjectsDocument = gql`
    query getAllCMSProjects {
  allProject {
    ...CMSProjectFragment
  }
}
    ${CmsProjectFragmentFragmentDoc}`;
export const GetAllCmsProjectContentDocument = gql`
    query getAllCMSProjectContent {
  allProjectContent {
    ...CMSProjectContentFragment
  }
}
    ${CmsProjectContentFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCMSProject(variables: GetCmsProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCmsProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCmsProjectQuery>(GetCmsProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCMSProject', 'query');
    },
    getCMSProjectContent(variables: GetCmsProjectContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCmsProjectContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCmsProjectContentQuery>(GetCmsProjectContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCMSProjectContent', 'query');
    },
    getAllCMSProjects(variables?: GetAllCmsProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCmsProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCmsProjectsQuery>(GetAllCmsProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCMSProjects', 'query');
    },
    getAllCMSProjectContent(variables?: GetAllCmsProjectContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCmsProjectContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCmsProjectContentQuery>(GetAllCmsProjectContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCMSProjectContent', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;