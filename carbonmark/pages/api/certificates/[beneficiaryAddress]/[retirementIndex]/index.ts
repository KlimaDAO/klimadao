import { urls } from "@klimadao/lib/constants";
import { formatUnits, getRetirementTokenByAddress } from "@klimadao/lib/utils";
import { isAddress } from "ethers-v6";
import { generateCertificate } from "lib/retirementCertificates";
import { queryKlimaRetireByIndex } from "lib/retirementDataQueries/retirementDataViaPolygonDigitalCarbon";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import { isNumber } from "lodash";
import { NextApiRequest, NextApiResponse } from "next/types";

type Query = {
  beneficiaryAddress: string;
  retirementIndex: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { beneficiaryAddress, retirementIndex } = req.query as Query;

    /** Validate address params */
    if (
      !beneficiaryAddress ||
      !retirementIndex ||
      !isNumber(Number(retirementIndex))
    ) {
      return res.status(404).send("Not found");
    }

    const resolvedAddress = getIsDomainInURL(beneficiaryAddress)
      ? await getAddressByDomain(beneficiaryAddress)
      : beneficiaryAddress;

    if (!isAddress(resolvedAddress)) {
      return res.status(400).send("Invalid beneficiary address or domain");
    }

    /** Retirement indexes start from 0, url starts from 1 */
    const index = Number(retirementIndex) - 1;
    const retirement = await queryKlimaRetireByIndex(resolvedAddress, index);

    /** Validate fetched data */
    if (!retirement) {
      return res.status(404).send("Not found");
    }

    // convert amount to human readable format
    retirement.retire.amount = formatUnits(retirement.retire.amount, 18);
    // temporary fix until ICR digital-carbon id matches registry-registryProjectId format
    if (retirement.retire.credit.project.registry === "ICR") {
      retirement.retire.credit.project.projectID =
        retirement.retire.credit.project.id;
    }

    const certificateParams = {
      retirement,
      beneficiaryAddress,
      retirementIndex,
      retirementUrl: `${urls.retirements_carbonmark}/${retirement.retire.beneficiaryAddress}/${retirementIndex}`,
      retiredToken: getRetirementTokenByAddress(
        retirement.retire.credit?.poolBalances?.pool?.id ??
          retirement.retire.credit.id
      ),
    };

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Cache-Control", "s-maxage=86400");
    const certificate = generateCertificate(certificateParams);
    certificate.pipe(res);
    certificate.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate retirement certificate");
  }
}
