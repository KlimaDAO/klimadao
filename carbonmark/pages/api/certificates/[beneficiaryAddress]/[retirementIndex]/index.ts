import { urls } from "@klimadao/lib/constants";
import {
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { utils } from "ethers";
import { generateCertificate } from "lib/retirementCertificates";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import isNumber from "lodash/isNumber";
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

    if (!utils.isAddress(resolvedAddress)) {
      return res.status(400).send("Invalid beneficiary address or domain");
    }

    /** Retirement indexes start from 0, url starts from 1 */
    const index = Number(retirementIndex) - 1;
    const retirement = await queryKlimaRetireByIndex(resolvedAddress, index);

    /** Validate fetched data */
    if (!retirement) {
      return res.status(404).send("Not found");
    }

    const certificateParams = {
      retirement,
      retirementIndex,
      retirementUrl: `${urls.retirements}/${retirement.beneficiaryAddress}/${retirementIndex}`,
      retiredToken: getRetirementTokenByAddress(retirement.pool),
    };

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Cache-Control", "s-maxage=86400");
    const certificate = generateCertificate(certificateParams);
    certificate.pipe(res);
    certificate.end();
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to generate retirement certificate");
  }
}
