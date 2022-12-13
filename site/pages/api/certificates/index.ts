import { NextApiRequest, NextApiResponse } from "next/types";

import { generateCertificate } from "lib/retirementCertificates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const certificate = generateCertificate(req.body);

    res.setHeader("Content-Type", "application/pdf");

    // doc.font("./Poppins-SemiBold.ttf").text("Certificate for On-chain");
    // doc.font("Header").text("Certificate for On-chain");
    // doc.font("Body").text("Carbon Retirement");

    certificate.pipe(res);
    certificate.end();
  } catch (err) {
    res.status(500).send("failed to fetch data");
  }
}
