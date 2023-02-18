import { ButtonPrimary } from "@klimadao/lib/components";
import { FC } from "react";

import { RetirementToken } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import { t } from "@lingui/macro";
import { StaticImageData } from "next/legacy/image";
import { generateCertificate } from "./generateCertificate";
export interface DownloadCertificateButtonProps {
  beneficiaryName: string;
  beneficiaryAddress: string;
  /** Normalized id with prefix like VCS-123 */
  projectId: string;
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
) => (
  <ButtonPrimary
    label={t({
      id: "retirement.single.download_certificate_button",
      message: "Download PDF",
    })}
    onClick={() => generateCertificate(props)}
  />
);
