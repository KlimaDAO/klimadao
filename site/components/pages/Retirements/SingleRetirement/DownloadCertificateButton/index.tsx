import React, { FC, useState } from "react";
import { ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { t } from "@lingui/macro";

export interface Props {
  beneficiaryAddress: string;
  retirementIndex: string;
}

export const DownloadCertificateButton: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const fileName = `retirement_${props.retirementIndex}_${props.beneficiaryAddress}.pdf`;

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
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
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
