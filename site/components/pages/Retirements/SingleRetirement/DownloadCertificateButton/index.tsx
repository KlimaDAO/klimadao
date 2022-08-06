import React, { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { jsPDF } from "jspdf";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

import KlimaLogo from "public/logo-klima.png";
import bctBackground from "./assets/bg_bct.jpeg";
import nctBackground from "./assets/bg_nct.jpeg";
import nboBackground from "./assets/bg_nbo.jpeg";
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
  console.log(props.tokenData);

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
    doc.line(spacing.margin, 52, 172, 52);
  };

  const featureImageMap = {
    bct: bctBackground,
    nct: nctBackground,
    ubo: uboBackground,
    nbo: nboBackground,
  };

  const printFeatureImage = (): void => {
    const featureImage = new Image();
    featureImage.src = featureImageMap[props.tokenData.key].src;

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
    const beneficaryText = props.beneficiaryName || props.beneficiaryAddress;
    const beneficiaryName = doc.splitTextToSize(
      beneficaryText,
      spacing.mainTextWidth
    );

    const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    const lines = beneficiaryName.length;
    const beneficiaryNamePosition = lineHeight * lines;

    doc.text(beneficiaryName, spacing.margin, spacing.beneficiaryName);

    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.2);
    const retirementMessage = doc.splitTextToSize(
      props.retirementMessage,
      spacing.mainTextWidth
    );
    doc.text(
      retirementMessage,
      spacing.margin,
      spacing.beneficiaryName + beneficiaryNamePosition
    );
  };

  const printTransactionDetails = (): void => {
    doc.setFontSize(11);
    doc.setFont("Poppins", "Bold");
    doc.text("Beneficiary Address:", spacing.margin, 135);
    doc.setFont("Poppins", "ExtraLight");
    doc.text(props.beneficiaryAddress, spacing.margin, 140.5);

    doc.setFont("Poppins", "Bold");
    doc.text("Transaction ID:", spacing.margin, 146);
    doc.setFont("Poppins", "ExtraLight");
    const txHashSplit = doc.splitTextToSize(
      props.retirement.transaction.id,
      spacing.mainTextWidth
    );
    doc.text(txHashSplit, spacing.margin, 151.5);
  };

  const printProjectDetails = (): void => {
    if (props.retirement.offset.bridge === "Moss") {
      return; // print generic moss information link
    }

    const tokenImage = new Image();
    tokenImage.src = props.tokenData.icon.src;
    doc.addImage(
      tokenImage,
      "JPEG",
      spacing.margin + 125,
      spacing.projectDetails.y + 22,
      28,
      28
    );

    const project = props.projectDetails?.value[0];
    const retirementDate = new Date(Number(props.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${retirementDate.getMonth()}/${retirementDate.getFullYear()}`;
    const projectDetails = [
      {
        label: "Token",
        value: props.tokenData.label,
      },
      {
        label: "Project",
        value: project?.resourceName,
      },
      {
        label: "Methodology",
        value: props.retirement.offset.methodology,
      },
      {
        label: "Country/Region",
        value:
          props.retirement.offset.country || props.retirement.offset.region,
      },
      {
        label: "Vintage",
        value: new Date(Number(props.retirement.offset.vintage) * 1000)
          .getFullYear()
          .toString(),
      },
      {
        label: "Retired",
        value: formattedRetirementDate,
      },
    ];

    let startPosition = 157;
    projectDetails.forEach((detail) => {
      const label = `${detail.label}:`;
      doc.setFont("Poppins", "Bold");
      doc.text(label, spacing.margin, startPosition);

      doc.setFont("Poppins", "ExtraLight");
      doc.text(
        `${detail.value}`,
        spacing.margin + doc.getTextWidth(label) + 3,
        startPosition
      );

      startPosition += 5.5;
    });
  };

  const handleClick = () => {
    setupFonts();
    printHeader();
    printFeatureImage();
    printRetirementDetails();
    printTransactionDetails();
    printProjectDetails();

    doc.setFont("Poppins", "Bold");
    doc.text("View this retirement on ", spacing.margin, 200);
    doc.setTextColor(0, 204, 51);
    doc.textWithLink(
      "klimadao.finance",
      spacing.margin + doc.getTextWidth("View this retirement on "),
      200,
      {
        url: "https://www.klimadao.finance/retirements/markcuban.klima/2",
      }
    );

    doc.save("a4.pdf");
  };

  return <ButtonPrimary onClick={handleClick} label="Download PDF" />;
};
