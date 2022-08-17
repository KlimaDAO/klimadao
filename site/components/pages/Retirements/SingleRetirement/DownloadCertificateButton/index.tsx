import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";

import { generateCertificate } from "./generateCertificate";
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
  const handleClick = () => generateCertificate(props);

  return (
    <ButtonPrimary
      onClick={handleClick}
      label={t({
        id: "retirement.single.download_certificate_button",
        message: "Download PDF",
      })}
    />
  );
};
