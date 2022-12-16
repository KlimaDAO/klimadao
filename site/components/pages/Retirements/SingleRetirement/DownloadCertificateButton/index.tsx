import { ButtonPrimary } from "@klimadao/lib/components";
import { FC } from "react";

import { RetirementToken } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

import { StaticImageData } from "next/legacy/image";
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
      variant="link"
      onClick={handleClick}
      // Replace occurrences of "\" with ZERO WIDTH SPACE (U+200B) to allow word break
      label={props.retirementUrl
        .replace("https://", "")
        .replace("//", "/")
        .replace(/\//g, "/\u200B")}
    />
  );
};
