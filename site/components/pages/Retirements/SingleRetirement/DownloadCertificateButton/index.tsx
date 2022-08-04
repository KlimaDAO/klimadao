import React from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { jsPDF } from "jspdf";
import map from "lodash/map";

import { KlimaLogo } from "./base64KlimaLogo";
import { PoppinsExtraLight } from "./poppinsExtraLightbase64";
import { PoppinsBold } from "./poppinsBoldbase64";

export const DownloadCertificateButton = () => {
  const props = {
    retirementAmount: 1000.94,
    beneficiaryName: "Aeterno.klima",
    retirementMessage:
      "jVxmaGGF2lWQwuyClMkZSstPef80Zumncu5IvLxfMhdBK6HTy5PFBDN3rc1KFhj9oNQqHqcCDgFvE6GBiwyNBf0xDTuxc1lHC533IcY8LMdjtYUDeaGuRwZ3BzX31RUk8wgY373iwljQgE4qemF9ymLE99OTqhRiCeWu3yUfsesv6nxFSHjw",
  };

  const margin = {
    left: 20,
  };

  const handleClick = () => {
    const doc = new jsPDF({ orientation: "landscape", format: "letter" });

    doc.addFileToVFS("Poppins-ExtraLight-normal.ttf", PoppinsExtraLight);
    doc.addFileToVFS("Poppins-SemiBold-normal.ttf", PoppinsBold);
    doc.addFont("Poppins-ExtraLight-normal.ttf", "Poppins", "ExtraLight");
    doc.addFont("Poppins-SemiBold-normal.ttf", "Poppins", "Bold");

    doc.addImage(KlimaLogo, "JPEG", margin.left, 20, 60, 10);

    doc.setFont("Poppins", "Bold");
    doc.setFontSize(24);
    doc.text("Certificate for On-chain", margin.left, 40);
    doc.text("Carbon Retirement", margin.left, 50);
    doc.setLineWidth(1.05);
    doc.setDrawColor(0, 204, 51); // klima green RGB
    doc.line(margin.left, 57, 160, 57);

    // tonnage
    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(32);
    doc.text(`${props.retirementAmount} tonnage`, margin.left, 77);

    doc.setFont("Poppins", "Bold");
    doc.text(props.beneficiaryName, margin.left, 90);

    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);
    const retirementMessageSplit = doc.splitTextToSize(
      props.retirementMessage,
      136
    );
    doc.text(retirementMessageSplit, margin.left, 100);

    // Details
    doc.setFont("Poppins", "Bold");
    doc.text("Beneficiary Address:", margin.left, 140);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "0x01715cCa3fc96964682FFf4ff54f791cA154bE26",
      margin.left + doc.getTextWidth("Beneficiary Address:") + 4,
      140
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Transaction Hash:", margin.left, 146);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "0xed2d794fe1ac9a87dd2ff0ec2c3b749443bd4dc3c3c649da8775cfe8d48484ab",
      margin.left + doc.getTextWidth("Transaction Hash:") + 4,
      146
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Project:", margin.left, 152);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "4x50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
      margin.left + doc.getTextWidth("Project:") + 4,
      152
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Methodology:", margin.left, 158);
    doc.setFont("Poppins", "ExtraLight");
    doc.text("", margin.left + doc.getTextWidth("Methodology:") + 4, 158);

    doc.setFont("Poppins", "Bold");
    doc.text("Country/Region:", margin.left, 164);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "China",
      margin.left + doc.getTextWidth("Country/Region:") + 4,
      164
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Vintage:", margin.left, 170);
    doc.setFont("Poppins", "ExtraLight");
    doc.text("", margin.left + doc.getTextWidth("Vintage:") + 4, 170);

    doc.setFont("Poppins", "Bold");
    doc.text("Timestamp:", margin.left, 176);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "Tuesday, May 3, 2022",
      margin.left + doc.getTextWidth("Timestamp:") + 4,
      176
    );

    doc.save("a4.pdf");
  };

  return <ButtonPrimary onClick={handleClick} label="Download PDF" />;
};
