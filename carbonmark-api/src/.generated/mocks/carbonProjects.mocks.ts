//@ts-nocheck
import { CarbonprojectsBlock, CarbonprojectsBooleanFilter, CarbonprojectsCrossDatasetReference, CarbonprojectsCrossDatasetReferenceFilter, CarbonprojectsCrossDatasetReferenceSorting, CarbonprojectsDateFilter, CarbonprojectsDatetimeFilter, CarbonprojectsDocument, CarbonprojectsDocumentFilter, CarbonprojectsDocumentSorting, CarbonprojectsFile, CarbonprojectsFileFilter, CarbonprojectsFileSorting, CarbonprojectsFloatFilter, CarbonprojectsGeopoint, CarbonprojectsGeopointFilter, CarbonprojectsGeopointSorting, CarbonprojectsIdFilter, CarbonprojectsImage, CarbonprojectsImageFilter, CarbonprojectsImageSorting, CarbonprojectsIntFilter, CarbonprojectsMethodology, CarbonprojectsMethodologyFilter, CarbonprojectsMethodologySorting, CarbonprojectsProject, CarbonprojectsProjectContent, CarbonprojectsProjectContentFilter, CarbonprojectsProjectContentSorting, CarbonprojectsProjectFilter, CarbonprojectsProjectSorting, CarbonprojectsRootQuery, CarbonprojectsSanityAssetSourceData, CarbonprojectsSanityAssetSourceDataFilter, CarbonprojectsSanityAssetSourceDataSorting, CarbonprojectsSanityFileAsset, CarbonprojectsSanityFileAssetFilter, CarbonprojectsSanityFileAssetSorting, CarbonprojectsSanityImageAsset, CarbonprojectsSanityImageAssetFilter, CarbonprojectsSanityImageAssetSorting, CarbonprojectsSanityImageCrop, CarbonprojectsSanityImageCropFilter, CarbonprojectsSanityImageCropSorting, CarbonprojectsSanityImageDimensions, CarbonprojectsSanityImageDimensionsFilter, CarbonprojectsSanityImageDimensionsSorting, CarbonprojectsSanityImageHotspot, CarbonprojectsSanityImageHotspotFilter, CarbonprojectsSanityImageHotspotSorting, CarbonprojectsSanityImageMetadata, CarbonprojectsSanityImageMetadataFilter, CarbonprojectsSanityImageMetadataSorting, CarbonprojectsSanityImagePalette, CarbonprojectsSanityImagePaletteFilter, CarbonprojectsSanityImagePaletteSorting, CarbonprojectsSanityImagePaletteSwatch, CarbonprojectsSanityImagePaletteSwatchFilter, CarbonprojectsSanityImagePaletteSwatchSorting, CarbonprojectsSanity_DocumentFilter, CarbonprojectsSlug, CarbonprojectsSlugFilter, CarbonprojectsSlugSorting, CarbonprojectsSpan, CarbonprojectsStringFilter, SortOrder } from '../types/carbonProjects.types';

export const aBlock = (overrides?: Partial<CarbonprojectsBlock>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsBlock => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Block');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'aut',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'saepe',
        children: overrides && overrides.hasOwnProperty('children') ? overrides.children! : [relationshipsToOmit.has('Span') ? {} as Span : aSpan({}, relationshipsToOmit)],
        list: overrides && overrides.hasOwnProperty('list') ? overrides.list! : 'dolores',
        style: overrides && overrides.hasOwnProperty('style') ? overrides.style! : 'facere',
    };
};

export const aBooleanFilter = (overrides?: Partial<CarbonprojectsBooleanFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsBooleanFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('BooleanFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : false,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : false,
    };
};

export const aCrossDatasetReference = (overrides?: Partial<CarbonprojectsCrossDatasetReference>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsCrossDatasetReference => {
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

export const aCrossDatasetReferenceFilter = (overrides?: Partial<CarbonprojectsCrossDatasetReferenceFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsCrossDatasetReferenceFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('CrossDatasetReferenceFilter');
    return {
        _dataset: overrides && overrides.hasOwnProperty('_dataset') ? overrides._dataset! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _projectId: overrides && overrides.hasOwnProperty('_projectId') ? overrides._projectId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _ref: overrides && overrides.hasOwnProperty('_ref') ? overrides._ref! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _weak: overrides && overrides.hasOwnProperty('_weak') ? overrides._weak! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aBooleanFilter({}, relationshipsToOmit),
    };
};

export const aCrossDatasetReferenceSorting = (overrides?: Partial<CarbonprojectsCrossDatasetReferenceSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsCrossDatasetReferenceSorting => {
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

export const aDateFilter = (overrides?: Partial<CarbonprojectsDateFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsDateFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DateFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : '1970-01-10T16:14:27.972Z',
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : '1970-01-05T09:17:44.773Z',
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : '1970-01-10T16:05:23.460Z',
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : '1970-01-11T07:38:26.649Z',
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : '1970-01-11T14:10:50.732Z',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : '1970-01-14T01:42:37.432Z',
    };
};

export const aDatetimeFilter = (overrides?: Partial<CarbonprojectsDatetimeFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsDatetimeFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DatetimeFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 'aliquam',
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 'temporibus',
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 'cumque',
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 'odio',
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 'qui',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 'cupiditate',
    };
};

export const aDocument = (overrides?: Partial<CarbonprojectsDocument>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsDocument => {
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

export const aDocumentFilter = (overrides?: Partial<CarbonprojectsDocumentFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsDocumentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('DocumentFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
    };
};

export const aDocumentSorting = (overrides?: Partial<CarbonprojectsDocumentSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsDocumentSorting => {
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

export const aFile = (overrides?: Partial<CarbonprojectsFile>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsFile => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('File');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'consequatur',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'at',
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aSanityFileAsset({}, relationshipsToOmit),
    };
};

export const aFileFilter = (overrides?: Partial<CarbonprojectsFileFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsFileFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FileFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityFileAssetFilter') ? {} as SanityFileAssetFilter : aSanityFileAssetFilter({}, relationshipsToOmit),
    };
};

export const aFileSorting = (overrides?: Partial<CarbonprojectsFileSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsFileSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FileSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
    };
};

export const aFloatFilter = (overrides?: Partial<CarbonprojectsFloatFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsFloatFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('FloatFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 4.03,
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 5.81,
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 8.02,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 8.06,
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 2.07,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 3.98,
    };
};

export const aGeopoint = (overrides?: Partial<CarbonprojectsGeopoint>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsGeopoint => {
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

export const aGeopointFilter = (overrides?: Partial<CarbonprojectsGeopointFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsGeopointFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('GeopointFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        alt: overrides && overrides.hasOwnProperty('alt') ? overrides.alt! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        lat: overrides && overrides.hasOwnProperty('lat') ? overrides.lat! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        lng: overrides && overrides.hasOwnProperty('lng') ? overrides.lng! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
    };
};

export const aGeopointSorting = (overrides?: Partial<CarbonprojectsGeopointSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsGeopointSorting => {
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

export const anIdFilter = (overrides?: Partial<CarbonprojectsIdFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsIdFilter => {
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

export const anImage = (overrides?: Partial<CarbonprojectsImage>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsImage => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Image');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'molestias',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'dolorum',
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aSanityImageAsset({}, relationshipsToOmit),
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCrop') ? {} as SanityImageCrop : aSanityImageCrop({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspot') ? {} as SanityImageHotspot : aSanityImageHotspot({}, relationshipsToOmit),
    };
};

export const anImageFilter = (overrides?: Partial<CarbonprojectsImageFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsImageFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ImageFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        asset: overrides && overrides.hasOwnProperty('asset') ? overrides.asset! : relationshipsToOmit.has('SanityImageAssetFilter') ? {} as SanityImageAssetFilter : aSanityImageAssetFilter({}, relationshipsToOmit),
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCropFilter') ? {} as SanityImageCropFilter : aSanityImageCropFilter({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspotFilter') ? {} as SanityImageHotspotFilter : aSanityImageHotspotFilter({}, relationshipsToOmit),
    };
};

export const anImageSorting = (overrides?: Partial<CarbonprojectsImageSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsImageSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ImageSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        crop: overrides && overrides.hasOwnProperty('crop') ? overrides.crop! : relationshipsToOmit.has('SanityImageCropSorting') ? {} as SanityImageCropSorting : aSanityImageCropSorting({}, relationshipsToOmit),
        hotspot: overrides && overrides.hasOwnProperty('hotspot') ? overrides.hotspot! : relationshipsToOmit.has('SanityImageHotspotSorting') ? {} as SanityImageHotspotSorting : aSanityImageHotspotSorting({}, relationshipsToOmit),
    };
};

export const anIntFilter = (overrides?: Partial<CarbonprojectsIntFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsIntFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('IntFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 9154,
        gt: overrides && overrides.hasOwnProperty('gt') ? overrides.gt! : 2833,
        gte: overrides && overrides.hasOwnProperty('gte') ? overrides.gte! : 492,
        lt: overrides && overrides.hasOwnProperty('lt') ? overrides.lt! : 8311,
        lte: overrides && overrides.hasOwnProperty('lte') ? overrides.lte! : 6047,
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 4351,
    };
};

export const aMethodology = (overrides?: Partial<CarbonprojectsMethodology>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsMethodology => {
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
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('Slug') ? {} as Slug : aSlug({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : 'nobis',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'iusto',
    };
};

export const aMethodologyFilter = (overrides?: Partial<CarbonprojectsMethodologyFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsMethodologyFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('MethodologyFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugFilter') ? {} as SlugFilter : aSlugFilter({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aMethodologySorting = (overrides?: Partial<CarbonprojectsMethodologySorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsMethodologySorting => {
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
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugSorting') ? {} as SlugSorting : aSlugSorting({}, relationshipsToOmit),
        link: overrides && overrides.hasOwnProperty('link') ? overrides.link! : SortOrder.Asc,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : SortOrder.Asc,
    };
};

export const aProject = (overrides?: Partial<CarbonprojectsProject>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProject => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Project');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'dolore',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '02d36956-576b-48ef-988f-5a7c952f91b8',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'esse',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'quia',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'laudantium',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'suscipit',
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('File') ? {} as File : aFile({}, relationshipsToOmit),
        ccbs: overrides && overrides.hasOwnProperty('ccbs') ? overrides.ccbs! : ['voluptas'],
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : false,
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'perspiciatis',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'voluptatem',
        documents: overrides && overrides.hasOwnProperty('documents') ? overrides.documents! : [relationshipsToOmit.has('File') ? {} as File : aFile({}, relationshipsToOmit)],
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('Geopoint') ? {} as Geopoint : aGeopoint({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('Slug') ? {} as Slug : aSlug({}, relationshipsToOmit),
        methodologies: overrides && overrides.hasOwnProperty('methodologies') ? overrides.methodologies! : [relationshipsToOmit.has('Methodology') ? {} as Methodology : aMethodology({}, relationshipsToOmit)],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'et',
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : 'quae',
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : 'nihil',
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : 'voluptatem',
        sdgs: overrides && overrides.hasOwnProperty('sdgs') ? overrides.sdgs! : ['et'],
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : 'in',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'eligendi',
    };
};

export const aProjectContent = (overrides?: Partial<CarbonprojectsProjectContent>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProjectContent => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContent');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : 'harum',
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : '5f265aa9-6d69-4f25-87a3-a0f0b7eeb348',
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'eum',
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : 'esse',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'modi',
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : 'aut',
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('Image') ? {} as Image : anImage({}, relationshipsToOmit),
        images: overrides && overrides.hasOwnProperty('images') ? overrides.images! : [relationshipsToOmit.has('Image') ? {} as Image : anImage({}, relationshipsToOmit)],
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : 'aut',
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : 'ut',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'aut',
        project: overrides && overrides.hasOwnProperty('project') ? overrides.project! : relationshipsToOmit.has('Project') ? {} as Project : aProject({}, relationshipsToOmit),
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : 'ad',
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : 'repellendus',
    };
};

export const aProjectContentFilter = (overrides?: Partial<CarbonprojectsProjectContentFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProjectContentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContentFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('ImageFilter') ? {} as ImageFilter : anImageFilter({}, relationshipsToOmit),
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        project: overrides && overrides.hasOwnProperty('project') ? overrides.project! : relationshipsToOmit.has('ProjectFilter') ? {} as ProjectFilter : aProjectFilter({}, relationshipsToOmit),
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aProjectContentSorting = (overrides?: Partial<CarbonprojectsProjectContentSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProjectContentSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectContentSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : relationshipsToOmit.has('ImageSorting') ? {} as ImageSorting : anImageSorting({}, relationshipsToOmit),
        longDescription: overrides && overrides.hasOwnProperty('longDescription') ? overrides.longDescription! : SortOrder.Asc,
        longDescriptionMeta: overrides && overrides.hasOwnProperty('longDescriptionMeta') ? overrides.longDescriptionMeta! : SortOrder.Asc,
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : SortOrder.Asc,
        shortDescription: overrides && overrides.hasOwnProperty('shortDescription') ? overrides.shortDescription! : SortOrder.Asc,
        shortDescriptionMeta: overrides && overrides.hasOwnProperty('shortDescriptionMeta') ? overrides.shortDescriptionMeta! : SortOrder.Asc,
    };
};

export const aProjectFilter = (overrides?: Partial<CarbonprojectsProjectFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProjectFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('FileFilter') ? {} as FileFilter : aFileFilter({}, relationshipsToOmit),
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aBooleanFilter({}, relationshipsToOmit),
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('GeopointFilter') ? {} as GeopointFilter : aGeopointFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugFilter') ? {} as SlugFilter : aSlugFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aProjectSorting = (overrides?: Partial<CarbonprojectsProjectSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsProjectSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('ProjectSorting');
    return {
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : SortOrder.Asc,
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : SortOrder.Asc,
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : SortOrder.Asc,
        boundary: overrides && overrides.hasOwnProperty('boundary') ? overrides.boundary! : relationshipsToOmit.has('FileSorting') ? {} as FileSorting : aFileSorting({}, relationshipsToOmit),
        corsia: overrides && overrides.hasOwnProperty('corsia') ? overrides.corsia! : SortOrder.Asc,
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : SortOrder.Asc,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : SortOrder.Asc,
        geolocation: overrides && overrides.hasOwnProperty('geolocation') ? overrides.geolocation! : relationshipsToOmit.has('GeopointSorting') ? {} as GeopointSorting : aGeopointSorting({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('SlugSorting') ? {} as SlugSorting : aSlugSorting({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : SortOrder.Asc,
        region: overrides && overrides.hasOwnProperty('region') ? overrides.region! : SortOrder.Asc,
        registry: overrides && overrides.hasOwnProperty('registry') ? overrides.registry! : SortOrder.Asc,
        registryProjectId: overrides && overrides.hasOwnProperty('registryProjectId') ? overrides.registryProjectId! : SortOrder.Asc,
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aRootQuery = (overrides?: Partial<CarbonprojectsRootQuery>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsRootQuery => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('RootQuery');
    return {
        Document: overrides && overrides.hasOwnProperty('Document') ? overrides.Document! : relationshipsToOmit.has('Document') ? {} as Document : aDocument({}, relationshipsToOmit),
        Methodology: overrides && overrides.hasOwnProperty('Methodology') ? overrides.Methodology! : relationshipsToOmit.has('Methodology') ? {} as Methodology : aMethodology({}, relationshipsToOmit),
        Project: overrides && overrides.hasOwnProperty('Project') ? overrides.Project! : relationshipsToOmit.has('Project') ? {} as Project : aProject({}, relationshipsToOmit),
        ProjectContent: overrides && overrides.hasOwnProperty('ProjectContent') ? overrides.ProjectContent! : relationshipsToOmit.has('ProjectContent') ? {} as ProjectContent : aProjectContent({}, relationshipsToOmit),
        SanityFileAsset: overrides && overrides.hasOwnProperty('SanityFileAsset') ? overrides.SanityFileAsset! : relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aSanityFileAsset({}, relationshipsToOmit),
        SanityImageAsset: overrides && overrides.hasOwnProperty('SanityImageAsset') ? overrides.SanityImageAsset! : relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aSanityImageAsset({}, relationshipsToOmit),
        allDocument: overrides && overrides.hasOwnProperty('allDocument') ? overrides.allDocument! : [relationshipsToOmit.has('Document') ? {} as Document : aDocument({}, relationshipsToOmit)],
        allMethodology: overrides && overrides.hasOwnProperty('allMethodology') ? overrides.allMethodology! : [relationshipsToOmit.has('Methodology') ? {} as Methodology : aMethodology({}, relationshipsToOmit)],
        allProject: overrides && overrides.hasOwnProperty('allProject') ? overrides.allProject! : [relationshipsToOmit.has('Project') ? {} as Project : aProject({}, relationshipsToOmit)],
        allProjectContent: overrides && overrides.hasOwnProperty('allProjectContent') ? overrides.allProjectContent! : [relationshipsToOmit.has('ProjectContent') ? {} as ProjectContent : aProjectContent({}, relationshipsToOmit)],
        allSanityFileAsset: overrides && overrides.hasOwnProperty('allSanityFileAsset') ? overrides.allSanityFileAsset! : [relationshipsToOmit.has('SanityFileAsset') ? {} as SanityFileAsset : aSanityFileAsset({}, relationshipsToOmit)],
        allSanityImageAsset: overrides && overrides.hasOwnProperty('allSanityImageAsset') ? overrides.allSanityImageAsset! : [relationshipsToOmit.has('SanityImageAsset') ? {} as SanityImageAsset : aSanityImageAsset({}, relationshipsToOmit)],
    };
};

export const aSanityAssetSourceData = (overrides?: Partial<CarbonprojectsSanityAssetSourceData>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityAssetSourceData => {
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

export const aSanityAssetSourceDataFilter = (overrides?: Partial<CarbonprojectsSanityAssetSourceDataFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityAssetSourceDataFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityAssetSourceDataFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aSanityAssetSourceDataSorting = (overrides?: Partial<CarbonprojectsSanityAssetSourceDataSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityAssetSourceDataSorting => {
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

export const aSanityFileAsset = (overrides?: Partial<CarbonprojectsSanityFileAsset>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityFileAsset => {
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
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceData') ? {} as SanityAssetSourceData : aSanityAssetSourceData({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'ut',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'qui',
    };
};

export const aSanityFileAssetFilter = (overrides?: Partial<CarbonprojectsSanityFileAssetFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityFileAssetFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityFileAssetFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataFilter') ? {} as SanityAssetSourceDataFilter : aSanityAssetSourceDataFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aSanityFileAssetSorting = (overrides?: Partial<CarbonprojectsSanityFileAssetSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityFileAssetSorting => {
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
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataSorting') ? {} as SanityAssetSourceDataSorting : aSanityAssetSourceDataSorting({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aSanityImageAsset = (overrides?: Partial<CarbonprojectsSanityImageAsset>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageAsset => {
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
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadata') ? {} as SanityImageMetadata : aSanityImageMetadata({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'rerum',
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : 'sunt',
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : 'voluptatibus',
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : 'impedit',
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : 8.96,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceData') ? {} as SanityAssetSourceData : aSanityAssetSourceData({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'beatae',
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : 'dolorem',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'mollitia',
    };
};

export const aSanityImageAssetFilter = (overrides?: Partial<CarbonprojectsSanityImageAssetFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageAssetFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageAssetFilter');
    return {
        _: overrides && overrides.hasOwnProperty('_') ? overrides._! : relationshipsToOmit.has('Sanity_DocumentFilter') ? {} as Sanity_DocumentFilter : aSanity_DocumentFilter({}, relationshipsToOmit),
        _createdAt: overrides && overrides.hasOwnProperty('_createdAt') ? overrides._createdAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        _id: overrides && overrides.hasOwnProperty('_id') ? overrides._id! : relationshipsToOmit.has('IdFilter') ? {} as IdFilter : anIdFilter({}, relationshipsToOmit),
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _rev: overrides && overrides.hasOwnProperty('_rev') ? overrides._rev! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _updatedAt: overrides && overrides.hasOwnProperty('_updatedAt') ? overrides._updatedAt! : relationshipsToOmit.has('DatetimeFilter') ? {} as DatetimeFilter : aDatetimeFilter({}, relationshipsToOmit),
        altText: overrides && overrides.hasOwnProperty('altText') ? overrides.altText! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        assetId: overrides && overrides.hasOwnProperty('assetId') ? overrides.assetId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        extension: overrides && overrides.hasOwnProperty('extension') ? overrides.extension! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadataFilter') ? {} as SanityImageMetadataFilter : aSanityImageMetadataFilter({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataFilter') ? {} as SanityAssetSourceDataFilter : aSanityAssetSourceDataFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aSanityImageAssetSorting = (overrides?: Partial<CarbonprojectsSanityImageAssetSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageAssetSorting => {
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
        metadata: overrides && overrides.hasOwnProperty('metadata') ? overrides.metadata! : relationshipsToOmit.has('SanityImageMetadataSorting') ? {} as SanityImageMetadataSorting : aSanityImageMetadataSorting({}, relationshipsToOmit),
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : SortOrder.Asc,
        originalFilename: overrides && overrides.hasOwnProperty('originalFilename') ? overrides.originalFilename! : SortOrder.Asc,
        path: overrides && overrides.hasOwnProperty('path') ? overrides.path! : SortOrder.Asc,
        sha1hash: overrides && overrides.hasOwnProperty('sha1hash') ? overrides.sha1hash! : SortOrder.Asc,
        size: overrides && overrides.hasOwnProperty('size') ? overrides.size! : SortOrder.Asc,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('SanityAssetSourceDataSorting') ? {} as SanityAssetSourceDataSorting : aSanityAssetSourceDataSorting({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : SortOrder.Asc,
        uploadId: overrides && overrides.hasOwnProperty('uploadId') ? overrides.uploadId! : SortOrder.Asc,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : SortOrder.Asc,
    };
};

export const aSanityImageCrop = (overrides?: Partial<CarbonprojectsSanityImageCrop>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageCrop => {
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

export const aSanityImageCropFilter = (overrides?: Partial<CarbonprojectsSanityImageCropFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageCropFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageCropFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        bottom: overrides && overrides.hasOwnProperty('bottom') ? overrides.bottom! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        left: overrides && overrides.hasOwnProperty('left') ? overrides.left! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        right: overrides && overrides.hasOwnProperty('right') ? overrides.right! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        top: overrides && overrides.hasOwnProperty('top') ? overrides.top! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
    };
};

export const aSanityImageCropSorting = (overrides?: Partial<CarbonprojectsSanityImageCropSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageCropSorting => {
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

export const aSanityImageDimensions = (overrides?: Partial<CarbonprojectsSanityImageDimensions>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageDimensions => {
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

export const aSanityImageDimensionsFilter = (overrides?: Partial<CarbonprojectsSanityImageDimensionsFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageDimensionsFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageDimensionsFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        aspectRatio: overrides && overrides.hasOwnProperty('aspectRatio') ? overrides.aspectRatio! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
    };
};

export const aSanityImageDimensionsSorting = (overrides?: Partial<CarbonprojectsSanityImageDimensionsSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageDimensionsSorting => {
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

export const aSanityImageHotspot = (overrides?: Partial<CarbonprojectsSanityImageHotspot>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageHotspot => {
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

export const aSanityImageHotspotFilter = (overrides?: Partial<CarbonprojectsSanityImageHotspotFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageHotspotFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageHotspotFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        x: overrides && overrides.hasOwnProperty('x') ? overrides.x! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        y: overrides && overrides.hasOwnProperty('y') ? overrides.y! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
    };
};

export const aSanityImageHotspotSorting = (overrides?: Partial<CarbonprojectsSanityImageHotspotSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageHotspotSorting => {
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

export const aSanityImageMetadata = (overrides?: Partial<CarbonprojectsSanityImageMetadata>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageMetadata => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadata');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'consequuntur',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'nisi',
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : 'et',
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensions') ? {} as SanityImageDimensions : aSanityImageDimensions({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : true,
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : false,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('Geopoint') ? {} as Geopoint : aGeopoint({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : 'qui',
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePalette') ? {} as SanityImagePalette : aSanityImagePalette({}, relationshipsToOmit),
    };
};

export const aSanityImageMetadataFilter = (overrides?: Partial<CarbonprojectsSanityImageMetadataFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageMetadataFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadataFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensionsFilter') ? {} as SanityImageDimensionsFilter : aSanityImageDimensionsFilter({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aBooleanFilter({}, relationshipsToOmit),
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : relationshipsToOmit.has('BooleanFilter') ? {} as BooleanFilter : aBooleanFilter({}, relationshipsToOmit),
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('GeopointFilter') ? {} as GeopointFilter : aGeopointFilter({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePaletteFilter') ? {} as SanityImagePaletteFilter : aSanityImagePaletteFilter({}, relationshipsToOmit),
    };
};

export const aSanityImageMetadataSorting = (overrides?: Partial<CarbonprojectsSanityImageMetadataSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImageMetadataSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImageMetadataSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        blurHash: overrides && overrides.hasOwnProperty('blurHash') ? overrides.blurHash! : SortOrder.Asc,
        dimensions: overrides && overrides.hasOwnProperty('dimensions') ? overrides.dimensions! : relationshipsToOmit.has('SanityImageDimensionsSorting') ? {} as SanityImageDimensionsSorting : aSanityImageDimensionsSorting({}, relationshipsToOmit),
        hasAlpha: overrides && overrides.hasOwnProperty('hasAlpha') ? overrides.hasAlpha! : SortOrder.Asc,
        isOpaque: overrides && overrides.hasOwnProperty('isOpaque') ? overrides.isOpaque! : SortOrder.Asc,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : relationshipsToOmit.has('GeopointSorting') ? {} as GeopointSorting : aGeopointSorting({}, relationshipsToOmit),
        lqip: overrides && overrides.hasOwnProperty('lqip') ? overrides.lqip! : SortOrder.Asc,
        palette: overrides && overrides.hasOwnProperty('palette') ? overrides.palette! : relationshipsToOmit.has('SanityImagePaletteSorting') ? {} as SanityImagePaletteSorting : aSanityImagePaletteSorting({}, relationshipsToOmit),
    };
};

export const aSanityImagePalette = (overrides?: Partial<CarbonprojectsSanityImagePalette>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePalette => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePalette');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'ipsum',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'dolor',
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatch') ? {} as SanityImagePaletteSwatch : aSanityImagePaletteSwatch({}, relationshipsToOmit),
    };
};

export const aSanityImagePaletteFilter = (overrides?: Partial<CarbonprojectsSanityImagePaletteFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePaletteFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchFilter') ? {} as SanityImagePaletteSwatchFilter : aSanityImagePaletteSwatchFilter({}, relationshipsToOmit),
    };
};

export const aSanityImagePaletteSorting = (overrides?: Partial<CarbonprojectsSanityImagePaletteSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePaletteSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        darkMuted: overrides && overrides.hasOwnProperty('darkMuted') ? overrides.darkMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        darkVibrant: overrides && overrides.hasOwnProperty('darkVibrant') ? overrides.darkVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        dominant: overrides && overrides.hasOwnProperty('dominant') ? overrides.dominant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        lightMuted: overrides && overrides.hasOwnProperty('lightMuted') ? overrides.lightMuted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        lightVibrant: overrides && overrides.hasOwnProperty('lightVibrant') ? overrides.lightVibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        muted: overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
        vibrant: overrides && overrides.hasOwnProperty('vibrant') ? overrides.vibrant! : relationshipsToOmit.has('SanityImagePaletteSwatchSorting') ? {} as SanityImagePaletteSwatchSorting : aSanityImagePaletteSwatchSorting({}, relationshipsToOmit),
    };
};

export const aSanityImagePaletteSwatch = (overrides?: Partial<CarbonprojectsSanityImagePaletteSwatch>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePaletteSwatch => {
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

export const aSanityImagePaletteSwatchFilter = (overrides?: Partial<CarbonprojectsSanityImagePaletteSwatchFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePaletteSwatchFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SanityImagePaletteSwatchFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        background: overrides && overrides.hasOwnProperty('background') ? overrides.background! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        foreground: overrides && overrides.hasOwnProperty('foreground') ? overrides.foreground! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        population: overrides && overrides.hasOwnProperty('population') ? overrides.population! : relationshipsToOmit.has('FloatFilter') ? {} as FloatFilter : aFloatFilter({}, relationshipsToOmit),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aSanityImagePaletteSwatchSorting = (overrides?: Partial<CarbonprojectsSanityImagePaletteSwatchSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanityImagePaletteSwatchSorting => {
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

export const aSanity_DocumentFilter = (overrides?: Partial<CarbonprojectsSanity_DocumentFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSanity_DocumentFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Sanity_DocumentFilter');
    return {
        is_draft: overrides && overrides.hasOwnProperty('is_draft') ? overrides.is_draft! : false,
        references: overrides && overrides.hasOwnProperty('references') ? overrides.references! : '1e00f2c9-fcab-4351-9bcb-94a0f7c6012c',
    };
};

export const aSlug = (overrides?: Partial<CarbonprojectsSlug>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSlug => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Slug');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'et',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'quis',
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : 'animi',
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : 'sint',
    };
};

export const aSlugFilter = (overrides?: Partial<CarbonprojectsSlugFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSlugFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SlugFilter');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : relationshipsToOmit.has('StringFilter') ? {} as StringFilter : aStringFilter({}, relationshipsToOmit),
    };
};

export const aSlugSorting = (overrides?: Partial<CarbonprojectsSlugSorting>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSlugSorting => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('SlugSorting');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : SortOrder.Asc,
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : SortOrder.Asc,
        current: overrides && overrides.hasOwnProperty('current') ? overrides.current! : SortOrder.Asc,
        source: overrides && overrides.hasOwnProperty('source') ? overrides.source! : SortOrder.Asc,
    };
};

export const aSpan = (overrides?: Partial<CarbonprojectsSpan>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsSpan => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Span');
    return {
        _key: overrides && overrides.hasOwnProperty('_key') ? overrides._key! : 'id',
        _type: overrides && overrides.hasOwnProperty('_type') ? overrides._type! : 'perferendis',
        marks: overrides && overrides.hasOwnProperty('marks') ? overrides.marks! : ['consectetur'],
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'nisi',
    };
};

export const aStringFilter = (overrides?: Partial<CarbonprojectsStringFilter>, _relationshipsToOmit: Set<string> = new Set()): CarbonprojectsStringFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('StringFilter');
    return {
        eq: overrides && overrides.hasOwnProperty('eq') ? overrides.eq! : 'sit',
        in: overrides && overrides.hasOwnProperty('in') ? overrides.in! : ['est'],
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : 'et',
        neq: overrides && overrides.hasOwnProperty('neq') ? overrides.neq! : 'sit',
        nin: overrides && overrides.hasOwnProperty('nin') ? overrides.nin! : ['error'],
    };
};
