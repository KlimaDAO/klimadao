import { t } from "@lingui/macro";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { getRetirementCertificate } from "lib/api";
import { FC } from "react";
import * as styles from "./styles";

export interface DownloadCertificateButtonProps {
  beneficiaryName: string;
  beneficiaryAddress: string;
  retirementIndex: string;
}

export const DownloadCertificateButton: FC<DownloadCertificateButtonProps> = (
  props
) => (
  <ButtonPrimary
    label={t({
      id: "retirement.single.download_certificate_button",
      message: "Download PDF",
    })}
    icon={<FileDownloadOutlinedIcon />}
    className={styles.downloadButton}
    onClick={() => getRetirementCertificate(props)}
  />
);
