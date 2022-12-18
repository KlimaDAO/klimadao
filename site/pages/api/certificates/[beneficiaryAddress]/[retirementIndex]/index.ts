import { utils } from "ethers";
import { NextApiRequest, NextApiResponse } from "next/types";
import isNumber from "lodash/isNumber";

import {
  getVerraProjectByID,
  getRetirementIndexInfo,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";
import { urls } from "@klimadao/lib/constants";

import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { generateCertificate } from "lib/retirementCertificates";

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

    if (!utils.isAddress(beneficiaryAddress)) {
      return res.status(400).send("Invalid beneficiary address");
    }

    /** Customer facing index starts from 1 */
    const index = Number(retirementIndex) - 1;
    const promises: [
      Promise<KlimaRetire | false>,
      Promise<RetirementIndexInfoResult>
    ] = [
      queryKlimaRetireByIndex(beneficiaryAddress, index),
      getRetirementIndexInfo({
        beneficiaryAddress,
        index,
        providerUrl: getInfuraUrlPolygon(),
      }),
    ];
    const [retirement, retirementIndexInfo] = await Promise.all(promises);

    /** Validate fetched data */
    if (!retirement || !retirementIndexInfo) {
      return res.status(404).send("Not found");
    }

    let projectDetails: VerraProjectDetails | undefined;
    if (retirement && !!retirement.offset.projectID) {
      projectDetails = await getVerraProjectByID(
        retirement.offset.projectID.replace("VCS-", "")
      );
    }

    const certificateParams = {
      beneficiaryName: retirementIndexInfo.beneficiaryName,
      beneficiaryAddress,
      retirement,
      retirementIndex,
      retirementMessage: retirementIndexInfo.retirementMessage,
      retirementUrl: `${urls.retirements}/${beneficiaryAddress}/${retirementIndex}`,
      projectDetails,
      retiredToken: retirementIndexInfo.typeOfToken,
    };

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Cache-Control", "max-age=86400");
    const certificate = generateCertificate(certificateParams);
    certificate.pipe(res);
    certificate.end();
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to generate retirement certificate");
  }
}
