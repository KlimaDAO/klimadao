import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";

// import { generateCertificate } from "./generateCertificate";
import { StaticImageData } from "next/legacy/image";
import { IS_PRODUCTION } from "lib/constants";

export interface DownloadCertificateButtonProps {
  beneficiaryName: string;
  beneficiaryAddress: string;
  projectDetails?: VerraProjectDetails;
  retirement: KlimaRetire;
  retirementIndex: string;
  retirementMessage: string;
  retirementUrl: string;
  tokenData: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<RetirementToken>;
  };
}

export const DownloadCertificateButton: FC<DownloadCertificateButtonProps> = (
  props
) => {
  // const handleClick = () => generateCertificate(props);

  console.log({ production: IS_PRODUCTION });

  const getCertificate = (): Promise<Response> =>
    fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    });

  // try download first and then assign a name
  const generatePDF = async () => {
    const response = await getCertificate();
    const certificate = await response.blob();
    window.open(URL.createObjectURL(certificate), "_blank");
  };

  return (
    <ButtonPrimary
      onClick={generatePDF}
      // onClick={handleClick}
      label={t({
        id: "retirement.single.download_certificate_button",
        message: "Download PDF",
      })}
    />
  );
};
