import { RetirementToken, urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { trimWithLocale } from "@klimadao/lib/utils";
import PDFKit from "pdfkit";

import { bgBCT } from "./images/bgBCT";
import { bgMCO2 } from "./images/bgMCO2";
import { bgNBO } from "./images/bgNBO";
import { bgNCT } from "./images/bgNCT";
import { bgUBO } from "./images/bgUBO";
import { carbonmarkLogo } from "./images/carbonmarkLogo";
import { certificateBackground } from "./images/certificateBackground";

import { DMSansRegular } from "./fonts/dmSansRegularbase64";
import { PoppinsBold } from "./fonts/poppinsBoldbase64";
import { PoppinsSemiBold } from "./fonts/poppinsSemiBoldbase64";

type Params = {
  retirement: KlimaRetire;
  retirementIndex: string;
  retirementUrl: string;
  retiredToken: RetirementToken | null;
};

const KLIMA_GREEN = "#00cc33";
const BLUE = "#0019FF";
const GRAY = "#626266";
const BLACK = "#000000";
const WHITE = "#ffffff";
const MANATEE = "#8B8FAE";
const PRIMARY_FONT_COLOR = "#313131";
const SECONDARY_HEADER_COLOR = "#3B3B3D";
const spacing = {
  margin: 20,
  transactionDetails: 358,
  projectDetails: 419,
  tokenImage: { x: 411, y: 448 },
  footer: 563,
};

type FeatureImageMappingKey = keyof typeof featureImageMap;
const featureImageMap = {
  bct: bgBCT,
  nct: bgNCT,
  ubo: bgUBO,
  nbo: bgNBO,
  mco2: bgMCO2,
};

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  const isMossRetirement = params.retirement.offset.bridge === "Moss";
  const fileName = `retirement_${params.retirementIndex}_${params.retirement.beneficiaryAddress}`;

  const doc = new PDFKit({
    layout: "landscape",
    size: "LETTER",
    compress: true,
    info: { Title: `${fileName}.pdf` },
    margin: 0,
  });

  const setupFonts = () => {
    doc.registerFont("Poppins-Bold", Buffer.from(PoppinsBold, "base64"));
    doc.registerFont(
      "Poppins-Semibold",
      Buffer.from(PoppinsSemiBold, "base64")
    );
    doc.registerFont("DMSans", Buffer.from(DMSansRegular, "base64"));
  };

  const printBackground = (): void => {
    const backgroundBuffer = Buffer.from(certificateBackground, "base64");

    doc.image(backgroundBuffer, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });
  };

  const printHeader = (): void => {
    doc.font("Poppins-Bold");
    doc.fontSize(16);
    doc.fillColor(GRAY);
    doc.text("Proof of", spacing.margin, 20);
    doc.fontSize(24);
    doc.fillColor(BLUE);
    doc.text("Carbon Credit Retirement", spacing.margin, 37);
  };

  const printFooter = (): void => {
    const carbonmarkLogoBuffer = Buffer.from(carbonmarkLogo, "base64");

    doc.image(carbonmarkLogoBuffer, spacing.margin, 550, {
      width: 42,
      height: 40,
    });

    const text =
      "Official Certificate for Digital Carbon Retirement Provided by ";
    doc.font("DMSans");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text(text, spacing.margin + 50, spacing.footer);
    doc.fillColor(BLUE);
    doc.text(
      "Carbonmark.com",
      spacing.margin + 50 + doc.widthOfString(text),
      spacing.footer,
      { link: urls.carbonmark }
    );
    doc.fillColor(PRIMARY_FONT_COLOR);
  };

  const printRetirementDetails = (): void => {
    const retirementAmount =
      Number(params.retirement.amount) < 0.01
        ? "< 0.01"
        : trimWithLocale(params.retirement.amount, 2, "en");

    doc.font("Poppins-Semibold");
    doc.fontSize(14);
    doc.fillColor(GRAY);
    doc.text("APRIL 24, 2023", spacing.margin, 92, {
      characterSpacing: 0.3,
    });

    doc.font("Poppins-Bold");
    doc.fontSize(60);
    doc.fillColor(BLACK);
    doc.text(`2,000t`, spacing.margin, 100, {
      characterSpacing: -2,
    });
    // doc.text(`${retirementAmount}t`, spacing.margin, 169);

    doc.font("Poppins-Semibold");
    doc.fontSize(14);
    doc.fillColor(GRAY);
    doc.text("VERIFIED TONNES OF CARBON RETIRED", spacing.margin, 175, {
      characterSpacing: 0.3,
    });

    const beneficaryText =
      params.retirement.beneficiary || params.retirement.beneficiaryAddress;
    doc.text("BENEFICIARY:", spacing.margin, 220, {
      characterSpacing: 0.3,
    });

    doc.font("Poppins-Bold");
    doc.fontSize(20);
    doc.fillColor(BLACK);
    // doc.text(beneficaryText, spacing.margin, 245, { width: 375 });
    doc.text("Kristofferson Enterprises LLC.", spacing.margin, 245, {
      width: 360,
    });

    const beneficiaryNameBlockHeight = doc.heightOfString(beneficaryText, {
      width: 360,
    });

    const retirementMessage = params.retirement.retirementMessage;
    doc.font("DMSans");
    doc.fontSize(16);
    doc.text(
      `“${retirementMessage}”`,
      spacing.margin,
      240 + beneficiaryNameBlockHeight + 20,
      { width: 360 }
    );

    const retirementMessageBlockHeight = doc.heightOfString(retirementMessage, {
      width: 360,
    });

    const disclaimer =
      "This represents the permanent retirement of a digital carbon asset. This retirement and the associated data are immutable public records.";
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text(
      disclaimer,
      spacing.margin,
      240 + beneficiaryNameBlockHeight + 20 + retirementMessageBlockHeight + 20,
      { width: 360 }
    );
  };

  const printFeatureImage = async (): Promise<void> => {
    const featureImage =
      featureImageMap[params.retiredToken as FeatureImageMappingKey];
    const featureImageBuffer = Buffer.from(featureImage, "base64");

    doc.image(featureImageBuffer, spacing.margin + 490, 0, {
      width: doc.page.width / 3,
      height: doc.page.height,
    });
  };

  const printProjectDetails = (): void => {
    // fill box first before rendering box border
    doc.rect(doc.page.width - 20 - 360, 20, 360, 500);
    doc.fill(WHITE);
    doc.rect(doc.page.width - 20 - 360, 20, 360, 500);
    doc.strokeColor(MANATEE);
    doc.stroke();

    doc.font("Poppins-Bold");
    doc.fontSize(16);
    doc.fillColor(SECONDARY_HEADER_COLOR);
    doc.text(
      "Retirement Details",
      doc.page.width - 360,
      36 // 20 + 16
    );
  };

  const printTransactionDetails = (): void => {
    doc.fontSize(11);
    doc.font("Poppins-Bold");
    doc.text(
      "Beneficiary Address:",
      spacing.margin,
      spacing.transactionDetails
    );
    doc.font("Poppins-Semibold");
    doc.text(
      params.retirement.beneficiaryAddress,
      spacing.margin,
      spacing.transactionDetails + 15
    );

    doc.font("Poppins-Bold");
    doc.text(
      "Transaction ID:",
      spacing.margin,
      spacing.transactionDetails + 30
    );
    doc.font("Poppins-Semibold");
    doc.text(
      params.retirement.transaction.id,
      spacing.margin,
      spacing.transactionDetails + 45,
      {
        link: `https://polygonscan.com/tx/${params.retirement.transaction.id}`,
      }
    );
  };

  const printProjectDetailss = (): void => {
    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${
      retirementDate.getMonth() + 1
    }/${retirementDate.getFullYear()}`;

    let projectDetails = [
      {
        label: "Project",
        value: params.retirement.offset.name,
      },
      {
        label: "Asset Retired",
        value: params.retiredToken?.toUpperCase(),
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
        label: "Type",
        value: params.retirement.offset.methodologyCategory,
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
          value: params.retiredToken?.toUpperCase(),
        },
        {
          label: "Retired on",
          value: formattedRetirementDate,
        },
      ];
    }

    const tokenImage =
      tokenImageMap[params.retiredToken as TokenImageMappingKey];
    const tokenImageBuffer = Buffer.from(tokenImage, "base64");
    doc.image(tokenImageBuffer, spacing.tokenImage.x, spacing.tokenImage.y, {
      width: 80,
      height: 80,
    });

    let startPosition = spacing.projectDetails;
    projectDetails.forEach((detail) => {
      const label = `${detail.label}:`;
      doc.font("Poppins-Bold");
      doc.text(label, spacing.margin, startPosition);

      doc.font("Poppins-Semibold");
      doc.text(
        `${detail.value}`,
        spacing.margin + doc.widthOfString(label) + 9,
        startPosition
      );

      startPosition += 16;
    });
  };

  setupFonts();
  printBackground();
  printHeader();
  // printFeatureImage();
  printRetirementDetails();
  // printTransactionDetails();
  printProjectDetails();
  printFooter();

  return doc;
};
