import React from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { jsPDF } from "jspdf";

import { KlimaLogo } from "./base64KlimaLogo";

export const DownloadCertificateButton = () => {
  const props = { retirementAmount: 1.94, beneficiaryName: "aeterno.klima" };

  const margin = {
    left: 20,
  };

  const handleClick = () => {
    const doc = new jsPDF({ orientation: "landscape", format: "letter" });

    doc.addImage(KlimaLogo, "JPEG", margin.left, 20, 66, 11);
    doc.text("Certificate for On-chain", margin.left, 42);
    doc.text("Carbon Retirement", margin.left, 50);
    doc.setLineWidth(1.2);
    doc.setDrawColor(0, 204, 51); // klima green RGB
    doc.line(margin.left, 60, 160, 60);

    // tonnage
    doc.text(`${props.retirementAmount} tonnage`, margin.left, 78);
    doc.text(props.beneficiaryName, margin.left, 92);

    doc.save("a4.pdf");
  };

  return <ButtonPrimary onClick={handleClick} label="Download PDF" />;
};
