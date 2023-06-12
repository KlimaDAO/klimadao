import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import {
  calculatePoolPrices,
  calculateProjectPoolPrices,
} from "../../helpers/utils";
import { fetchProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { gqlSdk } from "../../utils/gqlSdk";

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

// Handler function for the "/projects/:id" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    // Extract the project ID and vintage from the request parameters
    const { id } = request.params;
    const projectId = id.split("-");
    const key = `${projectId[0]}-${projectId[1]}`;
    const vintageStr = projectId[2];

    // Fetch pool prices, C3 token address, and TCO2 token address in parallel
    const [poolPrices, c3TokenAddress, tco2TokenAddress] = await Promise.all([
      calculatePoolPrices(fastify),
      gqlSdk.tokens.getBySymbol({ symbol: `C3T-${key}-${vintageStr}` }),
      gqlSdk.tokens.getBySymbol({ symbol: `TCO2-${key}-${vintageStr}` }),
    ]);

    // Initialize variables for unique values and prices
    let uniqueValues: any[] = [];
    let prices: any[] = [];

    // Fetch project data by ID and vintage
    const projects = await gqlSdk.marketplace.getProjectsById({
      key: key,
      vintageStr: vintageStr,
    });

    // Initialize the project variable
    let project = { ...projects[0] };

    // If the project exists in the data, process it
    if (project) {
      // Process project listings
      if (project.listings?.length) {
        // Unselect all listings
        const listings = project.listings.map((item) => ({
          ...item,
          selected: false,
        }));

        // Add unique prices from active and non-deleted listings
        project.listings.forEach((item) => {
          if (
            !/^0+$/.test(item.leftToSell) &&
            item.active != false &&
            item.deleted != true
          ) {
            uniqueValues.push(item.singleUnitPrice);
          }
        });

        // Fetch seller data for each listing and update the listings array
        await Promise.all(
          listings.map(async (listing) => {
            const seller = await fastify.firebase
              .firestore()
              .collection("users")
              .doc(listing.seller.id.toUpperCase())
              .get();
            listing.seller = { ...seller.data(), ...listing.seller };
          })
        );
        project.listings = listings;
      }

      // Fetch pool project data
      const offset = await gqlSdk.offsets.getCarbonOffsetsByProjectAndVintage({
        key: key,
        vintageStr: vintageStr,
      });

      // If the pool project exists, process it and update the project data
      if (offset.carbonOffsets[0]) {
        const poolProject = { ...offset.carbonOffsets[0] };
        project.isPoolProject = true;
        project.totalBridged = poolProject.totalBridged;
        project.totalRetired = poolProject.totalRetired;
        project.currentSupply = poolProject.currentSupply;

        // Calculate pool prices for the project
        offset.carbonOffsets.map(function (carbonProject) {
          [uniqueValues, prices] = calculateProjectPoolPrices(
            carbonProject,
            uniqueValues,
            poolPrices,
            prices
          );
        });
        project.prices = prices;
      } else {
        project.totalBridged = null;
        project.totalRetired = null;
        project.currentSupply = null;
      }
    } else {
      // If the project doesn't exist in the data, try fetching it from the pool projects
      const offsets: any = gqlSdk.offsets.getCarbonOffsetsByProjectAndVintage({
        key: key,
        vintageStr: vintageStr,
      });

      // If the pool project exists, process it and update the project data
      if (offsets.carbonOffsets[0]) {
        project = { ...offsets.carbonOffsets[0] };
        const country = project.country.length
          ? {
              id: project.country,
            }
          : null;

        project = {
          id: project.id,
          isPoolProject: true,
          key: project.projectID,
          projectID: project.projectID.split("-")[1],
          name: project.name,
          methodology: project.methodology,
          vintage: project.vintageYear,
          projectAddress: project.tokenAddress,
          registry: project.projectID.split("-")[0],
          updatedAt: project.lastUpdate,
          category: {
            id: project.methodologyCategory,
          },
          country: country,
          activities: null,
          listings: null,
          totalBridged: project.totalBridged,
          totalRetired: project.totalRetired,
          currentSupply: project.currentSupply,
        };

        // Calculate pool prices for the project
        project.prices = [];
        prices = [];
        if (offsets.carbonOffsets && offsets.carbonOffsets.length) {
          offsets.carbonOffsets.map(function (carbonProject) {
            [uniqueValues, prices] = calculateProjectPoolPrices(
              carbonProject,
              uniqueValues,
              poolPrices,
              prices
            );
          });
          project.prices = prices;
        }
      }
    }

    // If the project exists, update its data and send it in the response
    if (project) {
      project.c3TokenAddress =
        c3TokenAddress && c3TokenAddress.tokens.length
          ? c3TokenAddress.tokens[0].id
          : undefined;
      project.tco2TokenAddress =
        tco2TokenAddress && tco2TokenAddress.tokens.length
          ? tco2TokenAddress.tokens[0].id
          : undefined;

      // Fetch additional project data based on the registry
      if (project.registry == "VCS") {
        const sanity = getSanityClient();

        const params = {
          registry: project.registry,
          registryProjectId: projectId[1],
        };

        const results = await sanity.fetch(fetchProjects, params);
        project.description = results.description ?? undefined;
        project.location = results.geolocation ?? undefined;
        project.name = results.name;
        project.methodologies = results.methodologies;

        project.images =
          results.projectContent.length > 0
            ? results.projectContent[0].images
            : [];
        project.long_description = results.projectContent
          ? results.projectContent.longDescription
          : undefined;

        project.url = results.url;
      } else if (project.registry == "GS") {
        let results: any = await fetch(
          `https://api.goldstandard.org/projects/${id[1]}`
        );
        results = JSON.parse(await results.text());
        project.description = results.description;
        project.location = null;
      }

      // Calculate the lowest price for the project
      project.price = uniqueValues.length
        ? uniqueValues.reduce((a, b) =>
            a.length < b.length ? a : a.length === b.length && a < b ? a : b
          )
        : "0";

      // Update activity data for the project
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
                actvity.seller.handle = seller.data()?.handle;
              }
              if (actvity.buyer) {
                const buyer = await fastify.firebase
                  .firestore()
                  .collection("users")
                  .doc(actvity.buyer.id.toUpperCase())
                  .get();
                if (buyer.exists) {
                  actvity.buyer.handle = buyer.data()?.handle;
                }
              }
            }
          })
        );
        project.activities = activities.filter(
          (activity) => activity.activityType !== "Sold"
        );
      }

      // Send the project data in the response
      return reply.send(JSON.stringify(project));
    }
    // If the project doesn't exist, send a 404 Not Found response
    return reply.notFound();
  };

const get: FastifyPluginAsync = async (fastify) => {
  await fastify.get("/projects/:id", { schema }, handler(fastify));
};

export default get;
