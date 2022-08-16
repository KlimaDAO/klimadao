import { jsPDF } from "jspdf";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";
import { urls } from "@klimadao/lib/constants";

import KlimaLogo from "public/logo-klima.png";
import bctBackground from "public/bg_bct.jpeg";
import nctBackground from "public/bg_nct.jpeg";
import nboBackground from "public/bg_nbo.jpeg";
import uboBackground from "public/bg_ubo.jpeg";
import mco2Background from "public/bg_mco2.jpeg";

import { PoppinsExtraLight } from "./poppinsExtraLightbase64";
import { PoppinsBold } from "./poppinsBoldbase64";

type Params = {
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
};

const KLIMA_GREEN = "#00cc33";
const PRIMARY_FONT_COLOR = "#313131";
const SECONDARY_FONT_COLOR = "#767676";
const spacing = {
  margin: 15,
  mainTextWidth: 160,
  beneficiaryName: 81,
  transactionDetails: 130,
  projectDetails: 152,
  tokenImage: { x: 143, y: 156 },
  retirementLink: 200,
};

type FeatureImageMappingKey = keyof typeof featureImageMap;
const featureImageMap = {
  bct: bctBackground,
  nct: nctBackground,
  ubo: uboBackground,
  nbo: nboBackground,
  mco2: mco2Background,
};

export const generateCertificate = (params: Params): void => {
  const isMossRetirement = params.retirement.offset.bridge === "Moss";
  const fileName = `retirement_${params.retirementIndex}_${params.beneficiaryAddress}.pdf`;

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
    doc.setDrawColor(KLIMA_GREEN);
    doc.line(spacing.margin, 52, 173, 52);
  };

  const printFeatureImage = (): void => {
    const featureImage = new Image();
    featureImage.src =
      featureImageMap[params.tokenData.key as FeatureImageMappingKey].src;

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
      `${trimWithLocale(params.retirement.amount, 2, "en")} tonnes`,
      spacing.margin,
      70
    );

    doc.setFont("Poppins", "Bold");
    doc.setLineHeightFactor(1);
    const beneficaryText = params.beneficiaryName || params.beneficiaryAddress;
    const beneficiaryName = doc.splitTextToSize(
      beneficaryText,
      spacing.mainTextWidth
    );

    const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
    const lines = beneficiaryName.length;
    const beneficiaryNameBlockHeight = lineHeight * lines;

    doc.text(beneficiaryName, spacing.margin, spacing.beneficiaryName);

    doc.setFont("Poppins", "ExtraLight");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.2);
    const retirementMessage = doc.splitTextToSize(
      params.retirementMessage,
      spacing.mainTextWidth
    );
    doc.text(
      retirementMessage,
      spacing.margin,
      spacing.beneficiaryName + beneficiaryNameBlockHeight
    );
  };

  const printTransactionDetails = (): void => {
    doc.setFontSize(11);
    doc.setFont("Poppins", "Bold");
    doc.text(
      "Beneficiary Address:",
      spacing.margin,
      spacing.transactionDetails
    );
    doc.setFont("Poppins", "ExtraLight");
    doc.text(
      params.beneficiaryAddress,
      spacing.margin,
      spacing.transactionDetails + 5.5
    );

    doc.setFont("Poppins", "Bold");
    doc.text(
      "Transaction ID:",
      spacing.margin,
      spacing.transactionDetails + 11
    );
    doc.setFont("Poppins", "ExtraLight");
    const txHashSplit = doc.splitTextToSize(
      params.retirement.transaction.id,
      spacing.mainTextWidth
    );
    doc.text(txHashSplit, spacing.margin, spacing.transactionDetails + 16.5);
  };

  const printProjectDetails = (): void => {
    const project = params.projectDetails?.value[0];
    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${retirementDate.getMonth()}/${retirementDate.getFullYear()}`;
    let projectDetails = [
      {
        label: "Project",
        value: project?.resourceName,
      },
      {
        label: "Asset Retired",
        value: params.tokenData.label,
      },
      {
        label: "Retired on",
        value: formattedRetirementDate,
      },
      {
        label: "Methodology",
        value: params.retirement.offset.methodology,
      },
      {
        label: "Country/Region",
        value:
          params.retirement.offset.country || params.retirement.offset.region,
      },
      {
        label: "Vintage",
        value: new Date(Number(params.retirement.offset.vintage) * 1000)
          .getFullYear()
          .toString(),
      },
    ];

    if (isMossRetirement) {
      projectDetails = [
        {
          label: "Asset Retired",
          value: params.tokenData.label,
        },
        {
          label: "Retired on",
          value: formattedRetirementDate,
        },
      ];
    }

    const tokenImage = new Image();
    tokenImage.src = params.tokenData.icon.src;
    doc.addImage(
      tokenImage,
      "JPEG",
      spacing.tokenImage.x,
      spacing.tokenImage.y,
      28,
      28
    );

    let startPosition = spacing.projectDetails;
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

  const printMossProjectDetails = () => {
    const linkText = "Learn more ";
    doc.setFont("Poppins", "Bold");
    doc.setTextColor(SECONDARY_FONT_COLOR);
    doc.textWithLink(linkText, spacing.margin, spacing.projectDetails + 11, {
      url: `${urls.carbonDashboard}/MCO2`,
    });
    doc.setTextColor(PRIMARY_FONT_COLOR);
    doc.text(
      "about the projects that back the MCO2 pools",
      spacing.margin + doc.getTextWidth(linkText),
      spacing.projectDetails + 11
    );
  };

  const printRetirementLink = (): void => {
    const text = "View this retirement on ";
    doc.setFont("Poppins", "Bold");
    doc.text(text, spacing.margin, spacing.retirementLink);
    doc.setTextColor(KLIMA_GREEN);
    doc.textWithLink(
      "klimadao.finance",
      spacing.margin + doc.getTextWidth(text),
      spacing.retirementLink,
      { url: params.retirementUrl }
    );
    doc.setTextColor(PRIMARY_FONT_COLOR);
  };

  setupFonts();
  printHeader();
  printFeatureImage();
  printRetirementDetails();
  printTransactionDetails();
  printProjectDetails();
  if (isMossRetirement) printMossProjectDetails();
  printRetirementLink();

  doc.save(fileName);
};
