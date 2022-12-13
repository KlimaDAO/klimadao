import PDFKit from "pdfkit";
import { StaticImageData } from "next/legacy/image";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";
// import { urls } from "@klimadao/lib/constants";

// import KlimaLogo from "public/logo-klima.png";
// import bctBackground from "public/bg_bct.jpeg";
// import nctBackground from "public/bg_nct.jpeg";
// import nboBackground from "public/bg_nbo.jpeg";
// import uboBackground from "public/bg_ubo.jpeg";
// import mco2Background from "public/bg_mco2.jpeg";

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

const spacing = {
  margin: 42.5,
  mainTextWidth: 160,
  beneficiaryName: 81,
  transactionDetails: 130,
  projectDetails: 152,
  tokenImage: { x: 145, y: 158 },
  retirementLink: 200,
};

const KLIMA_GREEN = "#00cc33";

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  // const isMossRetirement = params.retirement.offset.bridge === "Moss";
  const fileName = `retirement_${params.retirementIndex}_${params.beneficiaryAddress}`;

  const doc = new PDFKit({
    layout: "landscape",
    size: "LETTER",
    compress: true,
    info: { Title: `${fileName}.pdf` },
  });

  const setupFonts = () => {
    doc.registerFont("Header", Buffer.from(PoppinsBold, "base64"));
    doc.registerFont("Body", Buffer.from(PoppinsExtraLight, "base64"));
  };

  // TODO need more spacing between header text
  const printHeader = (): void => {
    doc.image("public/logo-klima.png", spacing.margin, spacing.margin, {
      width: 170,
      height: 28,
    });

    doc.font("Header");
    doc.fontSize(24);
    doc.text("Certificate for On-chain", spacing.margin, 77);
    doc.text("Carbon Retirement", spacing.margin, 105);

    doc.lineWidth(3);
    doc.moveTo(spacing.margin, 148);
    doc.lineTo(490, 148);
    doc.strokeColor(KLIMA_GREEN);
    doc.stroke();
  };

  const printFeatureImage = (): void => {
    // const featureImage = Buffer.from(public/bg_mco2.jpeg);
    // const featureImage = new Image();
    // featureImage.src = mco2Background.src;

    doc.image("public/bg_bct.jpeg", spacing.margin + 490, 0, {
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
    doc.font("Body");
    doc.text(`${retirementAmount} tonnes`, spacing.margin, 169);

    doc.font("Header");
    const beneficaryText = params.beneficiaryName || params.beneficiaryAddress;
    doc.lineGap(-13);
    // const beneficaryText = "Mark Cubano Companiessssss Worldwide Corporation";
    doc.text(beneficaryText, spacing.margin, 200, { width: 450 });

    const beneficiaryNameBlockHeight = doc.heightOfString(beneficaryText, {
      width: 450,
    });

    // const retirementMessage = params.retirementMessage;
    const retirementMessage =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas";
    doc.font("Body");
    doc.fontSize(12);
    doc.lineGap(-1);
    doc.text(
      retirementMessage,
      spacing.margin,
      200 + beneficiaryNameBlockHeight + 16,
      { width: 450 }
    );
    // const retirementMessage = doc.splitTextToSize(
    //   params.retirementMessage,
    //   spacing.mainTextWidth
    // );
    // doc.text(
    //   retirementMessage,
    //   spacing.margin,
    //   spacing.beneficiaryName + beneficiaryNameBlockHeight
    // );
  };

  // doc.widthOfString;

  setupFonts();
  printHeader();
  printFeatureImage();
  printRetirementDetails();

  return doc;
};
