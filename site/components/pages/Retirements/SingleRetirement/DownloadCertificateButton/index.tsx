import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { jsPDF } from "jspdf";
// import map from "lodash/map";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import KlimaLogo from "public/logo-klima.png";
import bctBackground from "./assets/bg_bct.jpeg";
import uboBackground from "./assets/bg_ubo.jpeg";
import { PoppinsExtraLight } from "./poppinsExtraLightbase64";
import { PoppinsBold } from "./poppinsBoldbase64";

interface Props {
  beneficiaryName: string;
  beneficiaryAddress: string;
  retirement: KlimaRetire;
  retirementMessage: string;
  tokenData: any;
}

export const DownloadCertificateButton: FC<Props> = (props) => {
  console.log(props.retirement);

  const margin = {
    left: 20,
  };

  const doc = new jsPDF({
    orientation: "landscape",
    format: "letter",
    putOnlyUsedFonts: true,
    compress: true,
  });

  const setupFonts = (): void => {
    doc.addFileToVFS("Poppins-ExtraLight-normal.ttf", PoppinsExtraLight);
    doc.addFileToVFS("Poppins-SemiBold-normal.ttf", PoppinsBold);
    doc.addFont("Poppins-ExtraLight-normal.ttf", "Poppins", "ExtraLight");
    doc.addFont("Poppins-SemiBold-normal.ttf", "Poppins", "Bold");
  };

  const printHeader = (): void => {
    const klimaLogo = new Image();
    klimaLogo.src = KlimaLogo.src;
    doc.addImage(klimaLogo, "JPEG", margin.left, 20, 60, 10);

    doc.setFont("Poppins", "Bold");
    doc.setFontSize(24);
    doc.text("Certificate for On-chain", margin.left, 41);
    doc.text("Carbon Retirement", margin.left, 51);
    doc.setLineWidth(1.05);
    doc.setDrawColor(0, 204, 51); // klima green RGB
    doc.line(margin.left, 57, 167, 57);
  };

  const printImages = (): void => {
    const tokenImage = new Image();
    tokenImage.src = props.tokenData.icon.src;

    const featureImage = new Image();
    featureImage.src = bctBackground.src;

    doc.addImage(tokenImage, "JPEG", margin.left, 5, 20, 20);
    doc.addImage(
      featureImage,
      "JPEG",
      margin.left + 167,
      0,
      doc.internal.pageSize.width / 3,
      doc.internal.pageSize.height
    );
  };

  const printRetirementDetails = (): void => {
    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(30);
    doc.text(
      `${trimWithLocale(props.retirement.amount, 2, "en")} tonnes`,
      margin.left,
      76
    );

    doc.setFont("Poppins", "Bold");
    doc.setLineHeightFactor(1);
    const beneficiaryName = doc.splitTextToSize(
      "Mark Cuban Cubano Companies",
      136
    );

    // const beneficiaryName = doc.splitTextToSize(
    //   props.beneficiaryName || props.beneficiaryAddress,
    //   136
    // );
    doc.text(beneficiaryName, margin.left, 87);

    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);
    const retirementMessage = doc.splitTextToSize(props.retirementMessage, 136);
    doc.text(retirementMessage, margin.left, 100);
    // doc.text(retirementMessage, margin.left, 110);
  };

  const printProjectDetails = (): void => {};

  const handleClick = () => {
    setupFonts();
    printHeader();
    printImages();
    printRetirementDetails();

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
    const txHashSplit = doc.splitTextToSize(
      "0xed2d794fe1ac9a87dd2ff0ec2c3b749443bd4dc3c3c649da8775cfe8d48484ab",
      100
    );
    doc.text(
      txHashSplit,
      margin.left + doc.getTextWidth("Transaction Hash:") + 4,
      146
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Project:", margin.left, 158);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "4x50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
      margin.left + doc.getTextWidth("Project:") + 3,
      158
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Methodology:", margin.left, 164);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "ACM0002",
      margin.left + doc.getTextWidth("Methodology:") + 4,
      164
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Country/Region:", margin.left, 170);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "China",
      margin.left + doc.getTextWidth("Country/Region:") + 4,
      170
    );

    const formattedVintage = new Date(1199145600 * 1000)
      .getFullYear()
      .toString();

    doc.setFont("Poppins", "Bold");
    doc.text("Vintage:", margin.left, 176);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      formattedVintage,
      margin.left + doc.getTextWidth("Vintage:") + 3,
      176
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Timestamp:", margin.left, 182);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "03/05/2022",
      margin.left + doc.getTextWidth("Timestamp:") + 4,
      182
    );

    doc.setFont("Poppins", "Bold");
    doc.text("View this retirement on ", margin.left, 200);
    doc.setTextColor(0, 204, 51);
    doc.textWithLink(
      "klimadao.finance",
      margin.left + doc.getTextWidth("View this retirement on "),
      200,
      {
        url: "https://www.klimadao.finance/retirements/markcuban.klima/2",
      }
    );

    doc.save("a4.pdf");
  };

  return <ButtonPrimary onClick={handleClick} label="Download PDF" />;
};
