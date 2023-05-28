import { RetirementToken, urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { trimWithLocale } from "@klimadao/lib/utils";
import PDFKit from "pdfkit";

import { agricultureBanner } from "./images/bannerAgriculture";
import { energyEfficiencyBanner } from "./images/bannerEnergyEfficiency";
import { forestryBanner } from "./images/bannerForestry";
import { industrialProcessingBanner } from "./images/bannerIndustrialProcessing";
import { otherBanner } from "./images/bannerOther";
import { otherNatureBasedBanner } from "./images/bannerOtherNatureBased";
import { renewableEnergyBanner } from "./images/bannerRenewableEnergy";
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

type CategoryBannerMappingKey = keyof typeof catergoryBannerMap;
const catergoryBannerMap = {
  Agriculture: agricultureBanner,
  "Energy Efficiency": energyEfficiencyBanner,
  Forestry: forestryBanner,
  "Industrial Processing": industrialProcessingBanner,
  Other: otherBanner,
  "Other Nature Based": otherNatureBasedBanner,
  "Renewable Energy": renewableEnergyBanner,
};

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  console.log(params);
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
  };

  const printRetirementDetails = (): void => {
    const retirementAmount =
      Number(params.retirement.amount) < 0.01
        ? "< 0.01t"
        : trimWithLocale(params.retirement.amount, 2, "en");

    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(retirementDate)
      .toUpperCase();

    doc.font("Poppins-Semibold");
    doc.fontSize(14);
    doc.fillColor(GRAY);
    doc.text(formattedDate, spacing.margin, 92, {
      characterSpacing: 0.3,
    });

    doc.font("Poppins-Bold");
    doc.fontSize(60);
    doc.fillColor(BLACK);
    // doc.text(`2,000t`, spacing.margin, 100, {
    //   characterSpacing: -2,
    // });
    doc.text(`${retirementAmount}t`, spacing.margin, 100, {
      characterSpacing: -2,
    });

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
    doc.text(beneficaryText, spacing.margin, 245, { width: 360 });
    // doc.text("Kristofferson Enterprises LLC.", spacing.margin, 245, {
    //   width: 360,
    // });

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

  const printCategoryBanner = async (): Promise<void> => {
    const categoryBanner =
      catergoryBannerMap[
        params.retirement.offset.methodologyCategory as CategoryBannerMappingKey
      ];
    // const categoryBanner = catergoryBannerMap["Industrial Processing"];
    const categoryBannerBuffer = Buffer.from(categoryBanner, "base64");

    doc.image(categoryBannerBuffer, doc.page.width - 360, 68, {
      width: 320,
      height: 120,
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
      36 // page margin + box padding
    );

    doc.font("Poppins-Semibold");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text("PROJECT RETIRED", doc.page.width - 360, 200, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(16);
    doc.fillColor(BLACK);
    doc.text(params.retirement.offset.name, doc.page.width - 360, 218, {
      width: 320,
    });

    const projectNameBlockHeight = doc.heightOfString(
      params.retirement.offset.name,
      {
        width: 320,
        characterSpacing: 0.3,
      }
    );
    doc.font("Poppins-Semibold");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text(
      "LEARN MORE",
      doc.page.width - 360,
      200 + projectNameBlockHeight + 20,
      { underline: true }
    );

    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${
      retirementDate.getMonth() + 1
    }/${retirementDate.getFullYear()}`;

    let projectDetails = [
      {
        label: "ASSET RETIRED:",
        value: params.retiredToken?.toUpperCase(),
      },
      {
        label: "PROJECT:",
        value: params.retirement.offset.projectID,
      },
      {
        label: "TYPE: ",
        value: params.retirement.offset.methodologyCategory,
      },
      {
        label: "METHODOLOGY:",
        value: params.retirement.offset.methodology,
      },
      {
        label: "COUNTRY/REGION:",
        value:
          params.retirement.offset.country || params.retirement.offset.region,
      },
      {
        label: "VINTAGE: ",
        value: new Date(Number(params.retirement.offset.vintage) * 1000)
          .getFullYear()
          .toString(),
      },
    ];

    let startPosition = 200 + projectNameBlockHeight + 50;
    projectDetails.forEach((detail) => {
      doc.font("Poppins-Semibold");
      doc.fontSize(10);
      doc.fillColor(GRAY);
      doc.text(detail.label, doc.page.width - 360, startPosition, {
        characterSpacing: 0.3,
      });

      doc.font("DMSans");
      doc.fontSize(12);
      doc.fillColor(BLACK);
      doc.text(
        `${detail.value}`,
        doc.page.width - 360 + doc.widthOfString(detail.label) + 2,
        startPosition - 1
      );

      startPosition += 20;
    });

    doc.lineWidth(1);
    doc.moveTo(doc.page.width - 360, startPosition + 10);
    doc.lineTo(doc.page.width - 40, startPosition + 10);
    doc.strokeColor(MANATEE);
    doc.stroke();

    doc.font("Poppins-Semibold");
    doc.fontSize(8);
    doc.fillColor(GRAY);
    doc.text("BENEFICIARY ADDRESS", doc.page.width - 360, startPosition + 20, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.beneficiaryAddress,
      doc.page.width - 360,
      startPosition + 32,
      { width: 320 }
    );

    doc.font("Poppins-Semibold");
    doc.fontSize(8);
    doc.text("TRANSACTION ID", doc.page.width - 360, startPosition + 52, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.transaction.id,
      doc.page.width - 360,
      startPosition + 64,
      { width: 320 }
    );
  };

  setupFonts();
  printBackground();
  printHeader();
  printRetirementDetails();
  printProjectDetails();
  printCategoryBanner();
  printFooter();

  return doc;
};
