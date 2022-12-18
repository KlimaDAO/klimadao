import React, { FC, useState } from "react";
import { t } from "@lingui/macro";

import { ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

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
  const [loading, setLoading] = useState(false);
  // const fileName = `retirement_${props.retirementIndex}_${props.beneficiaryAddress}.pdf`;

  const getCertificate = (): Promise<Response> =>
    fetch(
      `/api/certificates/${props.beneficiaryAddress}/${props.retirementIndex}`,
      { method: "GET" }
    );

  const generateCertificate = async (): Promise<Blob> => {
    const response = await getCertificate();
    if (!response.ok) throw new Error("Could not generate certificate");

    return await response.blob();
  };

  const downloadCertificate = (blob: Blob) => {
    window.open(URL.createObjectURL(blob));
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.href = url;
    // a.download = fileName;
    // a.click();
    // URL.revokeObjectURL(url);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const certificate = await generateCertificate();
      downloadCertificate(certificate);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <ButtonPrimary
      onClick={handleClick}
      disabled={loading}
      label={t({
        id: "retirement.single.download_certificate_button",
        message: "Download PDF",
      })}
    />
  );
};
