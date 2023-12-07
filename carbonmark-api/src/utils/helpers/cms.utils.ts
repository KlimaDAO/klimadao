import { compact, merge } from "lodash";
import { filter, pipe } from "lodash/fp";
import { NetworkParam } from "src/models/NetworkParam.model";
import { SetRequired } from "../../../../lib/utils/typescript.utils";
import {
  GetCmsProjectQuery,
  ProjectContent,
} from "../../.generated/types/cms.types";
import { convertIcrCountryCodeToName } from "../ICR/icr.utils";
import { arrayToMap } from "../array.utils";
import { extract, notNil, selector } from "../functional.utils";
import { getCategoryFromMethodology } from "../getCategoryFromMethodoloy";
import { GQL_SDK } from "../gqlSdk";
import { ICR_API } from "./../../../src/utils/ICR/ICR_API_endpoints";
import fetch from "node-fetch";

export type ProjectImage = {
  asset?: {
    url?: string | null;
    caption?: string | null;
    altText?: string | null;
  } | null;
};

type IcrCarbonImage = {
  uri: string;
  fileName: string;
};

type SdkArgs = {
  registry: string;
  registryProjectId: string;
};

type IcrArgs = {
  serialization: string;
  network: NetworkParam;
};

export type FetchCarbonProjectMethod = GQL_SDK | string;

export type FetchCarbonProjectArgs = SdkArgs | IcrArgs;

/**
 * Generates a unique key for a project using its registry and id.
 */
const projectKey = ({
  registry,
  registryProjectId,
}: {
  registry: string | null;
  registryProjectId: string | null;
}) => `${registry}-${registryProjectId}`;

export type CarbonProject = GetCmsProjectQuery["allProject"][number] & {
  content?: ProjectContent;
};

// fix return type
export const fetchCMSProject = async (
  sdk: FetchCarbonProjectMethod,
  args: FetchCarbonProjectArgs
) => {
  /** @todo come up with better way to check registry type that satisfies typescript */
  if ("serialization" in args && typeof sdk === "string") {
    const url = `${sdk}/public/projects?creditSerialization=${args.serialization}`;

    const { ICR_API_KEY } = ICR_API(args.network);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ICR_API_KEY}`,
        },
      });

      const apiData = await response.json();

      if (apiData.statusCode === 404) {
        console.info("ICR API returned 404. No Project Found.");
        return null;
      }

      // make common type to export
      const images: ProjectImage[] =
        apiData.media?.map((image: IcrCarbonImage) => ({
          asset: {
            url: image.uri,
            caption: image.fileName,
          },
        })) || [];

      const registry = apiData.ghgProgram?.id.toUpperCase() || null;
      // extract the matching tokenID from the vintage in serialization
      const vintage = args.serialization.split("-").pop();

      const findTokenIdByVintage = (
        vintage: string | undefined
      ): string | null => {
        if (!vintage) {
          return null;
        }
        for (const credit of apiData.carbonCredits) {
          if (credit.vintage === vintage) {
            return credit.tokenId;
          }
        }
        return null;
      };

      return {
        key: args.serialization,
        country: convertIcrCountryCodeToName(apiData.countryCode) || null,
        description: apiData.shortDescription || null,
        name: apiData.fullName || null,
        region: apiData.geographicalRegion || null,
        registry: registry || null,
        url: apiData.website || null,
        registryProjectId: apiData.num || null,
        id: `${registry}-${apiData.num}` || null,
        geolocation: apiData.geoLocation || null,
        methodologies:
          [
            {
              id: apiData?.methodology?.id,
              category: getCategoryFromMethodology(apiData?.methodology?.id),
              name: apiData.methodology.title,
            },
          ] || null,
        shortDescription: apiData.shortDescription || null,
        longDescription: apiData.description || null,
        project: {
          registry: registry || null,
          registryProjectId: apiData.num || null,
        },
        coverImage: apiData.documents?.[0]?.uri || null,
        images,
        tokenId: findTokenIdByVintage(vintage) || null,
        vintage: vintage || null,
      };
    } catch (error) {
      // catch 403s here for mainnet keys that are not verified
      console.error(error);
      throw error;
    }
  } else if ("registry" in args && typeof sdk !== "string") {
    const [{ allProject }, { allProjectContent }] = await Promise.all([
      sdk.cms.getCMSProject(args),
      sdk.cms.getCMSProjectContent(args),
    ]);

    const project = allProject?.at(0);
    const content = allProjectContent?.at(0);
    const key = projectKey(args);
    return {
      ...project,
      ...content,
      key,
    };
  }
  throw new Error(
    "Invalid arguments or SDK type provided to fetchCarbonProject"
  );
};

/**
 * Fetches all carbon projects and their content
 * @returns {Promise<CarbonProject[]>} An array of all fetched projects.
 */

export const fetchAllCarbonProjects = async (
  sdk: GQL_SDK
): Promise<CarbonProject[]> => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    sdk.cms.getAllCMSProjects(),
    sdk.cms.getAllCMSProjectContent(),
  ]);

  // Clean the content, removing those without project references
  const content = pipe(
    compact,
    filter(selector<SetRequired<ProjectContent, "project">>("project", notNil))
  )(allProjectContent);

  // Build a map for constant time lookup
  const contentMap = arrayToMap(content, pipe(extract("project"), projectKey));

  // Pair Projects with their content
  const projects: CarbonProject[] = allProject.map((project) =>
    merge(project, {
      content: contentMap.get(projectKey(project)),
    })
  );

  return projects;
};
