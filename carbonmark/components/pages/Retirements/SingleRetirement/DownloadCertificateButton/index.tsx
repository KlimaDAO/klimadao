import { ButtonPrimary } from "@klimadao/lib/components";
import { CarbonToken } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t } from "@lingui/macro";
import { StaticImageData } from "next/legacy/image";
import { FC } from "react";
import { generateCertificate } from "./generateCertificate";
import * as styles from "./styles";

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
    label: Uppercase<CarbonToken>;
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
    className={styles.downloadButton}
    onClick={() => generateCertificate(props)}
  />
);
