import { RetirementToken, urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { trimWithLocale } from "@klimadao/lib/utils";
import PDFKit from "pdfkit";

import { agricultureBanner } from "./images/bannerAgriculture";
import { energyEfficiencyBanner } from "./images/bannerEnergyEfficiency";
import { forestryBanner } from "./images/bannerForestry";
import { industrialProcessingBanner } from "./images/bannerIndustrialProcessing";
import { mossBanner } from "./images/bannerMoss";
import { otherBanner } from "./images/bannerOther";
import { otherNatureBasedBanner } from "./images/bannerOtherNatureBased";
import { renewableEnergyBanner } from "./images/bannerRenewableEnergy";
import { carbonmarkLogo } from "./images/carbonmarkLogo";
import { certificateBackground } from "./images/certificateBackground";
import { dateIcon } from "./images/dateIcon";
import { launchIcon } from "./images/launchIcon";

import { getOffsetCategories } from "lib/offsetGetter";
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
const SECONDARY_HEADER_COLOR = "#3B3B3D";

const spacing = {
  margin: 20,
  transactionDetails: 358,
  projectDetails: 419,
  tokenImage: { x: 411, y: 448 },
  footer: 563,
};

type CategoryBannerKey =
  | "Agriculture"
  | "Energy Efficiency"
  | "Forestry"
  | "Industrial Processing"
  | "Moss"
  | "Other"
  | "Other Nature Based"
  | "Renewable Energy";

const categoryBannerMap: { [key in CategoryBannerKey]: string } = {
  Agriculture: agricultureBanner,
  "Energy Efficiency": energyEfficiencyBanner,
  Forestry: forestryBanner,
  "Industrial Processing": industrialProcessingBanner,
  Moss: mossBanner,
  Other: otherBanner,
  "Other Nature Based": otherNatureBasedBanner,
  "Renewable Energy": renewableEnergyBanner,
};

const getCategoryBanner = (category: string): CategoryBannerKey => {
  if (!(category in categoryBannerMap)) {
    return "Other";
  }
  return category as CategoryBannerKey;
};

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  const isMossRetirement =
    params.retirement.retire.credit.bridgeProtocol === "MOSS";
  const fileName = `retirement_${params.retirementIndex}_${params.retirement.retire.beneficiaryAddress}`;
  const projectDetails = [
    {
      label: "PROJECT:",
      value: params.retirement.retire.credit.project.projectID,
    },
    {
      label: "TYPE: ",
      value: getOffsetCategories(params.retirement.retire),
    },
    {
      label: "METHODOLOGY:",
      value: params.retirement.retire.credit.project.methodologies,
    },
    {
      label: "COUNTRY/REGION:",
      value:
        params.retirement.retire.credit.project.country ||
        params.retirement.retire.credit.project.region,
    },
    {
      label: "VINTAGE: ",
      value: params.retirement.retire.credit.vintage,
    },
  ];

  const doc = new PDFKit({
    layout: "landscape",
    size: "LETTER",
    compress: true,
    info: { Title: `${fileName}.pdf` },
    margin: 0,
  });

  const setupFonts = () => {
    doc.registerFont("DMSans", Buffer.from(DMSansRegular, "base64"));
    doc.registerFont("Poppins-Bold", Buffer.from(PoppinsBold, "base64"));
    doc.registerFont(
      "Poppins-Semibold",
      Buffer.from(PoppinsSemiBold, "base64")
    );
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
      Number(params.retirement.retire.amount) < 0.01
        ? "< 0.01"
        : trimWithLocale(params.retirement.retire.amount, 2, "en");

    const retirementDate = new Date(
      Number(params.retirement.retire.timestamp) * 1000
    );
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(retirementDate)
      .toUpperCase();

    const dateIconBuffer = Buffer.from(dateIcon, "base64");
    doc.image(dateIconBuffer, spacing.margin, 92, {
      width: 20,
      height: 20,
    });

    doc.font("Poppins-Semibold");
    doc.fontSize(14);
    doc.fillColor(GRAY);
    doc.text(formattedDate, spacing.margin + 25, 92, {
      characterSpacing: 0.3,
    });

    doc.font("Poppins-Bold");
    doc.fontSize(60);
    doc.fillColor(BLACK);
    doc.text(`${retirementAmount}t`, spacing.margin, 100, {
      characterSpacing: -2,
    });

    doc.font("Poppins-Semibold");
    doc.fontSize(14);
    doc.fillColor(GRAY);
    doc.text("VERIFIED TONNES OF CARBON RETIRED", spacing.margin, 175, {
      characterSpacing: 0.3,
    });

    const beneficary = params.retirement.retire.beneficiaryName;
    if (beneficary) {
      doc.text("BENEFICIARY:", spacing.margin, 220, {
        characterSpacing: 0.3,
      });

      doc.font("Poppins-Bold");
      doc.fontSize(20);
      doc.fillColor(BLACK);
      doc.text(beneficary, spacing.margin, 245, { width: 360 });
    }

    const beneficiaryNameBlockHeight = beneficary
      ? doc.heightOfString(beneficary, {
          width: 360,
        }) + 20
      : 0;

    const retirementMessage = params.retirement.retire.retirementMessage;
    if (retirementMessage) {
      doc.font("DMSans");
      doc.fontSize(16);
      doc.text(
        `“${retirementMessage}”`,
        spacing.margin,
        240 + beneficiaryNameBlockHeight,
        { width: 360 }
      );
    }

    const retirementMessageBlockHeight = retirementMessage
      ? doc.heightOfString(retirementMessage, {
          width: 360,
        }) + 20
      : 0;

    const disclaimer =
      "This represents the permanent retirement of a digital carbon asset. This retirement and the associated data are immutable public records.";
    const disclaimerYSpacing =
      !beneficiaryNameBlockHeight && !retirementMessageBlockHeight
        ? 210
        : 240 + beneficiaryNameBlockHeight + retirementMessageBlockHeight;
    doc.font("DMSans");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text(disclaimer, spacing.margin, disclaimerYSpacing, { width: 360 });
  };

  const printCategoryBanner = async (): Promise<void> => {
    const category = isMossRetirement
      ? "Moss"
      : getCategoryBanner(params.retirement.retire.credit.project.category);
    const categoryBanner = categoryBannerMap[category];
    const categoryBannerBuffer = Buffer.from(categoryBanner, "base64");

    doc.image(categoryBannerBuffer, doc.page.width - 360, 68, {
      width: 320,
      height: 120,
    });
  };

  const calculateBoxHeight = (): number => {
    const projectNameBlockHeight = doc.heightOfString(
      params.retirement.retire.credit.project.name,
      { width: 300, characterSpacing: 0.3 }
    );
    const positionOfProjectDetails = 200 + projectNameBlockHeight + 50;
    const transactionDetailsHeight = 100;

    if (isMossRetirement) {
      return positionOfProjectDetails + transactionDetailsHeight - 20;
    }

    return (
      positionOfProjectDetails +
      projectDetails.length * 23.5 +
      transactionDetailsHeight
    );
  };

  const printProjectDetails = (): void => {
    // fill box first before rendering box border
    doc.rect(doc.page.width - 20 - 360, 20, 360, calculateBoxHeight());
    doc.fill(WHITE);
    doc.rect(doc.page.width - 20 - 360, 20, 360, calculateBoxHeight());
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
    doc.text("PROJECT NAME", doc.page.width - 360, 200, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(16);
    doc.fillColor(BLACK);
    doc.text(
      params.retirement.retire.credit.project.name,
      doc.page.width - 360,
      218,
      {
        width: 320,
      }
    );

    const projectNameBlockHeight = doc.heightOfString(
      params.retirement.retire.credit.project.name,
      {
        width: 320,
        characterSpacing: 0.3,
      }
    );
    const projectDetailsLink = `${urls.carbonmark}/projects/${params.retirement.retire.credit.project.projectID}-${params.retirement.retire.credit.vintage}`;
    doc.font("Poppins-Semibold");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text(
      "LEARN MORE",
      doc.page.width - 360,
      200 + projectNameBlockHeight + 21,
      {
        underline: true,
        link: projectDetailsLink,
      }
    );

    const launchIconBuffer = Buffer.from(launchIcon, "base64");
    doc.image(
      launchIconBuffer,
      doc.page.width - 360 + doc.widthOfString("LEARN MORE") + 5,
      200 + projectNameBlockHeight + 21,
      {
        width: 18,
        height: 18,
        link: projectDetailsLink as PDFKit.Mixins.AnnotationOption, // error in types provided by library
      }
    );

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
    doc.text("BENEFICIARY ADDRESS", doc.page.width - 360, startPosition + 25, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.retire.beneficiaryAddress.id,
      doc.page.width - 360,
      startPosition + 37,
      { width: 320 }
    );

    doc.font("Poppins-Semibold");
    doc.fontSize(8);
    doc.text("TRANSACTION ID", doc.page.width - 360, startPosition + 57, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.retire.hash,
      doc.page.width - 360,
      startPosition + 69,
      { width: 320 }
    );

    doc.text("View on PolygonScan", doc.page.width - 360, startPosition + 100, {
      underline: true,
      link: `https://polygonscan.com/tx/${params.retirement.retire.hash}`,
    });
  };

  const printMossProjectDetails = (): void => {
    doc.rect(doc.page.width - 20 - 360, 20, 360, 360);
    doc.fill(WHITE);
    doc.rect(doc.page.width - 20 - 360, 20, 360, 360);
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
    doc.text("PROJECT NAME", doc.page.width - 360, 200, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(16);
    doc.fillColor(BLACK);
    doc.text("MOSS Earth MCO2", doc.page.width - 360, 218, {
      width: 320,
    });

    doc.font("Poppins-Semibold");
    doc.fontSize(12);
    doc.fillColor(GRAY);
    doc.text("LEARN MORE", doc.page.width - 360, 200 + 20 + 20, {
      underline: true,
      link: "https://mco2token.moss.earth/",
    });

    const launchIconBuffer = Buffer.from(launchIcon, "base64");
    doc.image(
      launchIconBuffer,
      doc.page.width - 360 + doc.widthOfString("LEARN MORE") + 5,
      200 + 20 + 20,
      {
        width: 18,
        height: 18,
        link: "https://mco2token.moss.earth/" as PDFKit.Mixins.AnnotationOption, // error in types provided by library
      }
    );

    doc.font("Poppins-Semibold");
    doc.fontSize(8);
    doc.fillColor(GRAY);
    doc.text("BENEFICIARY ADDRESS", doc.page.width - 360, 200 + 50 + 20, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.retire.beneficiaryAddress.id,
      doc.page.width - 360,
      200 + 50 + 32,
      { width: 320 }
    );

    doc.font("Poppins-Semibold");
    doc.fontSize(8);
    doc.text("TRANSACTION ID", doc.page.width - 360, 200 + 50 + 52, {
      characterSpacing: 0.3,
    });

    doc.font("DMSans");
    doc.fontSize(10);
    doc.text(
      params.retirement.retire.hash,
      doc.page.width - 360,
      200 + 50 + 64,
      { width: 320 }
    );

    doc.text("View on PolygonScan", doc.page.width - 360, 200 + 50 + 100, {
      underline: true,
      link: `https://polygonscan.com/tx/${params.retirement.retire.hash}`,
    });
  };

  setupFonts();
  printBackground();
  printHeader();
  printRetirementDetails();

  if (isMossRetirement) {
    printMossProjectDetails();
  } else {
    printProjectDetails();
  }

  printCategoryBanner();
  printFooter();

  return doc;
};
