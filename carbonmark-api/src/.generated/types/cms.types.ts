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

export type Block = {
  __typename?: 'Block';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  children: Maybe<Array<Maybe<Span>>>;
  list: Maybe<Scalars['String']>;
  style: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is defined. */
  is_defined: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Boolean']>;
};

export type CrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _dataset: Maybe<Scalars['String']>;
  _key: Maybe<Scalars['String']>;
  _projectId: Maybe<Scalars['String']>;
  _ref: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  _weak: Maybe<Scalars['Boolean']>;
};

export type CrossDatasetReferenceFilter = {
  _dataset: InputMaybe<StringFilter>;
  _key: InputMaybe<StringFilter>;
  _projectId: InputMaybe<StringFilter>;
  _ref: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _weak: InputMaybe<BooleanFilter>;
};

export type CrossDatasetReferenceSorting = {
  _dataset: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _projectId: InputMaybe<SortOrder>;
  _ref: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _weak: InputMaybe<SortOrder>;
};

export type DateFilter = {
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

export type DatetimeFilter = {
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
export type Document = {
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

export type DocumentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
};

export type DocumentSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
};

export type ExternalFile = {
  __typename?: 'ExternalFile';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  filename: Maybe<Scalars['String']>;
  mimetype: Maybe<Scalars['String']>;
  uri: Maybe<Scalars['String']>;
};

export type ExternalFileFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  filename: InputMaybe<StringFilter>;
  mimetype: InputMaybe<StringFilter>;
  uri: InputMaybe<StringFilter>;
};

export type ExternalFileSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  filename: InputMaybe<SortOrder>;
  mimetype: InputMaybe<SortOrder>;
  uri: InputMaybe<SortOrder>;
};

export type File = {
  __typename?: 'File';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<SanityFileAsset>;
};

export type FileFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  asset: InputMaybe<SanityFileAssetFilter>;
};

export type FileSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type FloatFilter = {
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

export type Geopoint = {
  __typename?: 'Geopoint';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  alt: Maybe<Scalars['Float']>;
  lat: Maybe<Scalars['Float']>;
  lng: Maybe<Scalars['Float']>;
};

export type GeopointFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  alt: InputMaybe<FloatFilter>;
  lat: InputMaybe<FloatFilter>;
  lng: InputMaybe<FloatFilter>;
};

export type GeopointSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  alt: InputMaybe<SortOrder>;
  lat: InputMaybe<SortOrder>;
  lng: InputMaybe<SortOrder>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<Scalars['ID']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['ID']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['ID']>;
  nin: InputMaybe<Array<Scalars['ID']>>;
};

export type Image = {
  __typename?: 'Image';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<SanityImageAsset>;
  crop: Maybe<SanityImageCrop>;
  hotspot: Maybe<SanityImageHotspot>;
};

export type ImageFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  asset: InputMaybe<SanityImageAssetFilter>;
  crop: InputMaybe<SanityImageCropFilter>;
  hotspot: InputMaybe<SanityImageHotspotFilter>;
};

export type ImageSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  crop: InputMaybe<SanityImageCropSorting>;
  hotspot: InputMaybe<SanityImageHotspotSorting>;
};

export type IntFilter = {
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

export type Methodology = Document & {
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
  id: Maybe<Slug>;
  /** Link to the authoritative methodology webpage or PDF document */
  link: Maybe<Scalars['String']>;
  /** Methodology name. Use 'Title Case Capitalization'. No trailing period. No version number. */
  name: Maybe<Scalars['String']>;
};

export type MethodologyFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  category: InputMaybe<StringFilter>;
  id: InputMaybe<SlugFilter>;
  link: InputMaybe<StringFilter>;
  name: InputMaybe<StringFilter>;
};

export type MethodologySorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  category: InputMaybe<SortOrder>;
  id: InputMaybe<SlugSorting>;
  link: InputMaybe<SortOrder>;
  name: InputMaybe<SortOrder>;
};

export type Project = Document & {
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
  boundary: Maybe<File>;
  ccbs: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Is this project CORSIA compliant? */
  corsia: Maybe<Scalars['Boolean']>;
  /** ISO-3166 English Short Name of the country where the project was implemented */
  country: Maybe<Scalars['String']>;
  /** Official project description as it appears in the originating registry */
  description: Maybe<Scalars['String']>;
  externalDocuments: Maybe<Array<Maybe<ExternalFile>>>;
  externalMedia: Maybe<Array<Maybe<ExternalFile>>>;
  geolocation: Maybe<Geopoint>;
  id: Maybe<Slug>;
  methodologies: Maybe<Array<Maybe<Methodology>>>;
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

export type ProjectContent = Document & {
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
  coverImage: Maybe<Image>;
  images: Maybe<Array<Maybe<Image>>>;
  /** Longer description */
  longDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the long description was generated or procured, so that this work can be reproduced by others. */
  longDescriptionMeta: Maybe<Scalars['String']>;
  /** Use this space to document how this media was generated or procured, so that this work can be reproduced by others. */
  notes: Maybe<Scalars['String']>;
  /** The project this content is associated with */
  project: Maybe<Project>;
  /** Short description, e.g. for retirement PDFs. Ideally 300-600 chars, no newlines, no bullet points. */
  shortDescription: Maybe<Scalars['String']>;
  /** Use this space to document how the short description was generated or procured, so that this work can be reproduced by others. */
  shortDescriptionMeta: Maybe<Scalars['String']>;
};

export type ProjectContentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  coverImage: InputMaybe<ImageFilter>;
  longDescription: InputMaybe<StringFilter>;
  longDescriptionMeta: InputMaybe<StringFilter>;
  notes: InputMaybe<StringFilter>;
  project: InputMaybe<ProjectFilter>;
  shortDescription: InputMaybe<StringFilter>;
  shortDescriptionMeta: InputMaybe<StringFilter>;
};

export type ProjectContentSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  coverImage: InputMaybe<ImageSorting>;
  longDescription: InputMaybe<SortOrder>;
  longDescriptionMeta: InputMaybe<SortOrder>;
  notes: InputMaybe<SortOrder>;
  shortDescription: InputMaybe<SortOrder>;
  shortDescriptionMeta: InputMaybe<SortOrder>;
};

export type ProjectFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  boundary: InputMaybe<FileFilter>;
  corsia: InputMaybe<BooleanFilter>;
  country: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  geolocation: InputMaybe<GeopointFilter>;
  id: InputMaybe<SlugFilter>;
  name: InputMaybe<StringFilter>;
  projectWebsite: InputMaybe<StringFilter>;
  region: InputMaybe<StringFilter>;
  registry: InputMaybe<StringFilter>;
  registryProjectId: InputMaybe<StringFilter>;
  state: InputMaybe<StringFilter>;
  subcategory: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type ProjectSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  boundary: InputMaybe<FileSorting>;
  corsia: InputMaybe<SortOrder>;
  country: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  geolocation: InputMaybe<GeopointSorting>;
  id: InputMaybe<SlugSorting>;
  name: InputMaybe<SortOrder>;
  projectWebsite: InputMaybe<SortOrder>;
  region: InputMaybe<SortOrder>;
  registry: InputMaybe<SortOrder>;
  registryProjectId: InputMaybe<SortOrder>;
  state: InputMaybe<SortOrder>;
  subcategory: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  Document: Maybe<Document>;
  Methodology: Maybe<Methodology>;
  Project: Maybe<Project>;
  ProjectContent: Maybe<ProjectContent>;
  SanityFileAsset: Maybe<SanityFileAsset>;
  SanityImageAsset: Maybe<SanityImageAsset>;
  allDocument: Array<Document>;
  allMethodology: Array<Methodology>;
  allProject: Array<Project>;
  allProjectContent: Array<ProjectContent>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allSanityImageAsset: Array<SanityImageAsset>;
};


export type RootQueryDocumentArgs = {
  id: Scalars['ID'];
};


export type RootQueryMethodologyArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectContentArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID'];
};


export type RootQueryAllDocumentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<DocumentSorting>>;
  where: InputMaybe<DocumentFilter>;
};


export type RootQueryAllMethodologyArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<MethodologySorting>>;
  where: InputMaybe<MethodologyFilter>;
};


export type RootQueryAllProjectArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<ProjectSorting>>;
  where: InputMaybe<ProjectFilter>;
};


export type RootQueryAllProjectContentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<ProjectContentSorting>>;
  where: InputMaybe<ProjectContentFilter>;
};


export type RootQueryAllSanityFileAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<SanityFileAssetSorting>>;
  where: InputMaybe<SanityFileAssetFilter>;
};


export type RootQueryAllSanityImageAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<SanityImageAssetSorting>>;
  where: InputMaybe<SanityImageAssetFilter>;
};

export type SanityAssetSourceData = {
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

export type SanityAssetSourceDataFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  id: InputMaybe<StringFilter>;
  name: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  id: InputMaybe<SortOrder>;
  name: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityFileAsset = Document & {
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
  source: Maybe<SanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  altText: InputMaybe<StringFilter>;
  assetId: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  extension: InputMaybe<StringFilter>;
  label: InputMaybe<StringFilter>;
  mimeType: InputMaybe<StringFilter>;
  originalFilename: InputMaybe<StringFilter>;
  path: InputMaybe<StringFilter>;
  sha1hash: InputMaybe<StringFilter>;
  size: InputMaybe<FloatFilter>;
  source: InputMaybe<SanityAssetSourceDataFilter>;
  title: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityFileAssetSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  altText: InputMaybe<SortOrder>;
  assetId: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  extension: InputMaybe<SortOrder>;
  label: InputMaybe<SortOrder>;
  mimeType: InputMaybe<SortOrder>;
  originalFilename: InputMaybe<SortOrder>;
  path: InputMaybe<SortOrder>;
  sha1hash: InputMaybe<SortOrder>;
  size: InputMaybe<SortOrder>;
  source: InputMaybe<SanityAssetSourceDataSorting>;
  title: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityImageAsset = Document & {
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
  metadata: Maybe<SanityImageMetadata>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<SanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  uploadId: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  altText: InputMaybe<StringFilter>;
  assetId: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  extension: InputMaybe<StringFilter>;
  label: InputMaybe<StringFilter>;
  metadata: InputMaybe<SanityImageMetadataFilter>;
  mimeType: InputMaybe<StringFilter>;
  originalFilename: InputMaybe<StringFilter>;
  path: InputMaybe<StringFilter>;
  sha1hash: InputMaybe<StringFilter>;
  size: InputMaybe<FloatFilter>;
  source: InputMaybe<SanityAssetSourceDataFilter>;
  title: InputMaybe<StringFilter>;
  uploadId: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityImageAssetSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  altText: InputMaybe<SortOrder>;
  assetId: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  extension: InputMaybe<SortOrder>;
  label: InputMaybe<SortOrder>;
  metadata: InputMaybe<SanityImageMetadataSorting>;
  mimeType: InputMaybe<SortOrder>;
  originalFilename: InputMaybe<SortOrder>;
  path: InputMaybe<SortOrder>;
  sha1hash: InputMaybe<SortOrder>;
  size: InputMaybe<SortOrder>;
  source: InputMaybe<SanityAssetSourceDataSorting>;
  title: InputMaybe<SortOrder>;
  uploadId: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  bottom: Maybe<Scalars['Float']>;
  left: Maybe<Scalars['Float']>;
  right: Maybe<Scalars['Float']>;
  top: Maybe<Scalars['Float']>;
};

export type SanityImageCropFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  bottom: InputMaybe<FloatFilter>;
  left: InputMaybe<FloatFilter>;
  right: InputMaybe<FloatFilter>;
  top: InputMaybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  bottom: InputMaybe<SortOrder>;
  left: InputMaybe<SortOrder>;
  right: InputMaybe<SortOrder>;
  top: InputMaybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
};

export type SanityImageDimensionsFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  aspectRatio: InputMaybe<FloatFilter>;
  height: InputMaybe<FloatFilter>;
  width: InputMaybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  aspectRatio: InputMaybe<SortOrder>;
  height: InputMaybe<SortOrder>;
  width: InputMaybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
  x: Maybe<Scalars['Float']>;
  y: Maybe<Scalars['Float']>;
};

export type SanityImageHotspotFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  height: InputMaybe<FloatFilter>;
  width: InputMaybe<FloatFilter>;
  x: InputMaybe<FloatFilter>;
  y: InputMaybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  height: InputMaybe<SortOrder>;
  width: InputMaybe<SortOrder>;
  x: InputMaybe<SortOrder>;
  y: InputMaybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  blurHash: Maybe<Scalars['String']>;
  dimensions: Maybe<SanityImageDimensions>;
  hasAlpha: Maybe<Scalars['Boolean']>;
  isOpaque: Maybe<Scalars['Boolean']>;
  location: Maybe<Geopoint>;
  lqip: Maybe<Scalars['String']>;
  palette: Maybe<SanityImagePalette>;
};

export type SanityImageMetadataFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  blurHash: InputMaybe<StringFilter>;
  dimensions: InputMaybe<SanityImageDimensionsFilter>;
  hasAlpha: InputMaybe<BooleanFilter>;
  isOpaque: InputMaybe<BooleanFilter>;
  location: InputMaybe<GeopointFilter>;
  lqip: InputMaybe<StringFilter>;
  palette: InputMaybe<SanityImagePaletteFilter>;
};

export type SanityImageMetadataSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  blurHash: InputMaybe<SortOrder>;
  dimensions: InputMaybe<SanityImageDimensionsSorting>;
  hasAlpha: InputMaybe<SortOrder>;
  isOpaque: InputMaybe<SortOrder>;
  location: InputMaybe<GeopointSorting>;
  lqip: InputMaybe<SortOrder>;
  palette: InputMaybe<SanityImagePaletteSorting>;
};

export type SanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  darkMuted: Maybe<SanityImagePaletteSwatch>;
  darkVibrant: Maybe<SanityImagePaletteSwatch>;
  dominant: Maybe<SanityImagePaletteSwatch>;
  lightMuted: Maybe<SanityImagePaletteSwatch>;
  lightVibrant: Maybe<SanityImagePaletteSwatch>;
  muted: Maybe<SanityImagePaletteSwatch>;
  vibrant: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  darkMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  darkVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  dominant: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  muted: InputMaybe<SanityImagePaletteSwatchFilter>;
  vibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  darkMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  darkVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  dominant: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  muted: InputMaybe<SanityImagePaletteSwatchSorting>;
  vibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
  foreground: Maybe<Scalars['String']>;
  population: Maybe<Scalars['Float']>;
  title: Maybe<Scalars['String']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  background: InputMaybe<StringFilter>;
  foreground: InputMaybe<StringFilter>;
  population: InputMaybe<FloatFilter>;
  title: InputMaybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  background: InputMaybe<SortOrder>;
  foreground: InputMaybe<SortOrder>;
  population: InputMaybe<SortOrder>;
  title: InputMaybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft: InputMaybe<Scalars['Boolean']>;
  /** All documents referencing the given document ID. */
  references: InputMaybe<Scalars['ID']>;
};

export type Slug = {
  __typename?: 'Slug';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  current: Maybe<Scalars['String']>;
  source: Maybe<Scalars['String']>;
};

export type SlugFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  current: InputMaybe<StringFilter>;
  source: InputMaybe<StringFilter>;
};

export type SlugSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  current: InputMaybe<SortOrder>;
  source: InputMaybe<SortOrder>;
};

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  ASC = 'ASC',
  /** Sorts on the value in descending order. */
  DESC = 'DESC'
}

export type Span = {
  __typename?: 'Span';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  marks: Maybe<Array<Maybe<Scalars['String']>>>;
  text: Maybe<Scalars['String']>;
};

export type StringFilter = {
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

export type CmsProjectFragmentFragment = { __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null, externalMedia: Array<{ __typename?: 'ExternalFile', uri: string | null, description: string | null } | null> | null };

export type CmsProjectContentFragmentFragment = { __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null };

export type GetCmsProjectQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type GetCmsProjectQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null, externalMedia: Array<{ __typename?: 'ExternalFile', uri: string | null, description: string | null } | null> | null }> };

export type GetCmsProjectContentQueryVariables = Exact<{
  registry: Scalars['String'];
  registryProjectId: Scalars['String'];
}>;


export type GetCmsProjectContentQuery = { __typename?: 'RootQuery', allProjectContent: Array<{ __typename?: 'ProjectContent', shortDescription: string | null, longDescription: string | null, project: { __typename?: 'Project', registry: string | null, registryProjectId: string | null } | null, coverImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null } | null } | null, images: Array<{ __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string | null, label: string | null, title: string | null, altText: string | null } | null } | null> | null }> };

export type GetAllCmsProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCmsProjectsQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', country: string | null, description: string | null, name: string | null, region: string | null, registry: string | null, url: string | null, registryProjectId: string | null, id: string | null, geolocation: { __typename?: 'Geopoint', lat: number | null, lng: number | null, alt: number | null } | null, methodologies: Array<{ __typename?: 'Methodology', category: string | null, name: string | null, id: string | null } | null> | null, externalMedia: Array<{ __typename?: 'ExternalFile', uri: string | null, description: string | null } | null> | null }> };

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
  externalMedia {
    uri
    description
  }
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