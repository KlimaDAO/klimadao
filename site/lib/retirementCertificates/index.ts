import PDFKit from "pdfkit";
import { trimWithLocale } from "@klimadao/lib/utils";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";
import { urls } from "@klimadao/lib/constants";

import { bgBCT } from "./images/bgBCT";
import { bgNCT } from "./images/bgNCT";
import { bgMCO2 } from "./images/bgMCO2";
import { bgUBO } from "./images/bgUBO";
import { bgNBO } from "./images/bgNBO";

import { logoKlima } from "./images/logoKlima";
import { logoBCT } from "./images/logoBCT";
import { logoNCT } from "./images/logoNCT";
import { logoMCO2 } from "./images/logoMCO2";
import { logoUBO } from "./images/logoUBO";
import { logoNBO } from "./images/logoNBO";

import { PoppinsExtraLight } from "./fonts/poppinsExtraLightbase64";
import { PoppinsBold } from "./fonts/poppinsBoldbase64";

type Params = {
  beneficiaryName: string;
  beneficiaryAddress: string;
  projectDetails?: VerraProjectDetails;
  retirement: KlimaRetire;
  retirementIndex: string;
  retirementMessage: string;
  retirementUrl: string;
  retiredToken: RetirementToken;
};

const KLIMA_GREEN = "#00cc33";
const PRIMARY_FONT_COLOR = "#313131";
const SECONDARY_FONT_COLOR = "#767676";
const spacing = {
  margin: 42.5,
  transactionDetails: 358,
  projectDetails: 419,
  tokenImage: { x: 411, y: 448 },
  retirementLink: 555,
};

type FeatureImageMappingKey = keyof typeof featureImageMap;
const featureImageMap = {
  bct: bgBCT,
  nct: bgNCT,
  ubo: bgUBO,
  nbo: bgNBO,
  mco2: bgMCO2,
};

type TokenImageMappingKey = keyof typeof tokenImageMap;
const tokenImageMap = {
  bct: logoBCT,
  nct: logoNCT,
  ubo: logoUBO,
  nbo: logoNBO,
  mco2: logoMCO2,
};
// const getImageDataURI = async (url: string) => {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   // const base64 = Buffer.from(new Uint8Array(arrayBuffer)).toString("base64");
//   // console.log(arrayBuffer);

//   const image = await axios.get(url, { responseType: "arraybuffer" });
//   // console.log(image.data);
//   return image.data;
// };

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  const isMossRetirement = params.retirement.offset.bridge === "Moss";
  const fileName = `retirement_${params.retirementIndex}_${params.beneficiaryAddress}`;

  const doc = new PDFKit({
    layout: "landscape",
    size: "LETTER",
    compress: true,
    info: { Title: `${fileName}.pdf` },
    margin: 0,
  });

  const setupFonts = () => {
    doc.registerFont("Bold", Buffer.from(PoppinsBold, "base64"));
    doc.registerFont("Normal", Buffer.from(PoppinsExtraLight, "base64"));
  };

  const printHeader = (): void => {
    const klimaLogoBuffer = Buffer.from(logoKlima, "base64");
    doc.image(klimaLogoBuffer, spacing.margin, spacing.margin, {
      width: 170,
      height: 28,
    });

    doc.font("Bold");
    doc.fontSize(24);
    doc.text("Certificate for On-chain", spacing.margin, 77);
    doc.text("Carbon Retirement", spacing.margin, 105);

    doc.lineWidth(3);
    doc.moveTo(spacing.margin, 148);
    doc.lineTo(491, 148);
    doc.strokeColor(KLIMA_GREEN);
    doc.stroke();
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

  const printRetirementDetails = (): void => {
    const retirementAmount =
      Number(params.retirement.amount) < 0.01
        ? "< 0.01"
        : trimWithLocale(params.retirement.amount, 2, "en");

    doc.fontSize(28);
    doc.font("Normal");
    doc.text(`${retirementAmount} tonnes`, spacing.margin, 169);

    const beneficaryText = params.beneficiaryName || params.beneficiaryAddress;
    doc.font("Bold");
    doc.lineGap(-13);
    doc.text(beneficaryText, spacing.margin, 200, { width: 450 });

    const beneficiaryNameBlockHeight = doc.heightOfString(beneficaryText, {
      width: 450,
    });

    const retirementMessage = params.retirementMessage;
    doc.font("Normal");
    doc.fontSize(12);
    doc.lineGap(-1.5);
    doc.text(
      retirementMessage,
      spacing.margin,
      200 + beneficiaryNameBlockHeight + 16,
      { width: 450 }
    );
  };

  const printTransactionDetails = (): void => {
    doc.fontSize(11);
    doc.font("Bold");
    doc.text(
      "Beneficiary Address:",
      spacing.margin,
      spacing.transactionDetails
    );
    doc.font("Normal");
    doc.text(
      params.beneficiaryAddress,
      spacing.margin,
      spacing.transactionDetails + 15
    );

    doc.font("Bold");
    doc.text(
      "Transaction ID:",
      spacing.margin,
      spacing.transactionDetails + 30
    );
    doc.font("Normal");
    doc.text(
      params.retirement.transaction.id,
      spacing.margin,
      spacing.transactionDetails + 45,
      {
        link: `https://polygonscan.com/tx/${params.retirement.transaction.id}`,
      }
    );
  };

  const printProjectDetails = (): void => {
    const project = params.projectDetails?.value[0];
    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${
      retirementDate.getMonth() + 1
    }/${retirementDate.getFullYear()}`;

    let projectDetails = [
      {
        label: "Project",
        value: project?.resourceName,
      },
      {
        label: "Asset Retired",
        value: params.retiredToken.toUpperCase(),
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
          value: params.retiredToken.toUpperCase(),
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
      doc.font("Bold");
      doc.text(label, spacing.margin, startPosition);

      doc.font("Normal");
      doc.text(
        `${detail.value}`,
        spacing.margin + doc.widthOfString(label) + 9,
        startPosition
      );

      startPosition += 16;
    });
  };

  const printMossProjectDetails = () => {
    const linkText = "Learn more ";
    doc.font("Bold");
    doc.fillColor(SECONDARY_FONT_COLOR);
    doc.text(linkText, spacing.margin, spacing.projectDetails + 30, {
      link: `${urls.carbonDashboard}/MCO2`,
    });
    doc.fillColor(PRIMARY_FONT_COLOR);
    doc.text(
      "about the projects that back the MCO2 pools",
      spacing.margin + doc.widthOfString(linkText),
      spacing.projectDetails + 30
    );
  };

  const printRetirementLink = (): void => {
    const text = "View this retirement on ";
    doc.font("Bold");
    doc.text(text, spacing.margin, spacing.retirementLink);
    doc.fillColor(KLIMA_GREEN);
    doc.text(
      "klimadao.finance",
      spacing.margin + doc.widthOfString(text),
      spacing.retirementLink,
      { link: params.retirementUrl }
    );
    doc.fillColor(PRIMARY_FONT_COLOR);
  };

  setupFonts();
  printHeader();
  printFeatureImage();
  printRetirementDetails();
  printTransactionDetails();
  printProjectDetails();
  if (isMossRetirement) printMossProjectDetails();
  printRetirementLink();

  return doc;
};
