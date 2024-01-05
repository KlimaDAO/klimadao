//@ts-nocheck
import { CmsBlock, CmsBooleanFilter, CmsCrossDatasetReference, CmsCrossDatasetReferenceFilter, CmsCrossDatasetReferenceSorting, CmsDateFilter, CmsDatetimeFilter, CmsDocument, CmsDocumentFilter, CmsDocumentSorting, CmsExternalFile, CmsExternalFileFilter, CmsExternalFileSorting, CmsFile, CmsFileFilter, CmsFileSorting, CmsFloatFilter, CmsGeopoint, CmsGeopointFilter, CmsGeopointSorting, CmsIdFilter, CmsImage, CmsImageFilter, CmsImageSorting, CmsIntFilter, CmsMethodology, CmsMethodologyFilter, CmsMethodologySorting, CmsProject, CmsProjectContent, CmsProjectContentFilter, CmsProjectContentSorting, CmsProjectFilter, CmsProjectSorting, CmsRootQuery, CmsSanityAssetSourceData, CmsSanityAssetSourceDataFilter, CmsSanityAssetSourceDataSorting, CmsSanityFileAsset, CmsSanityFileAssetFilter, CmsSanityFileAssetSorting, CmsSanityImageAsset, CmsSanityImageAssetFilter, CmsSanityImageAssetSorting, CmsSanityImageCrop, CmsSanityImageCropFilter, CmsSanityImageCropSorting, CmsSanityImageDimensions, CmsSanityImageDimensionsFilter, CmsSanityImageDimensionsSorting, CmsSanityImageHotspot, CmsSanityImageHotspotFilter, CmsSanityImageHotspotSorting, CmsSanityImageMetadata, CmsSanityImageMetadataFilter, CmsSanityImageMetadataSorting, CmsSanityImagePalette, CmsSanityImagePaletteFilter, CmsSanityImagePaletteSorting, CmsSanityImagePaletteSwatch, CmsSanityImagePaletteSwatchFilter, CmsSanityImagePaletteSwatchSorting, CmsSanity_DocumentFilter, CmsSlug, CmsSlugFilter, CmsSlugSorting, CmsSpan, CmsStringFilter, SortOrder } from '../types/cms.types';

export const aCmsBlock = (overrides?: Partial<CmsBlock>, _relationshipsToOmit: Set<string> = new Set()): CmsBlock => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Block');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'aut',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'saepe',
        children: overrides && overrides.hasOwnProperty('children') ? overrides.children! : [relationshipsToOmit.has('Span') ? {} as Span : aCmsSpan({}, relationshipsToOmit)],
        list: overrides && overrides.hasOwnProperty('list') ? overrides.list! : 'dolores',
        style: overrides && overrides.hasOwnProperty('style') ? overrides.style! : 'facere',
    };
};

export const aCmsBooleanFilter = (overrides?: Partial<CmsBooleanFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsBooleanFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('BooleanFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : false,
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : false,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : false,
    };
};

export const aCmsCrossDatasetReference = (overrides?: Partial<CmsCrossDatasetReference>, _relationshipsToOmit: Set<string> = new Set()): CmsCrossDatasetReference => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('CrossDatasetReference');
    return {
        _dataset: overrides && overrides.hasOwnProperty('_dataset') ? overrides._dataset! : 'et',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'sed',
        _projectId: overrides && overrides.hasOwnProperty('_projectId') ? overrides._projectId! : 'tenetur',
        _ref: overrides && overrides.hasOwnProperty('_ref') ? overrides._ref! : 'dolore',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'maxime',
        _weak: overrides && overrides.hasOwnProperty('_weak') ? overrides._weak! : true,
    };
};

export const aCmsCrossDatasetReferenceFilter = (overrides?: Partial<CmsCrossDatasetReferenceFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsCrossDatasetReferenceFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('CrossDatasetReferenceFilter');
    return {
        _dataset: overrides && overrides.hasOwnProperty('_dataset') ? overrides._dataset! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _projectId: overrides && overrides.hasOwnProperty('_projectId') ? overrides._projectId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _ref: overrides && overrides.hasOwnProperty('_ref') ? overrides._ref! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _weak: overrides && overrides.hasOwnProperty('_weak') ? overrides._weak! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aCmsBooleanFilter({}, relationshipsToOmit),
    };
};

export const aCmsCrossDatasetReferenceSorting = (overrides?: Partial<CmsCrossDatasetReferenceSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsCrossDatasetReferenceSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('CrossDatasetReferenceSorting');
    return {
        _dataset: overrides && overrides.hasOwnProperty('_dataset') ? overrides._dataset! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _projectId: overrides && overrides.hasOwnProperty('_projectId') ? overrides._projectId! : SortOrder.Asc,
        _ref: overrides && overrides.hasOwnProperty('_ref') ? overrides._ref! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _weak: overrides && overrides.hasOwnProperty('_weak') ? overrides._weak! : SortOrder.Asc,
    };
};

export const aCmsDateFilter = (overrides?: Partial<CmsDateFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsDateFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DateFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : '1970-01-10T16:14:27.972Z',
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : '1970-01-05T09:17:44.773Z',
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : '1970-01-10T16:05:23.460Z',
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : false,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : '1970-01-11T07:38:26.649Z',
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : '1970-01-11T14:10:50.732Z',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : '1970-01-14T01:42:37.432Z',
    };
};

export const aCmsDatetimeFilter = (overrides?: Partial<CmsDatetimeFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsDatetimeFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DatetimeFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 'aliquam',
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 'temporibus',
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 'cumque',
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : false,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 'odio',
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 'qui',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 'cupiditate',
    };
};

export const aCmsDocument = (overrides?: Partial<CmsDocument>, _relationshipsToOmit: Set<string> = new Set()): CmsDocument => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Document');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'ipsam',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '10ffbb65-e477-477a-97ac-b38c1dd5a90f',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'atque',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'et',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'voluptas',
    };
};

export const aCmsDocumentFilter = (overrides?: Partial<CmsDocumentFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsDocumentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DocumentFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
    };
};

export const aCmsDocumentSorting = (overrides?: Partial<CmsDocumentSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsDocumentSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DocumentSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
    };
};

export const aCmsExternalFile = (overrides?: Partial<CmsExternalFile>, _relationshipsToOmit: Set<string> = new Set()): CmsExternalFile => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ExternalFile');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'architecto',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'nesciunt',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'harum',
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'praesentium',
        mimetype: overrides && overrides.hasOwnProperty('mimetype') ? overrides.mimetype! : 'beatae',
        uri: overrides && overrides.hasOwnProperty('uri') ? overrides.uri! : 'qui',
    };
};

export const aCmsExternalFileFilter = (overrides?: Partial<CmsExternalFileFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsExternalFileFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ExternalFileFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        mimetype: overrides && overrides.hasOwnProperty('mimetype') ? overrides.mimetype! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        uri: overrides && overrides.hasOwnProperty('uri') ? overrides.uri! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsExternalFileSorting = (overrides?: Partial<CmsExternalFileSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsExternalFileSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ExternalFileSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : SortOrder.Asc,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : SortOrder.Asc,
        mimetype: overrides && overrides.hasOwnProperty('mimetype') ? overrides.mimetype! : SortOrder.Asc,
        uri: overrides && overrides.hasOwnProperty('uri') ? overrides.uri! : SortOrder.Asc,
    };
};

export const aCmsFile = (overrides?: Partial<CmsFile>, _relationshipsToOmit: Set<string> = new Set()): CmsFile => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('File');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'consequatur',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'at',
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aCmsSanityFileAsset({}, relationshipsToOmit),
    };
};

export const aCmsFileFilter = (overrides?: Partial<CmsFileFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsFileFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FileFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityFileAssetFilter') ? {} as SanityFileAssetFilter : aCmsSanityFileAssetFilter({}, relationshipsToOmit),
    };
};

export const aCmsFileSorting = (overrides?: Partial<CmsFileSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsFileSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FileSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
    };
};

export const aCmsFloatFilter = (overrides?: Partial<CmsFloatFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsFloatFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FloatFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 4.03,
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 5.81,
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 8.02,
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : false,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 8.06,
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 2.07,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 3.98,
    };
};

export const aCmsGeopoint = (overrides?: Partial<CmsGeopoint>, _relationshipsToOmit: Set<string> = new Set()): CmsGeopoint => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Geopoint');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'nihil',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'et',
        alt: overrides && overrides.hasOwnProperty('alt') ? overrides.alt! : 1.83,
        lat: overrides && overrides.hasOwnProperty('lat') ? overrides.lat! : 5.08,
        lng: overrides && overrides.hasOwnProperty('lng') ? overrides.lng! : 2.87,
    };
};

export const aCmsGeopointFilter = (overrides?: Partial<CmsGeopointFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsGeopointFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('GeopointFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        alt: overrides && overrides.hasOwnProperty('alt') ? overrides.alt! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        lat: overrides && overrides.hasOwnProperty('lat') ? overrides.lat! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        lng: overrides && overrides.hasOwnProperty('lng') ? overrides.lng! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
    };
};

export const aCmsGeopointSorting = (overrides?: Partial<CmsGeopointSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsGeopointSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('GeopointSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        alt: overrides && overrides.hasOwnProperty('alt') ? overrides.alt! : SortOrder.Asc,
        lat: overrides && overrides.hasOwnProperty('lat') ? overrides.lat! : SortOrder.Asc,
        lng: overrides && overrides.hasOwnProperty('lng') ? overrides.lng! : SortOrder.Asc,
    };
};

export const aCmsIdFilter = (overrides?: Partial<CmsIdFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsIdFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('IdFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : '1ed41c05-ece7-4971-8f55-5b0e2923ebe8',
        in: overrides && overrides.hasOwnProperty('in') ? overrides.in! : ['7fe718b5-aa68-4388-8ade-7507e321ec5f'],
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : 'b9a19f02-6f4b-41cf-9d1e-0ec27d6100ee',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 'd59a235b-3b41-4d16-a178-1631e6ed6cf6',
        nin: overrides && overrides.hasOwnProperty('nin') ? overrides.nin! : ['69f3a05d-1f2f-4000-b096-5500d521eec7'],
    };
};

export const aCmsImage = (overrides?: Partial<CmsImage>, _relationshipsToOmit: Set<string> = new Set()): CmsImage => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Image');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'molestias',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'dolorum',
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aCmsSanityImageAsset({}, relationshipsToOmit),
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCrop') ? {} as SanityImageCrop : aCmsSanityImageCrop({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspot') ? {} as SanityImageHotspot : aCmsSanityImageHotspot({}, relationshipsToOmit),
    };
};

export const aCmsImageFilter = (overrides?: Partial<CmsImageFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsImageFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ImageFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityImageAssetFilter') ? {} as SanityImageAssetFilter : aCmsSanityImageAssetFilter({}, relationshipsToOmit),
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCropFilter') ? {} as SanityImageCropFilter : aCmsSanityImageCropFilter({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspotFilter') ? {} as SanityImageHotspotFilter : aCmsSanityImageHotspotFilter({}, relationshipsToOmit),
    };
};

export const aCmsImageSorting = (overrides?: Partial<CmsImageSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsImageSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ImageSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCropSorting') ? {} as SanityImageCropSorting : aCmsSanityImageCropSorting({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspotSorting') ? {} as SanityImageHotspotSorting : aCmsSanityImageHotspotSorting({}, relationshipsToOmit),
    };
};

export const aCmsIntFilter = (overrides?: Partial<CmsIntFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsIntFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('IntFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 9154,
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 2833,
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 492,
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : false,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 8311,
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 6047,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 4351,
    };
};

export const aCmsMethodology = (overrides?: Partial<CmsMethodology>, _relationshipsToOmit: Set<string> = new Set()): CmsMethodology => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Methodology');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'earum',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : 'a2b19442-3b22-4b01-9af8-9a19addc3e13',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'dolorum',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'iusto',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'facilis',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'voluptas',
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : 'ut',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('Slug') ? {} as Slug : aCmsSlug({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : 'nobis',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'iusto',
    };
};

export const aCmsMethodologyFilter = (overrides?: Partial<CmsMethodologyFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsMethodologyFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('MethodologyFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugFilter') ? {} as SlugFilter : aCmsSlugFilter({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsMethodologySorting = (overrides?: Partial<CmsMethodologySorting>, _relationshipsToOmit: Set<string> = new Set()): CmsMethodologySorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('MethodologySorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : SortOrder.Asc,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugSorting') ? {} as SlugSorting : aCmsSlugSorting({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : SortOrder.Asc,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : SortOrder.Asc,
    };
};

export const aCmsProject = (overrides?: Partial<CmsProject>, _relationshipsToOmit: Set<string> = new Set()): CmsProject => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Project');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'dolore',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '02d36956-576b-48ef-988f-5a7c952f91b8',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'esse',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'quia',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'laudantium',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'suscipit',
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('File') ? {} as File : aCmsFile({}, relationshipsToOmit),
        ccbs: overrides && overrides.hasOwnProperty('ccbs') ? overrides.ccbs! : ['voluptas'],
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : false,
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'perspiciatis',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'voluptatem',
        externalDocuments: overrides && overrides.hasOwnProperty('externalDocuments') ? overrides.externalDocuments! : [relationshipsToOmit.has('ExternalFile') ? {} as ExternalFile : aCmsExternalFile({}, relationshipsToOmit)],
        externalMedia: overrides && overrides.hasOwnProperty('externalMedia') ? overrides.externalMedia! : [relationshipsToOmit.has('ExternalFile') ? {} as ExternalFile : aCmsExternalFile({}, relationshipsToOmit)],
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('Geopoint') ? {} as Geopoint : aCmsGeopoint({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('Slug') ? {} as Slug : aCmsSlug({}, relationshipsToOmit),
        methodologies: overrides && overrides.hasOwnProperty('methodologies') ? overrides.methodologies! : [relationshipsToOmit.has('Methodology') ? {} as Methodology : aCmsMethodology({}, relationshipsToOmit)],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'et',
        projectWebsite: overrides && overrides.hasOwnProperty('projectWebsite') ? overrides.projectWebsite! : 'nisi',
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'quae',
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : 'nihil',
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : 'voluptatem',
        sdgs: overrides && overrides.hasOwnProperty('sdgs') ? overrides.sdgs! : ['et'],
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : 'in',
        subcategory: overrides && overrides.hasOwnProperty('subcategory') ? overrides.subcategory! : 'aut',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'eligendi',
    };
};

export const aCmsProjectContent = (overrides?: Partial<CmsProjectContent>, _relationshipsToOmit: Set<string> = new Set()): CmsProjectContent => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContent');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'harum',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '5f265aa9-6d69-4f25-87a3-a0f0b7eeb348',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'eum',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'esse',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'modi',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'aut',
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('Image') ? {} as Image : aCmsImage({}, relationshipsToOmit),
        images: overrides && overrides.hasOwnProperty('images') ? overrides.images! : [relationshipsToOmit.has('Image') ? {} as Image : aCmsImage({}, relationshipsToOmit)],
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : 'aut',
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : 'ut',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'aut',
        project: overrides && overrides.hasOwnProperty('project') ? overrides.project! : relationshipsToOmit.has('Project') ? {} as Project : aCmsProject({}, relationshipsToOmit),
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : 'ad',
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : 'repellendus',
    };
};

export const aCmsProjectContentFilter = (overrides?: Partial<CmsProjectContentFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsProjectContentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContentFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('ImageFilter') ? {} as ImageFilter : aCmsImageFilter({}, relationshipsToOmit),
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        project: overrides && overrides.hasOwnProperty('project') ? overrides.project! : relationshipsToOmit.has('ProjectFilter') ? {} as ProjectFilter : aCmsProjectFilter({}, relationshipsToOmit),
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsProjectContentSorting = (overrides?: Partial<CmsProjectContentSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsProjectContentSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContentSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('ImageSorting') ? {} as ImageSorting : aCmsImageSorting({}, relationshipsToOmit),
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : SortOrder.Asc,
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : SortOrder.Asc,
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : SortOrder.Asc,
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : SortOrder.Asc,
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : SortOrder.Asc,
    };
};

export const aCmsProjectFilter = (overrides?: Partial<CmsProjectFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsProjectFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('FileFilter') ? {} as FileFilter : aCmsFileFilter({}, relationshipsToOmit),
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aCmsBooleanFilter({}, relationshipsToOmit),
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('GeopointFilter') ? {} as GeopointFilter : aCmsGeopointFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugFilter') ? {} as SlugFilter : aCmsSlugFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        projectWebsite: overrides && overrides.hasOwnProperty('projectWebsite') ? overrides.projectWebsite! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        subcategory: overrides && overrides.hasOwnProperty('subcategory') ? overrides.subcategory! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsProjectSorting = (overrides?: Partial<CmsProjectSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsProjectSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('FileSorting') ? {} as FileSorting : aCmsFileSorting({}, relationshipsToOmit),
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : SortOrder.Asc,
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : SortOrder.Asc,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : SortOrder.Asc,
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('GeopointSorting') ? {} as GeopointSorting : aCmsGeopointSorting({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugSorting') ? {} as SlugSorting : aCmsSlugSorting({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : SortOrder.Asc,
        projectWebsite: overrides && overrides.hasOwnProperty('projectWebsite') ? overrides.projectWebsite! : SortOrder.Asc,
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : SortOrder.Asc,
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : SortOrder.Asc,
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : SortOrder.Asc,
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : SortOrder.Asc,
        subcategory: overrides && overrides.hasOwnProperty('subcategory') ? overrides.subcategory! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aCmsRootQuery = (overrides?: Partial<CmsRootQuery>, _relationshipsToOmit: Set<string> = new Set()): CmsRootQuery => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('RootQuery');
    return {
        Document: overrides && overrides.hasOwnProperty('Document') ? overrides.Document! : relationshipsToOmit.has('Document') ? {} as Document : aCmsDocument({}, relationshipsToOmit),
        Methodology: overrides && overrides.hasOwnProperty('Methodology') ? overrides.Methodology! : relationshipsToOmit.has('Methodology') ? {} as Methodology : aCmsMethodology({}, relationshipsToOmit),
        Project: overrides && overrides.hasOwnProperty('Project') ? overrides.Project! : relationshipsToOmit.has('Project') ? {} as Project : aCmsProject({}, relationshipsToOmit),
        ProjectContent: overrides && overrides.hasOwnProperty('ProjectContent') ? overrides.ProjectContent! : relationshipsToOmit.has('ProjectContent') ? {} as ProjectContent : aCmsProjectContent({}, relationshipsToOmit),
        SanityFileAsset: overrides && overrides.hasOwnProperty('SanityFileAsset') ? overrides.SanityFileAsset! : relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aCmsSanityFileAsset({}, relationshipsToOmit),
        SanityImageAsset: overrides && overrides.hasOwnProperty('SanityImageAsset') ? overrides.SanityImageAsset! : relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aCmsSanityImageAsset({}, relationshipsToOmit),
        allDocument: overrides && overrides.hasOwnProperty('allDocument') ? overrides.allDocument! : [relationshipsToOmit.has('Document') ? {} as Document : aCmsDocument({}, relationshipsToOmit)],
        allMethodology: overrides && overrides.hasOwnProperty('allMethodology') ? overrides.allMethodology! : [relationshipsToOmit.has('Methodology') ? {} as Methodology : aCmsMethodology({}, relationshipsToOmit)],
        allProject: overrides && overrides.hasOwnProperty('allProject') ? overrides.allProject! : [relationshipsToOmit.has('Project') ? {} as Project : aCmsProject({}, relationshipsToOmit)],
        allProjectContent: overrides && overrides.hasOwnProperty('allProjectContent') ? overrides.allProjectContent! : [relationshipsToOmit.has('ProjectContent') ? {} as ProjectContent : aCmsProjectContent({}, relationshipsToOmit)],
        allSanityFileAsset: overrides && overrides.hasOwnProperty('allSanityFileAsset') ? overrides.allSanityFileAsset! : [relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aCmsSanityFileAsset({}, relationshipsToOmit)],
        allSanityImageAsset: overrides && overrides.hasOwnProperty('allSanityImageAsset') ? overrides.allSanityImageAsset! : [relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aCmsSanityImageAsset({}, relationshipsToOmit)],
    };
};

export const aCmsSanityAssetSourceData = (overrides?: Partial<CmsSanityAssetSourceData>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityAssetSourceData => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityAssetSourceData');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'et',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'repudiandae',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'explicabo',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'unde',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'ab',
    };
};

export const aCmsSanityAssetSourceDataFilter = (overrides?: Partial<CmsSanityAssetSourceDataFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityAssetSourceDataFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityAssetSourceDataFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityAssetSourceDataSorting = (overrides?: Partial<CmsSanityAssetSourceDataSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityAssetSourceDataSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityAssetSourceDataSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : SortOrder.Asc,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aCmsSanityFileAsset = (overrides?: Partial<CmsSanityFileAsset>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityFileAsset => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityFileAsset');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'delectus',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '22165ca2-2a4f-400a-819f-4999184e4275',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'recusandae',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'perferendis',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'iusto',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'iure',
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : 'corporis',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'aut',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'sed',
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : 'et',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'doloremque',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'laboriosam',
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : 'provident',
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : 'dignissimos',
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : 'quia',
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : 9.13,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceData') ? {} as SanityAssetSourceData : aCmsSanityAssetSourceData({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'ut',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'qui',
    };
};

export const aCmsSanityFileAssetFilter = (overrides?: Partial<CmsSanityFileAssetFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityFileAssetFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityFileAssetFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataFilter') ? {} as SanityAssetSourceDataFilter : aCmsSanityAssetSourceDataFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityFileAssetSorting = (overrides?: Partial<CmsSanityFileAssetSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityFileAssetSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityFileAssetSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : SortOrder.Asc,
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : SortOrder.Asc,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : SortOrder.Asc,
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : SortOrder.Asc,
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : SortOrder.Asc,
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : SortOrder.Asc,
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : SortOrder.Asc,
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : SortOrder.Asc,
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : SortOrder.Asc,
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : SortOrder.Asc,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataSorting') ? {} as SanityAssetSourceDataSorting : aCmsSanityAssetSourceDataSorting({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aCmsSanityImageAsset = (overrides?: Partial<CmsSanityImageAsset>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageAsset => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageAsset');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'consequatur',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '8f70e9b2-c875-4c24-bc14-b39438d45936',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'tempora',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'deleniti',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'dolores',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'porro',
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : 'harum',
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : 'debitis',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'quis',
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : 'voluptatem',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'voluptatibus',
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadata') ? {} as SanityImageMetadata : aCmsSanityImageMetadata({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'rerum',
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : 'sunt',
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : 'voluptatibus',
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : 'impedit',
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : 8.96,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceData') ? {} as SanityAssetSourceData : aCmsSanityAssetSourceData({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'beatae',
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : 'dolorem',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'mollitia',
    };
};

export const aCmsSanityImageAssetFilter = (overrides?: Partial<CmsSanityImageAssetFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageAssetFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageAssetFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aCmsSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : aCmsIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aCmsDatetimeFilter({}, relationshipsToOmit),
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadataFilter') ? {} as SanityImageMetadataFilter : aCmsSanityImageMetadataFilter({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataFilter') ? {} as SanityAssetSourceDataFilter : aCmsSanityAssetSourceDataFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageAssetSorting = (overrides?: Partial<CmsSanityImageAssetSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageAssetSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageAssetSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : SortOrder.Asc,
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : SortOrder.Asc,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : SortOrder.Asc,
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : SortOrder.Asc,
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : SortOrder.Asc,
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadataSorting') ? {} as SanityImageMetadataSorting : aCmsSanityImageMetadataSorting({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : SortOrder.Asc,
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : SortOrder.Asc,
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : SortOrder.Asc,
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : SortOrder.Asc,
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : SortOrder.Asc,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataSorting') ? {} as SanityAssetSourceDataSorting : aCmsSanityAssetSourceDataSorting({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : SortOrder.Asc,
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aCmsSanityImageCrop = (overrides?: Partial<CmsSanityImageCrop>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageCrop => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageCrop');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'ullam',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'autem',
        bottom: overrides && overrides.hasOwnProperty('bottom') ? overrides.bottom! : 9.73,
        left: overrides && overrides.hasOwnProperty('left') ? overrides.left! : 1.53,
        right: overrides && overrides.hasOwnProperty('right') ? overrides.right! : 9.28,
        top: overrides && overrides.hasOwnProperty('top') ? overrides.top! : 2.8,
    };
};

export const aCmsSanityImageCropFilter = (overrides?: Partial<CmsSanityImageCropFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageCropFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageCropFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        bottom: overrides && overrides.hasOwnProperty('bottom') ? overrides.bottom! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        left: overrides && overrides.hasOwnProperty('left') ? overrides.left! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        right: overrides && overrides.hasOwnProperty('right') ? overrides.right! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        top: overrides && overrides.hasOwnProperty('top') ? overrides.top! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageCropSorting = (overrides?: Partial<CmsSanityImageCropSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageCropSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageCropSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        bottom: overrides && overrides.hasOwnProperty('bottom') ? overrides.bottom! : SortOrder.Asc,
        left: overrides && overrides.hasOwnProperty('left') ? overrides.left! : SortOrder.Asc,
        right: overrides && overrides.hasOwnProperty('right') ? overrides.right! : SortOrder.Asc,
        top: overrides && overrides.hasOwnProperty('top') ? overrides.top! : SortOrder.Asc,
    };
};

export const aCmsSanityImageDimensions = (overrides?: Partial<CmsSanityImageDimensions>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageDimensions => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageDimensions');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'eos',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'et',
        aspectRatio: overrides && overrides.hasOwnProperty('aspectRatio') ? overrides.aspectRatio! : 3.57,
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 9.75,
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : 0.32,
    };
};

export const aCmsSanityImageDimensionsFilter = (overrides?: Partial<CmsSanityImageDimensionsFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageDimensionsFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageDimensionsFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        aspectRatio: overrides && overrides.hasOwnProperty('aspectRatio') ? overrides.aspectRatio! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageDimensionsSorting = (overrides?: Partial<CmsSanityImageDimensionsSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageDimensionsSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageDimensionsSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        aspectRatio: overrides && overrides.hasOwnProperty('aspectRatio') ? overrides.aspectRatio! : SortOrder.Asc,
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : SortOrder.Asc,
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : SortOrder.Asc,
    };
};

export const aCmsSanityImageHotspot = (overrides?: Partial<CmsSanityImageHotspot>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageHotspot => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageHotspot');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'omnis',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'quia',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 7.32,
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : 0.75,
        x: overrides && overrides.hasOwnProperty('x') ? overrides.x! : 9.81,
        y: overrides && overrides.hasOwnProperty('y') ? overrides.y! : 3.16,
    };
};

export const aCmsSanityImageHotspotFilter = (overrides?: Partial<CmsSanityImageHotspotFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageHotspotFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageHotspotFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        x: overrides && overrides.hasOwnProperty('x') ? overrides.x! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        y: overrides && overrides.hasOwnProperty('y') ? overrides.y! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageHotspotSorting = (overrides?: Partial<CmsSanityImageHotspotSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageHotspotSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageHotspotSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : SortOrder.Asc,
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : SortOrder.Asc,
        x: overrides && overrides.hasOwnProperty('x') ? overrides.x! : SortOrder.Asc,
        y: overrides && overrides.hasOwnProperty('y') ? overrides.y! : SortOrder.Asc,
    };
};

export const aCmsSanityImageMetadata = (overrides?: Partial<CmsSanityImageMetadata>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageMetadata => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadata');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'consequuntur',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'nisi',
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : 'et',
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensions') ? {} as SanityImageDimensions : aCmsSanityImageDimensions({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : true,
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : false,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('Geopoint') ? {} as Geopoint : aCmsGeopoint({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : 'qui',
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePalette') ? {} as SanityImagePalette : aCmsSanityImagePalette({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageMetadataFilter = (overrides?: Partial<CmsSanityImageMetadataFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageMetadataFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadataFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensionsFilter') ? {} as SanityImageDimensionsFilter : aCmsSanityImageDimensionsFilter({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aCmsBooleanFilter({}, relationshipsToOmit),
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aCmsBooleanFilter({}, relationshipsToOmit),
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('GeopointFilter') ? {} as GeopointFilter : aCmsGeopointFilter({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePaletteFilter') ? {} as SanityImagePaletteFilter : aCmsSanityImagePaletteFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImageMetadataSorting = (overrides?: Partial<CmsSanityImageMetadataSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImageMetadataSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadataSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : SortOrder.Asc,
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensionsSorting') ? {} as SanityImageDimensionsSorting : aCmsSanityImageDimensionsSorting({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : SortOrder.Asc,
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : SortOrder.Asc,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('GeopointSorting') ? {} as GeopointSorting : aCmsGeopointSorting({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : SortOrder.Asc,
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePaletteSorting') ? {} as SanityImagePaletteSorting : aCmsSanityImagePaletteSorting({}, relationshipsToOmit),
    };
};

export const aCmsSanityImagePalette = (overrides?: Partial<CmsSanityImagePalette>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePalette => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePalette');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'ipsum',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'dolor',
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aCmsSanityImagePaletteSwatch({}, relationshipsToOmit),
    };
};

export const aCmsSanityImagePaletteFilter = (overrides?: Partial<CmsSanityImagePaletteFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePaletteFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aCmsSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImagePaletteSorting = (overrides?: Partial<CmsSanityImagePaletteSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePaletteSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aCmsSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
    };
};

export const aCmsSanityImagePaletteSwatch = (overrides?: Partial<CmsSanityImagePaletteSwatch>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePaletteSwatch => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSwatch');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'ut',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'voluptatem',
        background: overrides && overrides.hasOwnProperty('background') ? overrides.background! : 'quo',
        foreground: overrides && overrides.hasOwnProperty('foreground') ? overrides.foreground! : 'nostrum',
        population: overrides && overrides.hasOwnProperty('population') ? overrides.population! : 9.28,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'veritatis',
    };
};

export const aCmsSanityImagePaletteSwatchFilter = (overrides?: Partial<CmsSanityImagePaletteSwatchFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePaletteSwatchFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSwatchFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        background: overrides && overrides.hasOwnProperty('background') ? overrides.background! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        foreground: overrides && overrides.hasOwnProperty('foreground') ? overrides.foreground! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        population: overrides && overrides.hasOwnProperty('population') ? overrides.population! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aCmsFloatFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsSanityImagePaletteSwatchSorting = (overrides?: Partial<CmsSanityImagePaletteSwatchSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSanityImagePaletteSwatchSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSwatchSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        background: overrides && overrides.hasOwnProperty('background') ? overrides.background! : SortOrder.Asc,
        foreground: overrides && overrides.hasOwnProperty('foreground') ? overrides.foreground! : SortOrder.Asc,
        population: overrides && overrides.hasOwnProperty('population') ? overrides.population! : SortOrder.Asc,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : SortOrder.Asc,
    };
};

export const aCmsSanity_DocumentFilter = (overrides?: Partial<CmsSanity_DocumentFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSanity_DocumentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Sanity_DocumentFilter');
    return {
        is_draft: overrides && overrides.hasOwnProperty('is_draft') ? overrides.is_draft! : false,
        references: overrides && overrides.hasOwnProperty('references') ? overrides.references! : '1e00f2c9-fcab-4351-9bcb-94a0f7c6012c',
    };
};

export const aCmsSlug = (overrides?: Partial<CmsSlug>, _relationshipsToOmit: Set<string> = new Set()): CmsSlug => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Slug');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'et',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'quis',
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : 'animi',
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : 'sint',
    };
};

export const aCmsSlugFilter = (overrides?: Partial<CmsSlugFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsSlugFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SlugFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aCmsStringFilter({}, relationshipsToOmit),
    };
};

export const aCmsSlugSorting = (overrides?: Partial<CmsSlugSorting>, _relationshipsToOmit: Set<string> = new Set()): CmsSlugSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SlugSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : SortOrder.Asc,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : SortOrder.Asc,
    };
};

export const aCmsSpan = (overrides?: Partial<CmsSpan>, _relationshipsToOmit: Set<string> = new Set()): CmsSpan => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Span');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'id',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'perferendis',
        marks: overrides && overrides.hasOwnProperty('marks') ? overrides.marks! : ['consectetur'],
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'nisi',
    };
};

export const aCmsStringFilter = (overrides?: Partial<CmsStringFilter>, _relationshipsToOmit: Set<string> = new Set()): CmsStringFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('StringFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 'sit',
        in: overrides && overrides.hasOwnProperty('in') ? overrides.in! : ['est'],
        is_defined: overrides && overrides.hasOwnProperty('is_defined') ? overrides.is_defined! : true,
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : 'et',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 'sit',
        nin: overrides && overrides.hasOwnProperty('nin') ? overrides.nin! : ['error'],
    };
};
