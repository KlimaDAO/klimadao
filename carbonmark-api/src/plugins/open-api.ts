import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import fp from "fastify-plugin";
import packageJson from "../../package.json";
import { ActivityModel } from "../models/Activity.model";
import { AssetModel } from "../models/Asset.model";
import { CarbonCreditModel } from "../models/CarbonCredit.model";
import { CategoryModel } from "../models/Category.model";
import { CountryModel } from "../models/Country.model";
import { ListingModel } from "../models/Listing.model";
import { MethodologyModel } from "../models/Methodology.model";
import { NetworkParamModel } from "../models/NetworkParam.model";
import { ProjectModel } from "../models/Project.model";
import { ProvenanceRecordModel } from "../models/ProvenanceRecord.model";
import { PurchaseModel } from "../models/Purchase.model";
import { RetirementModel } from "../models/Retirement.model";
import { TokenPriceModel } from "../models/TokenPrice.model";
import { UserModel } from "../models/User.model";
import { ImageModel } from "../models/Utility.model";

const OPEN_API_OPTIONS: FastifyDynamicSwaggerOptions["openapi"] = {
  // This enables codegen utilities to target the relevant urls
  servers: [{ url: `https://v${packageJson.version}.api.carbonmark.com` }],
  info: {
    title: "Carbonmark REST API",
    description: `
Welcome to the API Reference docs for **version ${packageJson.version}** of the Carbonmark REST API.

Use this API to view assets, prices, supply, activity and more.

Looking for the latest version? Visit our [GitHub Releases page](https://github.com/KlimaDAO/klimadao/releases).

## Quick start
Be sure to prefix a version number, otherwise your application will be exposed to breaking changes.

~~~ts
const res = await fetch("https://v${packageJson.version}.api.carbonmark.com/projects");
const projects = await res.json();
~~~

For a developer guides and example implementations, or to learn more about Carbonmark and Digital Carbon Market, view our product knowledge base at <a href="https://docs.carbonmark.com">docs.carbonmark.com</a>.
## 
`,
    termsOfService: "https://www.carbonmark.com/blog/terms-of-use",
    contact: {
      name: "Support",
      url: "https://share-eu1.hsforms.com/1RWJWvyrHT1C_an4cZOHH3gfhhlr",
      // email: "support@carbonmark.com",
    },
    license: {
      name: "MIT",
      url: "https://github.com/KlimaDAO/klimadao/blob/main/LICENSE",
    },
    /** The API version */
    version: packageJson.version,
  },
  components: {
    schemas: {
      Project: ProjectModel,
      Activity: ActivityModel,
      Category: CategoryModel,
      Country: CountryModel,
      Listing: ListingModel,
      Methodology: MethodologyModel,
      NetworkParam: NetworkParamModel,
      Purchase: PurchaseModel,
      User: UserModel,
      Asset: AssetModel,
      TokenPrice: TokenPriceModel,
      Image: ImageModel,
      ProvenanceRecord: ProvenanceRecordModel,
      Retirement: RetirementModel,
      CarbonCredit: CarbonCreditModel,
    },
  },
  externalDocs: {
    url: "https://docs.carbonmark.com/",
    description:
      "Additional documentation. The complete product and platform knowledge base for Carbonmark can be found here.",
  },
};

export default fp(async function (fastify) {
  await fastify.register(swagger, {
    openapi: OPEN_API_OPTIONS,
  });
});
