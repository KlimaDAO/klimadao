import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";

import { StaticImageData } from "next/legacy/image";
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
  // const fileName = `retirement_${props.retirementIndex}_${props.beneficiaryAddress}.pdf`;
  const getCertificate = (): Promise<Response> =>
    fetch(
      `/api/certificates/${props.beneficiaryAddress}/${props.retirementIndex}`,
      { method: "GET" }
    );

  const generatePDF = async () => {
    const response = await getCertificate();
    const certificate = await response.blob();

    window.open(URL.createObjectURL(certificate));
    // const url = URL.createObjectURL(certificate);
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.href = url;
    // a.download = fileName;
    // a.click();
    // URL.revokeObjectURL(url);
  };

  return (
    <ButtonPrimary
      onClick={generatePDF}
      label={t({
        id: "retirement.single.download_certificate_button",
        message: "Download PDF",
      })}
    />
  );
};
