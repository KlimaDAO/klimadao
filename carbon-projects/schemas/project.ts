import { defineField, defineType } from "sanity";
import { countries } from "../lib/iso-3166";
import { sdgs } from "../lib/sdgs";

const ccbs = [
  { title: "Social Carbon", value: "Social Carbon" },
  { title: "CCB Gold", value: "CCB-Gold" },
  { title: "CCB Climate Gold", value: "CCB-Climate Gold" },
  { title: "CCB No Distinction", value: "CCB-No Distinction" },
  { title: "CCB Biodiversity Gold", value: "CCB-Biodiversity Gold" },
  { title: "CCB Community Gold", value: "CCB-Community Gold" },
];

const subcategories = [
  { title: "Solar Energy", value: "solar" },
  { title: "Wind Energy", value: "wind" },
  { title: "Hydroelectric Energy", value: "hydro" },
  { title: "Improved Forest Management (IFM)", value: "ifm" },
  { title: "Avoided Deforestation", value: "redd" },
  { title: "Afforestation", value: "afforestation" },
  { title: "Mangrove Restoration", value: "mangroves" },
];

export default defineType({
  name: "project",
  title: "Project",
  description: "A project entity, from any registry.",
  type: "document",
  preview: {
    select: {
      slug: "id",
      name: "name",
    },
    prepare(selection) {
      return {
        title: selection.slug.current || "",
        subtitle: selection.name || "",
      };
    },
  },
  groups: [
    { name: "info", title: "Info" },
    { name: "location", title: "Location" },
    { name: "benefits", title: "Benefits" },
    { name: "media", title: "Media" },
  ],
  fields: [
    {
      name: "name",
      description:
        "Project name. Use 'Title Case Capitalization'. No trailing period",
      placeholder:
        "Adjusted Water Management in Rice Cultivation in Jiangxia District",
      group: "info",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "description",
      description:
        "Official project description as it appears in the originating registry",
      group: "info",
      type: "string",
      validation: (r) => r.required().min(20),
    },
    {
      name: "registry",
      description:
        "One of a limited number of approved registries (typically signalted via KlimaDAO governance)",
      group: "info",
      placeholder: "VCS",
      type: "string",
      options: {
        list: [
          { title: "Verra", value: "VCS" },
          { title: "Gold Standard", value: "GS" },
          { title: "EcoRegistry", value: "ECO" },
          { title: "International Carbon Registry", value: "ICR" },
          { title: "Puro", value: "PUR" },
          { title: "J-Credit", value: "JCS" },
        ],
      },
      validation: (r) => r.required(),
    },
    {
      name: "registryProjectId",
      description:
        "Official identifier as it appears in the registry. Do not include a prefix.",
      placeholder: "432",
      group: "info",
      type: "string",
      validation: (r) =>
        r.min(1).regex(/^[0-9]*$/, { name: "Numeric characters only" }),
    },
    defineField({
      name: "id",
      description:
        "Project identifier, unique, derived from [registry]-[registryProjectId]",
      group: "info",
      type: "slug",
      options: {
        source: (doc) => `${doc.registry}-${doc.registryProjectId}`,
        slugify: (str) => str.toUpperCase(),
      },
      validation: (r) =>
        r.custom((val, ctx) => {
          const str = val?.current;
          const registryProjectId = ctx.document?.registryProjectId as
            | string
            | undefined;
          const registry = ctx.document?.registry as string | undefined;
          if (!str) return "Please click Generate";
          if (!registry) return "Needs registry prefix";
          if (!registryProjectId) return "Needs Registry Project Id";
          if (str !== `${registry}-${registryProjectId}`)
            return "Please re-generate";
          return true;
        }),
    }),
    defineField({
      type: "array",
      name: "methodologies",
      of: [
        {
          type: "reference",
          to: [{ type: "methodology" }],
        },
      ],
      description: "Methodologies applied by the project",
      group: "info",
    }),
    defineField({
      name: "ccbs",
      description: "Additional certifications and co-benefits",
      group: "info",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: ccbs,
          },
        },
      ],
    }),
    defineField({
      name: "subcategory",
      description: "From our predefined ontology of subcategories",
      type: "string",
      options: {
        list: subcategories,
      },
    }),
    {
      name: "region",
      description: "Region where the project was implemented",
      group: "location",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "country",
      description:
        "ISO-3166 English Short Name of the country where the project was implemented",
      type: "string",
      group: "location",
      validation: (r) => r.required(),
      options: {
        list: countries.map((c) => ({ title: c.name, value: c.name })),
      },
    },
    {
      name: "countryDetails",
      description:
        "Programmatically linked via ISO-3166 country code with a detail document on the country where the project was implemented",
      type: "reference",
      group: "location",
      to: [{ type: "country" }],
    },
    {
      name: "state",
      description:
        "(optional) state or territory where the project was implemented",
      type: "string",
      group: "location",
    },
    {
      name: "geolocation",
      type: "geopoint",
      group: "location",
      description: "WGS84 Lat and Lng coordinates (decimal degrees).",
    },
    defineField({
      type: "file",
      name: "boundary",
      group: "location",
      description:
        "(optional) GeoJSON Polygon or MultiPolygon representing the project boundary. .json files only.",
      options: {
        accept: "application/json",
      },
      validation: (r) =>
        r.custom((a, b) => {
          console.log(a, b);
          return true;
        }),
    }),
    defineField({
      name: "sdgs",
      description:
        "List of relevant Sustainable Development Goals for this project.",
      group: "benefits",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: sdgs,
      },
    }),
    defineField({
      name: "corsia",
      description: "Is this project CORSIA compliant?",
      group: "benefits",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "url",
      description:
        "Project's website or resource url on the registry, if exists",
      group: "media",
      type: "url",
    }),
    defineField({
      name: "projectWebsite",
      description: "External project website, if exists",
      group: "media",
      type: "url",
    }),
    defineField({
      name: "externalMedia",
      description: "Arrays of external media URIs and associated captions",
      group: "media",
      type: "array",
      of: [{ type: "externalFile" }],
    }),
    defineField({
      name: "externalDocuments",
      description: "External PDF documents associated with this project",
      group: "media",
      type: "array",
      of: [{ type: "externalFile" }],
    }),
  ],
});
