import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { formatUnits } from "@klimadao/lib/utils";
import { isAddress } from "ethers-v6";
import { queryProjects } from "lib/cms/queriesProjects";
import { NextApiHandler } from "next";
import { queryKlimaRetiresByAddress } from "../../../../lib/retirementDataQueries/retirementDataViaPolygonDigitalCarbon";

export interface APIDefaultResponse {
  message: string;
}

/** GET "/api/retirements/<beneficiary_address>?limit=12345" */

const getRetirements: NextApiHandler<
  KlimaRetire[] | false | APIDefaultResponse
> = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const { beneficiary_address, limit } = req.query;

        const address = Array.isArray(beneficiary_address)
          ? beneficiary_address[0]
          : beneficiary_address;

        const validAddress = address && isAddress(address);

        if (!beneficiary_address || !validAddress) {
          return res.status(400).json({
            message: "Not found! beneficiary_address is missing or invalid",
          });
        }

        const retirements = await queryKlimaRetiresByAddress(address);

        // return false on missing data, same as the subgraph
        if (!retirements) {
          return res.status(200).json(retirements);
        }

        // check if retirements results are limitted
        const singleLimit = Array.isArray(limit) ? limit[0] : limit;
        const parsed = singleLimit && parseInt(singleLimit);
        const limitAsNumber = !!parsed && !isNaN(parsed) && Number(parsed);

        const limittedRetirements = limitAsNumber
          ? retirements.slice(0, limitAsNumber)
          : retirements;

        // query CMS for project content
        const projectIDs = limittedRetirements.map(
          (r) => r.retire.credit.project.projectID
        );
        const uniqueProjectIDs = [...new Set(projectIDs)];
        const cmsProjects = await queryProjects({ ids: uniqueProjectIDs });

        // attach name from CMS to retirement data
        const mergedRetirements = limittedRetirements.map((r) => ({
          ...r,
          retire: {
            ...r.retire,
            amount: formatUnits(r.retire.amount, 18),
          },
          offset: {
            ...r.retire,
            amount: formatUnits(r.retire.amount, 18),
            name:
              cmsProjects.find(
                (p) => p.id === r.retire.credit.project.projectID
              )?.name || r.retire.credit.project.name, // COULD NOT CHECK THIS, name in CMS is always the same as from the graph
          },
        }));

        return res.status(200).json(mergedRetirements);
      } catch (error) {
        const { message } = error as Error;
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getRetirements;
