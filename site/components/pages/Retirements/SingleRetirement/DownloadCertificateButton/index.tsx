import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { jsPDF } from "jspdf";
// import map from "lodash/map";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

import KlimaLogo from "public/logo-klima.png";
import bctBackground from "./assets/bg_bct.jpeg";
import uboBackground from "./assets/bg_ubo.jpeg";
import { PoppinsExtraLight } from "./poppinsExtraLightbase64";
import { PoppinsBold } from "./poppinsBoldbase64";

interface Props {
  beneficiaryName: string;
  beneficiaryAddress: string;
  projectDetails?: VerraProjectDetails;
  retirement: KlimaRetire;
  retirementMessage: string;
  tokenData: any;
}

export const DownloadCertificateButton: FC<Props> = (props) => {
  console.log(props.retirement);

  const spacing = {
    margin: 15,
    mainTextWidth: 160,
    beneficiaryName: 81,
    projectDetails: { x: 50, y: 135 },
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
    doc.addImage(klimaLogo, "JPEG", spacing.margin, spacing.margin, 60, 10);

    doc.setFont("Poppins", "Bold");
    doc.setFontSize(24);
    doc.text("Certificate for On-chain", spacing.margin, 36);
    doc.text("Carbon Retirement", spacing.margin, 46);
    doc.setLineWidth(1.05);
    doc.setDrawColor(0, 204, 51); // klima green RGB
    doc.line(spacing.margin, 52, 170, 52);
  };

  const printImages = (): void => {
    const tokenImage = new Image();
    tokenImage.src = props.tokenData.icon.src;

    const featureImage = new Image();
    featureImage.src = bctBackground.src;

    doc.addImage(
      tokenImage,
      "JPEG",
      spacing.margin,
      spacing.projectDetails.y + 18,
      24,
      24
    );

    doc.addImage(
      featureImage,
      "JPEG",
      spacing.margin + 173,
      0,
      doc.internal.pageSize.width / 3,
      doc.internal.pageSize.height
    );
  };

  const printRetirementDetails = (): void => {
    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(28);
    doc.text(
      `${trimWithLocale(props.retirement.amount, 2, "en")} tonnes`,
      spacing.margin,
      70
    );

    doc.setFont("Poppins", "Bold");
    doc.setLineHeightFactor(1);
    const beneficaryText = "Mark Cuban Cubano Companies";
    const beneficiaryName = doc.splitTextToSize(
      beneficaryText,
      spacing.mainTextWidth
    );
    // const beneficaryText = props.beneficiaryName || props.beneficiaryAddress;
    // const beneficiaryName = doc.splitTextToSize(
    //   beneficaryText,
    //   spacing.mainTextWidth
    // );

    const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    const lines = beneficiaryName.length;
    const beneficiaryNamePosition = lineHeight * lines;

    doc.text(beneficiaryName, spacing.margin, spacing.beneficiaryName);

    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.2);
    // const retirementMessage = doc.splitTextToSize(
    //   props.retirementMessage,
    //   spacing.mainTextWidth
    // );
    const retirementMessage = doc.splitTextToSize(
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
      spacing.mainTextWidth
    );
    doc.text(
      retirementMessage,
      spacing.margin,
      spacing.beneficiaryName + beneficiaryNamePosition
    );
    // doc.text(retirementMessage, spacing.margin, 110);
  };

  // const projectDetails = [
  //   {
  //     label: 'Beneficiary Address',
  //     value: props.beneficiaryAddress
  //   },
  //   {
  //     label: 'Transaction ID',
  //     value: props.retirement.id
  //   },
  //   {
  //     label: 'Project',
  //     value: props.projectDetails?.value[0].resourceName
  //   },
  //   {
  //     label: 'Methodology',
  //     value: props.
  //   }
  // ]

  const printProjectDetails = (): void => {};

  const handleClick = () => {
    setupFonts();
    printHeader();
    printImages();
    printRetirementDetails();

    // Details
    doc.setFontSize(11);
    doc.setFont("Poppins", "Bold");
    doc.text("Beneficiary Address:", spacing.margin, 135);
    doc.setFont("Poppins", "ExtraLight");
    // doc.text(
    //   "0x01715cCa3fc96964682FFf4ff54f791cA154bE26",
    //   spacing.margin + doc.getTextWidth("Beneficiary Address:") + 4 + 30,
    //   140
    // );
    doc.text(props.beneficiaryAddress, spacing.margin, 140);

    doc.setFont("Poppins", "Bold");
    doc.text("Transaction ID:", spacing.margin, 145);
    doc.setFont("Poppins", "ExtraLight");
    const txHashSplit = doc.splitTextToSize(
      props.retirement.transaction.id,
      spacing.mainTextWidth
    );
    // doc.text(
    //   txHashSplit,
    //   spacing.margin + doc.getTextWidth("Transaction Hash:") + 4,
    //   152
    // );
    doc.text(txHashSplit, spacing.margin, 150);

    doc.setFont("Poppins", "Bold");
    doc.text("Token:", spacing.margin + 30, 156);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      props.tokenData.label,
      spacing.margin + doc.getTextWidth("Token:") + 3 + 30,
      156
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Project:", spacing.margin + 30, 161);
    doc.setFont("Poppins", "ExtraLight");
    // doc.text(
    //   "4x50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
    //   spacing.margin + doc.getTextWidth("Project:") + 3,
    //   158
    // );
    doc.text(
      "4x50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
      spacing.margin + doc.getTextWidth("Project:") + 3 + 30,
      161
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Methodology:", spacing.margin + 30, 166);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "ACM0002",
      spacing.margin + doc.getTextWidth("Methodology:") + 30 + 4,
      166
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Country/Region:", spacing.margin + 30, 171);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "China",
      spacing.margin + doc.getTextWidth("Country/Region:") + 30 + 4,
      171
    );

    const formattedVintage = new Date(1199145600 * 1000)
      .getFullYear()
      .toString();

    doc.setFont("Poppins", "Bold");
    doc.text("Vintage:", spacing.margin + 30, 176);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      formattedVintage,
      spacing.margin + doc.getTextWidth("Vintage:") + 30 + 3,
      176
    );

    doc.setFont("Poppins", "Bold");
    doc.text("Timestamp:", spacing.margin + 30, 181);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      "03/05/2022",
      spacing.margin + doc.getTextWidth("Timestamp:") + 30 + 4,
      181
    );

    doc.setFont("Poppins", "Bold");
    doc.text("View this retirement on ", spacing.margin + 30, 200);
    doc.setTextColor(0, 204, 51);
    doc.textWithLink(
      "klimadao.finance",
      spacing.margin + doc.getTextWidth("View this retirement on ") + 30,
      200,
      {
        url: "https://www.klimadao.finance/retirements/markcuban.klima/2",
      }
    );

    doc.save("a4.pdf");
  };

  return <ButtonPrimary onClick={handleClick} label="Download PDF" />;
};
