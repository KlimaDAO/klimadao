import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { isNil, map, merge } from "lodash";
import { assign } from "lodash/fp";
import {
  GetProjectsByIdDocument,
  GetProjectsByIdQuery,
  Listing,
} from "../../../.generated/types/marketplace.types";
import {
  CarbonOffset,
  GetCarbonOffsetsByProjectAndVintageDocument,
  GetCarbonOffsetsByProjectAndVintageQuery,
} from "../../../.generated/types/offsets.types";
import {
  calculatePoolPrices,
  calculateProjectPoolPrices,
  PriceType,
} from "../../helpers/utils";
import { FirebaseInstance } from "../../plugins/firebase";
import { getSanityClient } from "../../sanity/sanity";
import { executeGraphQLQuery } from "../../utils/apollo-client";
import { extract, notNil } from "../../utils/functional.utils";
import { PoolProject } from "./projects.types";

const schema = {
  querystring: {
    type: "object",
    properties: {
      category: {
        type: "string",
      },
      country: {
        type: "string",
      },
      search: {
        type: "string",
      },
    },
  },
  tags: ["project"],
};

interface Params {
  id: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null | undefined;
};

/**
 * Expects project id to be of type <registrar>-<id>-<vintage>
 * @todo add a regular expression test
 */
const deconstructId = (str: string) => {
  const id = str.split("-");
  var key = `${id[0]}-${id[1]}`;
  var vintage = id[2];
  return {
    key,
    vintage,
  };
};

const isListingActive = (listing: Partial<Listing>) =>
  notNil(listing.leftToSell) &&
  !/^0+$/.test(listing.leftToSell) &&
  listing.active != false &&
  listing.deleted != true;

const getFirebaseUser = async (id: string, fb: FirebaseInstance) =>
  await fb.firestore().collection("users").doc(id).get();

const updateListingUser =
  (fb: FirebaseInstance) => async (listing: Partial<Listing>) => {
    const sellerId = listing.seller?.id.toUpperCase();
    const { data } = await getFirebaseUser(sellerId, fb);
    const seller = merge({ ...data() }, listing.seller);
    return { ...listing, seller };
  };

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    const { key, vintage } = deconstructId(request.params.id);
    const poolPrices = await calculatePoolPrices(fastify);

    const { data: { projects } = {} } =
      await executeGraphQLQuery<GetProjectsByIdQuery>(
        process.env.GRAPH_API_URL,
        GetProjectsByIdDocument,
        { key, vintage }
      );

    const { data: { carbonOffsets } = {} } =
      await executeGraphQLQuery<GetCarbonOffsetsByProjectAndVintageQuery>(
        process.env.CARBON_OFFSETS_GRAPH_API_URL,
        GetCarbonOffsetsByProjectAndVintageDocument,
        { key: key, vintageStr: vintage }
      );

    const project = projects?.[0];
    const offset = carbonOffsets?.[0];

    // Unselect all listings
    let updatedListings: Partial<Listing>[] = map(
      project?.listings,
      assign({ selected: false })
    );

    const res = await Promise.all(
      updatedListings.map(updateListingUser(fastify.firebase))
    );

    // Extract prices
    const listingPrices = updatedListings
      ?.filter(isListingActive)
      .map(extract("singleUnitPrice"));

    /** */
    if (offset) {
      const poolProject: PoolProject & Partial<CarbonOffset> = offset;
      poolProject.isPoolProject = true;

      carbonOffsets?.map(function (carbonProject) {
        const [uniqueValues, pricetypes] = calculateProjectPoolPrices(
          carbonProject,
          uniqueValues,
          poolPrices,
          pricetypes
        );
      });
      offset.prices = pricetypes;
    }

    //
    if (isNil(offset)) {
      merge(offset, {
        totalBridged: null,
        totalRetired: null,
        currentSupply: null,
      });
    }

    if (isNil(project)) {
      {
        const poolProject = { ...carbonOffsets?.[0] };
        if (poolProject) {
          let country = poolProject.country?.length
            ? {
                id: poolProject.country,
              }
            : null;

          const result: any = {
            id: poolProject.id,
            isPoolProject: true,
            key: poolProject.projectID,
            projectID: poolProject.projectID?.split("-")[1] ?? "",
            name: poolProject.name,
            methodology: poolProject.methodology,
            vintage: poolProject.vintageYear,
            projectAddress: poolProject.tokenAddress,
            registry: poolProject.projectID?.split("-")[0] ?? "",
            updatedAt: poolProject.lastUpdate,
            category: {
              id: poolProject.methodologyCategory,
            },
            country: country,
            activities: null,
            listings: null,
            totalBridged: project.totalBridged,
            totalRetired: project.totalRetired,
            currentSupply: project.currentSupply,
          };

          result.prices = [];

          let pricetypes: PriceType[] = [];
          if (carbonOffsets && carbonOffsets.length) {
            carbonOffsets.map(function (carbonProject) {
              [uniqueValues, pricetypes] = calculateProjectPoolPrices(
                carbonProject,
                uniqueValues,
                poolPrices,
                pricetypes
              );
            });
            result.prices = prices;
          }
        }
      }
    }

    if (project) {
      if (project.registry == "VCS") {
        const sanity = getSanityClient();

        const params = {
          registry: project.registry,
          registryProjectId: id[1],
        };

        const results = await sanity.fetch(fetchProjects, params);
        project.description = results.description;
        project.location = results.geolocation;
        project.name = results.name;
        project.methodologies = results.methodologies;
        project.url = results.url;
      } else if (project.registry == "GS") {
        var results = await fetch(
          `https://api.goldstandard.org/projects/${id[1]}`
        );
        results = JSON.parse(await results.text());
        project.description = results.description;
        project.location = null;
      }

      project.price = uniqueValues.length
        ? uniqueValues.reduce((a, b) =>
            a.length < b.length ? a : a.length === b.length && a < b ? a : b
          )
        : "0";

      if (project.activities) {
        const activities = project.activities;

        await Promise.all(
          activities.map(async (actvity) => {
            if (actvity.activityType != "Sold") {
              const seller = await fastify.firebase
                .firestore()
                .collection("users")
                .doc(actvity.seller.id.toUpperCase())
                .get();
              if (seller.exists) {
                actvity.seller.handle = seller.data().handle;
              }
              if (actvity.buyer) {
                const buyer = await fastify.firebase
                  .firestore()
                  .collection("users")
                  .doc(actvity.buyer.id.toUpperCase())
                  .get();
                if (buyer.exists) {
                  actvity.buyer.handle = buyer.data().handle;
                }
              }
            }
          })
        );
        project.activities = activities.filter(
          (activity) => activity.activityType !== "Sold"
        );
      }

      return reply.send(JSON.stringify(project));
    }
    return reply.notFound();
  };

const getById: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/projects/:id", { schema }, handler(fastify));
};

export default getById;
