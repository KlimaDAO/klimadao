import { NextApiRequest, NextApiResponse } from "next/types";

import { generateCertificate } from "lib/retirementCertificates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    res.setHeader("Content-Type", "application/pdf");
    const certificate = generateCertificate(req.body);
    certificate.pipe(res);
    certificate.end();
  } catch (err) {
    res.status(500).send("Failed to generate retirement certificate");
  }
}
